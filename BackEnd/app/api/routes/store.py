from datetime import timedelta
import hashlib
import secrets
from pydantic import BaseModel, Field
from ipaddress import ip_address
from urllib.parse import urlparse
from uuid import uuid4

import httpx
from bson import ObjectId
from pymongo import ReturnDocument
from fastapi import APIRouter, Depends, HTTPException, Request

from app.database.connection import database
from app.api.dependencies.auth import get_current_user, require_admin
from app.schema.store_schema import (
    StoreConfigurationUpdate,
    OnlineOrderCreate,
    OnlineOrderStatusUpdate,
)
from app.services.settings_service import SettingsService
from app.services.product_service import ProductService
from app.services.promotion_service import PromotionService
from app.utils.dateZone import DateUtils
from app.utils.serializers import serialize_mongo
from app.websocket.events import broadcast_change
from app.config.settings import settings
from app.services.order_service import OrderService
from app.schema.order_schema import OrderCreate
from app.repositories.cash_register_repository import CashRegisterRepository


router = APIRouter(tags=["Online Store"])
products_service = ProductService()
promotions_service = PromotionService()
order_service = OrderService()
cash_register_repository = CashRegisterRepository()

ORDER_STATUSES = {
    "pending_payment",
    "paid",
    "paid_pending_cash",
    "preparing",
    "ready",
    "delivered",
    "cancelled",
}


def _serialize_order(doc):
    if not doc:
        return None

    doc["id"] = str(doc.pop("_id"))

    for key, value in list(doc.items()):
        if hasattr(value, "isoformat"):
            doc[key] = value.isoformat()

    return doc


def _is_public_https_url(value: str) -> bool:
    """
    Comprueba que una URL sea HTTPS y no apunte a localhost,
    una IP privada o una dirección local.
    Mercado Pago necesita URLs públicas para los retornos y webhooks.
    """
    if not value:
        return False

    parsed = urlparse(value.strip())

    if parsed.scheme.lower() != "https" or not parsed.hostname:
        return False

    hostname = parsed.hostname.lower()

    if hostname == "localhost" or hostname.endswith(".localhost"):
        return False

    if hostname.endswith(".local"):
        return False

    try:
        address = ip_address(hostname)
        if (
            address.is_private
            or address.is_loopback
            or address.is_reserved
            or address.is_link_local
            or address.is_unspecified
        ):
            return False
    except ValueError:
        # Si no es una IP, se considera un nombre de dominio.
        pass

    return True


@router.get("/settings/store")
async def get_store_configuration():
    store_config = await SettingsService.get_store_configuration()
    establishment = await SettingsService.get_establishment()
    commercial = await SettingsService.get_commercial()
    return {
        **store_config,
        "phone_number": establishment.get("phone_number", ""),
        "public_sales_enabled": bool(commercial.get("public_sales_enabled", False)),
    }


@router.put("/settings/store", dependencies=[Depends(require_admin)])
async def update_store_configuration(
    data: StoreConfigurationUpdate,
    request: Request,
    current_user=Depends(get_current_user),
):
    payload = data.model_dump(exclude={"phone_number", "public_sales_enabled"})

    for key in ("hero_image", "logo_url"):
        if payload[key] == "":
            payload[key] = None

    phone_number = None
    if data.phone_number is not None:
        phone_number = data.phone_number.strip()
        normalized_phone = phone_number.replace("+", "").replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
        if phone_number and not normalized_phone.isdigit():
            raise HTTPException(status_code=422, detail="El teléfono debe contener únicamente números y símbolos telefónicos.")

    updated_at = DateUtils.now_argentina()
    await database["app_settings"].update_one(
        {"_id": "store"},
        {"$set": {**payload, "updated_at": updated_at}},
        upsert=True,
    )

    # Los datos de contacto y la habilitación de ventas pertenecen al canal Store.
    # Se persisten en sus documentos actuales para no alterar consumidores existentes.
    if phone_number is not None:
        await database["app_settings"].update_one(
            {"_id": "establishment"},
            {"$set": {"phone_number": phone_number}},
            upsert=True,
        )

    if data.public_sales_enabled is not None:
        await database["app_settings"].update_one(
            {"_id": "commercial"},
            {"$set": {"public_sales_enabled": data.public_sales_enabled, "updated_at": updated_at}},
            upsert=True,
        )

    result = await get_store_configuration()
    await broadcast_change(
        "settings",
        "store_configuration_updated",
        result,
        request.headers.get("X-Client-ID"),
    )
    return result




class StoreCustomerCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=80)
    phone: str = Field(min_length=6, max_length=30)


def _customer_token_hash(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def _normalize_phone(value: str) -> str:
    return "".join(char for char in value if char.isdigit())


@router.post("/public/customers/access")
async def access_store_customer(data: StoreCustomerCreate):
    """Crea una cuenta simple o inicia sesión si los datos coinciden.

    La sesión dura 10 minutos. Para producción con datos personales se recomienda
    incorporar verificación OTP por SMS/WhatsApp.
    """
    phone = _normalize_phone(data.phone)
    first_name = data.first_name.strip()
    last_name = data.last_name.strip()
    if len(phone) < 6:
        raise HTTPException(422, "Ingresá un número de teléfono válido.")

    customers = database["store_customers"]
    customer = await customers.find_one({"phone": phone, "active": True})
    if customer and (
        customer.get("first_name", "").casefold() != first_name.casefold()
        or customer.get("last_name", "").casefold() != last_name.casefold()
    ):
        raise HTTPException(401, "Los datos no coinciden con una cuenta existente para ese teléfono.")

    now = DateUtils.now_argentina()
    if not customer:
        customer = {
            "first_name": first_name,
            "last_name": last_name,
            "phone": phone,
            "created_at": now,
            "active": True,
        }
        inserted = await customers.insert_one(customer)
        customer["_id"] = inserted.inserted_id

    token = secrets.token_urlsafe(36)
    expires_at = now + timedelta(minutes=10)
    await customers.update_one(
        {"_id": customer["_id"]},
        {"$set": {"token_hash": _customer_token_hash(token), "token_expires_at": expires_at, "last_login_at": now}},
    )

    # Vincula pedidos previos hechos como invitado con el mismo teléfono.
    guest_orders = database["online_orders"].find(
        {"customer_id": {"$exists": False}, "phone": {"$exists": True}},
        {"_id": 1, "phone": 1},
    )
    async for guest_order in guest_orders:
        if _normalize_phone(str(guest_order.get("phone", ""))) == phone:
            await database["online_orders"].update_one(
                {"_id": guest_order["_id"], "customer_id": {"$exists": False}},
                {"$set": {"customer_id": str(customer["_id"])}},
            )
    return {
        "token": token,
        "customer_id": str(customer["_id"]),
        "first_name": customer.get("first_name", first_name),
        "last_name": customer.get("last_name", last_name),
        "phone": phone,
        "expires_in": 600,
    }


@router.post("/public/customers/register")
async def register_store_customer(data: StoreCustomerCreate):
    # Compatibilidad con versiones anteriores del Store.
    return await access_store_customer(data)


async def _get_customer_from_request(request: Request):
    authorization = request.headers.get("Authorization", "")
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        return None
    customer = await database["store_customers"].find_one(
        {"token_hash": _customer_token_hash(token), "active": True}
    )
    if not customer:
        return None
    expires_at = customer.get("token_expires_at")
    if not expires_at or expires_at <= DateUtils.now_argentina():
        await database["store_customers"].update_one(
            {"_id": customer["_id"]}, {"$unset": {"token_hash": "", "token_expires_at": ""}}
        )
        return None
    return customer


@router.get("/public/customers/me")
async def get_store_customer_me(request: Request):
    customer = await _get_customer_from_request(request)
    if not customer:
        raise HTTPException(401, "La sesión venció. Volvé a iniciar sesión.")
    return {
        "first_name": customer.get("first_name", ""),
        "last_name": customer.get("last_name", ""),
        "phone": customer.get("phone", ""),
        "expires_at": customer.get("token_expires_at").isoformat() if customer.get("token_expires_at") else None,
    }


@router.get("/public/customers/me/orders")
async def get_store_customer_orders(request: Request):
    customer = await _get_customer_from_request(request)
    if not customer:
        raise HTTPException(401, "Iniciá sesión nuevamente para consultar tus compras.")
    cursor = database["online_orders"].find(
        {"customer_id": str(customer["_id"]), "payment_status": "approved"},
        {"_id": 0, "order_number": 1, "created_at": 1, "total": 1, "items.name": 1, "items.quantity": 1},
    ).sort("created_at", -1).limit(50)
    rows = []
    async for row in cursor:
        created = row.get("created_at")
        row["created_at"] = created.isoformat() if hasattr(created, "isoformat") else str(created or "")
        rows.append(row)
    return rows


@router.get("/public/promotions")
async def get_store_promotions():
    rows = await promotions_service.get_all()
    config = await SettingsService.get_store_configuration()
    allowed = set(config.get("enabled_promotion_ids", []))
    if config.get("promotion_selection_restricted", False):
        rows = [row for row in rows if row.get("id") in allowed]
    return [row for row in rows if row.get("status", True)]


@router.post("/public/online-orders")
async def create_online_order(data: OnlineOrderCreate, request: Request):
    commercial = await SettingsService.get_commercial()

    if not commercial.get("public_sales_enabled", False):
        raise HTTPException(403, "Las ventas online están deshabilitadas.")

    config = await SettingsService.get_store_configuration()
    open_register = await cash_register_repository.get_open_register()
    if not open_register:
        raise HTTPException(409, "La tienda está en modo de vista previa: el comercio no tiene una caja abierta.")

    if data.fulfillment == "delivery" and not config.get("delivery_enabled"):
        raise HTTPException(
            422,
            "La tienda no tiene habilitada la entrega a domicilio.",
        )

    if data.fulfillment == "pickup" and not config.get("pickup_enabled", True):
        raise HTTPException(
            422,
            "La tienda no tiene habilitado el retiro.",
        )

    token = settings.MERCADOPAGO_ACCESS_TOKEN.strip()

    if not token:
        raise HTTPException(
            503,
            "Mercado Pago todavía no está configurado en el servidor.",
        )

    # No crear preferencias que puedan cobrarse sin webhook ni retorno al Store.
    # En desarrollo local ambas URLs deben exponerse mediante HTTPS (ngrok/túnel).
    frontend_url = settings.STORE_FRONTEND_URL.strip().rstrip("/")
    api_url = settings.PUBLIC_API_URL.strip().rstrip("/")
    if not _is_public_https_url(frontend_url):
        raise HTTPException(
            503,
            "Falta configurar STORE_FRONTEND_URL con una URL HTTPS pública del Store (ngrok o dominio desplegado).",
        )
    if not _is_public_https_url(api_url):
        raise HTTPException(
            503,
            "Falta configurar PUBLIC_API_URL con una URL HTTPS pública del Backend para recibir las notificaciones de Mercado Pago.",
        )

    normalized_items = []
    total = 0.0
    enabled_ids = set(config.get("enabled_product_ids", []))
    discounts = config.get("product_discounts", {}) or {}
    general_store_discount = float(config.get("general_store_discount", 0) or 0)

    operational = (
        await database["app_settings"].find_one({"_id": "operational"}) or {}
    )
    allow_out_of_stock = bool(
        operational.get("allow_out_of_stock", False)
    )

    requested_quantities = {}
    for requested_item in data.items:
        requested_quantities[requested_item.product_id] = requested_quantities.get(requested_item.product_id, 0) + requested_item.quantity

    for item in data.items:
        product = await products_service.get_by_id(item.product_id)

        if config.get("catalog_restricted") and item.product_id not in enabled_ids:
            raise HTTPException(422, f"El producto {product.get('name')} no está habilitado para la tienda online.")

        if not product.get("status", True):
            raise HTTPException(
                422,
                f"El producto {product.get('name')} no está disponible.",
            )

        available_quantity = int(product.get("quantity", 0) or 0)
        requested_quantity = requested_quantities[item.product_id]
        if available_quantity < requested_quantity and not allow_out_of_stock:
            raise HTTPException(
                409,
                f"Stock insuficiente para {product.get('name')}. Disponible: {available_quantity}; solicitado: {requested_quantity}.",
            )

        price = float(product.get("price", 0) or 0)
        discount = float(product.get("discount_percentage") or 0)

        if not discount and commercial.get("general_discount_enabled"):
            discount = float(
                commercial.get("general_discount_percentage", 0) or 0
            )

        store_discount = float(discounts[item.product_id] if item.product_id in discounts else general_store_discount or 0)
        if not 0 <= store_discount <= 100:
            raise HTTPException(422, "La configuración de descuentos del Store no es válida.")
        effective_discount = store_discount if store_discount > 0 else discount
        final_price = round(price * (1 - effective_discount / 100), 2)
        line_total = round(final_price * item.quantity, 2)
        total += line_total

        normalized_items.append(
            {
                "product_id": item.product_id,
                "name": product.get("name"),
                "quantity": item.quantity,
                "unit_price": final_price,
                "line_total": line_total,
                "store_discount_percentage": effective_discount,
                "garnish": item.garnish,
                "removed_ingredients": item.removed_ingredients,
                "note": item.note,
            }
        )

    # Aplicar promociones vigentes habilitadas en el canal Store.
    promotion_rows = await promotions_service.get_all()
    allowed_promotion_ids = set(config.get("enabled_promotion_ids", []))
    if config.get("promotion_selection_restricted", False):
        promotion_rows = [p for p in promotion_rows if p.get("id") in allowed_promotion_ids]
    available_by_product = {}
    for row in normalized_items:
        available_by_product[row["product_id"]] = available_by_product.get(row["product_id"], 0) + int(row["quantity"])
    applied_promotions = []
    promotion_savings = 0.0
    for promotion in promotion_rows:
        if not promotion.get("status", True) or not promotion.get("items"):
            continue
        bundles = min((sum(available_by_product.get(pid, 0) for pid in group.get("product_ids", [])) // max(1, int(group.get("quantity", 1))) for group in promotion["items"]), default=0)
        if bundles < 1:
            continue
        base_total = 0.0
        consumed = {}
        for _ in range(bundles):
            for group in promotion["items"]:
                remaining = int(group["quantity"])
                for product_id in group["product_ids"]:
                    take = min(remaining, available_by_product.get(product_id, 0) - consumed.get(product_id, 0))
                    if take > 0:
                        row = next((r for r in normalized_items if r["product_id"] == product_id), None)
                        if row:
                            base_total += take * float(row["unit_price"])
                        consumed[product_id] = consumed.get(product_id, 0) + take
                        remaining -= take
                    if remaining <= 0:
                        break
        saving = max(0.0, base_total - bundles * float(promotion.get("price", 0)))
        if saving:
            promotion_savings += saving
            consumed_rows = dict(consumed)
            for product_id, count in consumed_rows.items():
                available_by_product[product_id] = max(0, available_by_product.get(product_id, 0) - count)
            applied_promotions.append({"promotion_id": promotion.get("id"), "name": promotion.get("name"), "bundles": bundles, "saving": round(saving, 2)})
    total = max(0.0, round(total - promotion_savings, 2))

    now = DateUtils.now_argentina()

    counter = await database["counters"].find_one_and_update(
        {"_id": "online_order_number"},
        {"$inc": {"value": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )

    order_number = int(counter["value"])

    order = {
        "order_number": order_number,
        "customer_name": data.customer_name.strip(),
        "phone": data.phone.strip(),
        "email": data.email,
        "fulfillment": data.fulfillment,
        "address": data.address.strip(),
        "pickup_time": data.pickup_time,
        "note": data.note,
        "items": normalized_items,
        "total": round(total, 2),
        "applied_promotions": applied_promotions,
        "currency": "ARS",
        "payment_status": "pending",
        "status": "pending_payment",
        "payment_provider": "mercadopago",
        "created_at": now,
        "updated_at": now,
        "external_reference": str(uuid4()),
        "cash_register_id": str(open_register.get("id") or open_register.get("_id")),
    }

    customer = await _get_customer_from_request(request)
    if customer:
        order["customer_id"] = str(customer["_id"])

    inserted = await database["online_orders"].insert_one(order)
    order_id = str(inserted.inserted_id)

    preference = {
        "items": [{
            "title": f"Pedido #{order_number} - Boutique de Sabores",
            "quantity": 1,
            "unit_price": round(total, 2),
            "currency_id": "ARS",
        }],
        "external_reference": order["external_reference"],
        "metadata": {"online_order_id": order_id},
    }

    # Las URLs de retorno solo se envían si la tienda tiene una URL
    # HTTPS pública. No se deben enviar localhost ni direcciones locales.
    if _is_public_https_url(frontend_url):
        preference["back_urls"] = {
            "success": f"{frontend_url}/?payment=success&order={order_id}",
            "failure": f"{frontend_url}/?payment=failure&order={order_id}",
            "pending": f"{frontend_url}/?payment=pending&order={order_id}",
        }
        preference["auto_return"] = "approved"

    # El webhook también debe ser accesible públicamente por HTTPS.
    if _is_public_https_url(api_url):
        preference["notification_url"] = f"{api_url}/payments/mercadopago/webhook"
    else:
        print("MERCADO PAGO WEBHOOK NO CONFIGURADO: PUBLIC_API_URL debe ser una URL HTTPS pública (ngrok/producción).")

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                "https://api.mercadopago.com/checkout/preferences",
                json=preference,
                headers={
                    "Authorization": f"Bearer {token}",
                    "Content-Type": "application/json",
                },
            )

            print("MERCADO PAGO STATUS:", response.status_code)

            if response.is_error:
                print("MERCADO PAGO ERROR:", response.text)

            response.raise_for_status()
            payment_preference = response.json()

    except httpx.HTTPStatusError as exc:
        await database["online_orders"].update_one(
            {"_id": inserted.inserted_id},
            {"$set": {"status": "payment_error"}},
        )

        print(
            "ERROR MERCADO PAGO:",
            exc.response.status_code,
            exc.response.text,
        )

        raise HTTPException(
            status_code=502,
            detail="Mercado Pago rechazó la creación del pago.",
        )

    except (httpx.HTTPError, ValueError) as exc:
        await database["online_orders"].update_one(
            {"_id": inserted.inserted_id},
            {"$set": {"status": "payment_error"}},
        )

        print("ERROR DE CONEXIÓN MERCADO PAGO:", str(exc))

        raise HTTPException(
            status_code=502,
            detail="No se pudo conectar con Mercado Pago.",
        )

    checkout_url = payment_preference.get("init_point")

    await database["online_orders"].update_one(
        {"_id": inserted.inserted_id},
        {
            "$set": {
                "preference_id": payment_preference.get("id"),
                "checkout_url": checkout_url,
            }
        },
    )

    return {
        "order_id": order_id,
        "order_number": order_number,
        "checkout_url": checkout_url,
        "total": round(total, 2),
    }


@router.post("/payments/mercadopago/webhook")
async def mercadopago_webhook(request: Request):
    payload = (
        await request.json()
        if request.headers.get("content-type", "").startswith(
            "application/json"
        )
        else {}
    )

    payment_id = (
        (payload.get("data") or {}).get("id")
        or payload.get("id")
        or request.query_params.get("data.id")
        or request.query_params.get("id")
        or request.query_params.get("collection_id")
    )
    # Algunas notificaciones antiguas envían resource como URL.
    resource = payload.get("resource") or request.query_params.get("resource")
    if not payment_id and isinstance(resource, str):
        payment_id = resource.rstrip("/").split("/")[-1]

    if not payment_id:
        print("MERCADO PAGO WEBHOOK SIN PAYMENT ID:", payload, dict(request.query_params))
        return {"received": True, "matched": False, "reason": "payment_id_missing"}

    token = settings.MERCADOPAGO_ACCESS_TOKEN.strip()

    if not token:
        raise HTTPException(503, "Mercado Pago no está configurado.")

    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(
            f"https://api.mercadopago.com/v1/payments/{payment_id}",
            headers={"Authorization": f"Bearer {token}"},
        )
        if response.is_error:
            print("MERCADO PAGO WEBHOOK PAYMENT LOOKUP ERROR:", response.status_code, response.text)
        response.raise_for_status()
        payment = response.json()

    external_reference = payment.get("external_reference")
    order = await database["online_orders"].find_one(
        {"external_reference": external_reference}
    )

    if not order:
        print("MERCADO PAGO WEBHOOK SIN ORDEN:", payment_id, external_reference)
        return {"received": True, "matched": False}

    approved = (
        payment.get("status") == "approved"
        and payment.get("currency_id") == "ARS"
        and round(float(payment.get("transaction_amount", 0)), 2)
        == round(float(order.get("total", 0)), 2)
    )

    status = (
        "paid"
        if approved
        else (
            "cancelled"
            if payment.get("status")
            in {"rejected", "cancelled", "refunded", "charged_back"}
            else "pending_payment"
        )
    )

    update_fields = {
        "payment_status": payment.get("status"),
        "status": status,
        "payment_id": str(payment_id),
        "payment_detail": payment.get("status_detail"),
        "updated_at": DateUtils.now_argentina(),
    }

    if approved and not order.get("administrative_order_id"):
        # Un pago aprobado solo se convierte en comanda si la caja capturada
        # al iniciar el checkout sigue abierta. Nunca se reasigna a otra caja.
        register_id = str(order.get("cash_register_id") or "")
        register = await cash_register_repository.get_by_id(register_id) if register_id else None
        if not register or not register.get("status") or register.get("status_cash_register") != "open":
            update_fields["status"] = "paid_pending_cash"
            update_fields["conversion_error"] = "La caja asociada al checkout ya no está abierta."
        else:
            # Reservar la conversión para hacer el webhook idempotente ante reintentos.
            reserved = await database["online_orders"].update_one(
                {"_id": order["_id"], "administrative_order_id": {"$exists": False}, "conversion_state": {"$ne": "processing"}},
                {"$set": {"conversion_state": "processing", **update_fields}},
            )
            if reserved.modified_count:
                try:
                    order_items = [
                        {"item_type": "product", "product_id": item["product_id"], "quantity": item["quantity"], "store_discount_percentage": item.get("store_discount_percentage", 0), "garnish": item.get("garnish") or None, "removed_ingredients": item.get("removed_ingredients", [])}
                        for item in order.get("items", [])
                    ]
                    existing_admin_order = await database["orders"].find_one({"online_order_id": str(order["_id"])})
                    admin_order = serialize_mongo(existing_admin_order) if existing_admin_order else await order_service.create(
                        OrderCreate(
                            order_number=0,
                            customer_name=order.get("customer_name", "Cliente online"),
                            items=order_items,
                            method_payment="transfer",
                            status_payment="paid",
                            delivery_time=order.get("pickup_time") or "Lo antes posible",
                            cash_register_id=register_id,
                            payments=[{"method_payment": "transfer", "amount": float(order.get("total", 0))}],
                            discount_type="amount" if float(sum(float(p.get("saving", 0)) for p in order.get("applied_promotions", []))) > 0 else None,
                            discount_value=round(sum(float(p.get("saving", 0)) for p in order.get("applied_promotions", [])), 2),
                            observation=(f"PEDIDO ONLINE #{order.get('order_number')} · {order.get('fulfillment', 'pickup')} · {order.get('phone', '')} · {order.get('address', '')} · {order.get('note', '')}")[:1000],
                            source="online",
                            online_order_id=str(order["_id"]),
                            confirmed_out_of_stock=bool((await database["app_settings"].find_one({"_id": "operational"}) or {}).get("allow_out_of_stock", False)),
                        ),
                        "mercadopago",
                    )
                    update_fields.update({"status": "paid", "conversion_state": "completed", "administrative_order_id": admin_order.get("id"), "administrative_order_number": admin_order.get("order_number")})
                    order["_converted_admin_order"] = admin_order
                except Exception as exc:
                    update_fields.update({"status": "paid_pending_cash", "conversion_state": "error", "conversion_error": str(exc)[:1000]})
                    print(
                        "MERCADO PAGO: pago aprobado pero falló la creación de comanda",
                        {"online_order_id": str(order.get("_id")), "payment_id": str(payment_id), "cash_register_id": register_id, "error": repr(exc)},
                    )
            else:
                # Otro webhook ya está procesando o convirtió este pago.
                latest = await database["online_orders"].find_one({"_id": order["_id"]})
                if latest and latest.get("administrative_order_id"):
                    update_fields["administrative_order_id"] = latest["administrative_order_id"]
                    update_fields["status"] = latest.get("status", "paid")
                else:
                    return {"received": True, "matched": True, "conversion": "processing"}

    await database["online_orders"].update_one({"_id": order["_id"]}, {"$set": update_fields})

    if approved:
        latest = await database["online_orders"].find_one({"_id": order["_id"]})
        await broadcast_change("online_order", "paid", _serialize_order(latest))
        if latest and latest.get("administrative_order_id"):
            admin_order = order.get("_converted_admin_order")
            if admin_order:
                await broadcast_change("order", "created", admin_order)

    latest_order = await database["online_orders"].find_one({"_id": order["_id"]})
    return {
        "received": True,
        "matched": True,
        "payment_status": latest_order.get("payment_status") if latest_order else None,
        "order_status": latest_order.get("status") if latest_order else None,
        "conversion_state": latest_order.get("conversion_state") if latest_order else None,
        "administrative_order_id": latest_order.get("administrative_order_id") if latest_order else None,
        "conversion_error": latest_order.get("conversion_error") if latest_order else None,
    }


@router.get("/online-orders", dependencies=[Depends(require_admin)])
async def list_online_orders(status: str | None = None):
    query = {"status": status} if status else {}
    cursor = database["online_orders"].find(query).sort("created_at", -1)
    return [_serialize_order(row) async for row in cursor]


@router.patch(
    "/online-orders/{order_id}",
    dependencies=[Depends(require_admin)],
)
async def update_online_order_status(
    order_id: str,
    data: OnlineOrderStatusUpdate,
    request: Request,
):
    if data.status not in ORDER_STATUSES:
        raise HTTPException(422, "Estado de pedido inválido.")

    if not ObjectId.is_valid(order_id):
        raise HTTPException(404, "Pedido no encontrado.")

    current = await database["online_orders"].find_one(
        {"_id": ObjectId(order_id)}
    )

    if not current:
        raise HTTPException(404, "Pedido no encontrado.")

    if data.status == "paid" and current.get("payment_status") == "approved" and not current.get("administrative_order_id"):
        raise HTTPException(409, "El pago fue aprobado, pero todavía no se generó la comanda administrativa.")

    if data.status == "paid" and current.get("payment_status") != "approved":
        raise HTTPException(
            409,
            "El pago todavía no fue confirmado por Mercado Pago.",
        )

    if data.status in {"preparing", "ready", "delivered"} and not current.get("administrative_order_id"):
        raise HTTPException(409, "El pago está aprobado, pero todavía no existe una comanda administrativa vinculada.")

    if (
        data.status in {"preparing", "ready", "delivered"}
        and current.get("payment_status") != "approved"
    ):
        raise HTTPException(
            409,
            "No se puede avanzar un pedido hasta confirmar su pago.",
        )

    result = await database["online_orders"].update_one(
        {"_id": ObjectId(order_id)},
        {
            "$set": {
                "status": data.status,
                "updated_at": DateUtils.now_argentina(),
            }
        },
    )

    if not result.matched_count:
        raise HTTPException(404, "Pedido no encontrado.")

    order = await database["online_orders"].find_one(
        {"_id": ObjectId(order_id)}
    )
    serialized = _serialize_order(order)

    await broadcast_change(
        "online_order",
        "updated",
        serialized,
        request.headers.get("X-Client-ID"),
    )

    return serialized
