from datetime import timedelta
import secrets
from ipaddress import ip_address
from urllib.parse import urlparse
from uuid import uuid4

import httpx
from bson import ObjectId
from pymongo import ReturnDocument
from fastapi import HTTPException, Request

from app.repositories.store_repository import store_repository
from app.schema.store_schema import (
    StoreConfigurationUpdate,
    OnlineOrderCreate,
    OnlineOrderStatusUpdate,
    StoreCustomerCreate,
    StoreCustomerUpdate,
)
from app.services.settings_service import SettingsService
from app.services.product_service import ProductService
from app.services.promotion_service import PromotionService
from app.utils.dateZone import DateUtils
from app.utils.serializers import serialize_mongo
from app.websocket.events import broadcast_change
from app.config.settings import settings
from app.services.order_service import OrderService
from app.schema.order_schema import OrderCreate, OrderUpdate
from app.repositories.cash_register_repository import CashRegisterRepository
from app.services.store_customer_service import StoreCustomerService
from app.services.sales_analytics_service import SalesAnalyticsService
from fastapi import Query


# La capa HTTP está definida en app.api.routes.store
products_service = ProductService()
promotions_service = PromotionService()
order_service = OrderService()
cash_register_repository = CashRegisterRepository()
store_customer_service = StoreCustomerService()
sales_analytics_service = SalesAnalyticsService()

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


async def get_store_configuration():
    store_config = await SettingsService.get_store_configuration()
    establishment = await SettingsService.get_establishment()
    commercial = await SettingsService.get_commercial()
    return {
        **store_config,
        "phone_number": establishment.get("phone_number", ""),
        "public_sales_enabled": bool(commercial.get("public_sales_enabled", False)),
    }


async def update_store_configuration(
    data: StoreConfigurationUpdate,
    request: Request,
    current_user=None,
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
    await store_repository.collection("app_settings").update_one(
        {"_id": "store"},
        {"$set": {**payload, "updated_at": updated_at}},
        upsert=True,
    )

    # Los datos de contacto y la habilitación de ventas pertenecen al canal Store.
    # Se persisten en sus documentos actuales para no alterar consumidores existentes.
    if phone_number is not None:
        await store_repository.collection("app_settings").update_one(
            {"_id": "establishment"},
            {"$set": {"phone_number": phone_number}},
            upsert=True,
        )

    if data.public_sales_enabled is not None:
        await store_repository.collection("app_settings").update_one(
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




async def access_store_customer(data: StoreCustomerCreate):
    """Crea una cuenta o inicia sesión y vincula compras históricas por teléfono."""
    return await store_customer_service.access(data)


async def register_store_customer(data: StoreCustomerCreate):
    # El endpoint de registro no permite reutilizar un teléfono ya registrado.
    return await store_customer_service.access(data, reject_existing=True)


async def _get_customer_from_request(request: Request):
    return await store_customer_service.get_from_request(request)


async def get_store_customer_me(request: Request):
    return await store_customer_service.me(request)


async def update_store_customer_account(data: StoreCustomerUpdate, request: Request):
    return await store_customer_service.update_account(data, request)


async def get_store_customer_orders(request: Request):
    return await store_customer_service.orders(request)


async def request_store_order_refund(order_number: int, request: Request):
    customer = await _get_customer_from_request(request)
    if not customer:
        raise HTTPException(401, "Iniciá sesión nuevamente para solicitar el reembolso.")

    order = await store_repository.collection("online_orders").find_one({
        "customer_id": str(customer["_id"]),
        "order_number": order_number,
    })
    if not order:
        raise HTTPException(404, "No encontramos esa compra en tu cuenta.")
    if order.get("payment_status") != "approved":
        raise HTTPException(409, "Solo se puede solicitar el reembolso de una compra pagada y aprobada.")
    if not order.get("payment_id") or not order.get("administrative_order_id"):
        raise HTTPException(409, "La compra todavía no está vinculada a una comanda y no puede reembolsarse.")
    if order.get("refund_status") in {"requested", "processing", "refunded", "refunded_needs_sync"}:
        raise HTTPException(409, "Esta compra ya tiene una solicitud de reembolso en curso o procesada.")

    now = DateUtils.now_argentina()
    result = await store_repository.collection("online_orders").update_one(
        {"_id": order["_id"], "payment_status": "approved", "refund_status": {"$nin": ["requested", "processing", "refunded", "refunded_needs_sync"]}},
        {"$set": {"refund_status": "requested", "refund_requested_at": now, "updated_at": now}},
    )
    if not result.modified_count:
        raise HTTPException(409, "La solicitud ya fue registrada por otra operación.")

    updated = await store_repository.collection("online_orders").find_one({"_id": order["_id"]})
    await broadcast_change("online_order", "refund_requested", _serialize_order(updated))

    # El cliente puede cancelar una compra aprobada. Se reutiliza exactamente
    # el flujo idempotente de reembolso del administrador: Mercado Pago primero,
    # sincronización contable y cancelación de la comanda después.
    return await process_online_order_refund(
        str(order["_id"]),
        request,
        {"sub": f"store-customer:{customer['_id']}"},
    )


async def get_store_promotions():
    rows = await promotions_service.get_all()
    config = await SettingsService.get_store_configuration()
    allowed = set(config.get("enabled_promotion_ids", []))
    if config.get("promotion_selection_restricted", False):
        rows = [row for row in rows if row.get("id") in allowed]
    rows = [row for row in rows if row.get("status", True)]
    highlight_mode = config.get("promotion_highlight_mode", "manual")
    if highlight_mode == "best_selling":
        ranking = await sales_analytics_service.promotion_ranking(
            int(config.get("ranking_period_days", 30) or 0),
            int(config.get("ranking_limit", 8) or 8),
        )
        ranking_ids = [row["id"] for row in ranking["items"]]
        ranking_position = {promotion_id: index for index, promotion_id in enumerate(ranking_ids)}
        for row in rows:
            row["featured"] = row.get("id") in ranking_position
            row["highlight_mode"] = highlight_mode
        rows.sort(key=lambda row: ranking_position.get(row.get("id"), 10**6))
    else:
        for row in rows:
            row["featured"] = row.get("id") in allowed
            row["highlight_mode"] = highlight_mode
    return rows


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
        await store_repository.collection("app_settings").find_one({"_id": "operational"}) or {}
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

    counter = await store_repository.collection("counters").find_one_and_update(
        {"_id": "online_order_number"},
        {"$inc": {"value": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )

    order_number = int(counter["value"])

    order = {
        "order_number": order_number,
        "customer_name": data.customer_name.strip() or "Cliente online",
        "phone": data.phone.strip(),
        "customer_phone_normalized": store_customer_service.normalize_phone(data.phone),
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

    inserted = await store_repository.collection("online_orders").insert_one(order)
    order_id = str(inserted.inserted_id)
    created_order = await store_repository.collection("online_orders").find_one({"_id": inserted.inserted_id})
    await broadcast_change("online_order", "created", _serialize_order(created_order), request.headers.get("X-Client-ID"))

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
        await store_repository.collection("online_orders").update_one(
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
        await store_repository.collection("online_orders").update_one(
            {"_id": inserted.inserted_id},
            {"$set": {"status": "payment_error"}},
        )

        print("ERROR DE CONEXIÓN MERCADO PAGO:", str(exc))

        raise HTTPException(
            status_code=502,
            detail="No se pudo conectar con Mercado Pago.",
        )

    checkout_url = payment_preference.get("init_point")

    await store_repository.collection("online_orders").update_one(
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
    order = await store_repository.collection("online_orders").find_one(
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
            reserved = await store_repository.collection("online_orders").update_one(
                {"_id": order["_id"], "administrative_order_id": {"$exists": False}, "conversion_state": {"$ne": "processing"}},
                {"$set": {"conversion_state": "processing", "conversion_started_at": DateUtils.now_argentina(), **update_fields}},
            )
            if reserved.modified_count:
                try:
                    order_items = [
                        {"item_type": "product", "product_id": item["product_id"], "quantity": item["quantity"], "store_discount_percentage": item.get("store_discount_percentage", 0), "garnish": item.get("garnish") or None, "removed_ingredients": item.get("removed_ingredients", [])}
                        for item in order.get("items", [])
                    ]
                    existing_admin_order = await store_repository.collection("orders").find_one({"online_order_id": str(order["_id"])})
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
                            confirmed_out_of_stock=bool((await store_repository.collection("app_settings").find_one({"_id": "operational"}) or {}).get("allow_out_of_stock", False)),
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
                latest = await store_repository.collection("online_orders").find_one({"_id": order["_id"]})
                if latest and latest.get("administrative_order_id"):
                    update_fields["administrative_order_id"] = latest["administrative_order_id"]
                    update_fields["status"] = latest.get("status", "paid")
                else:
                    # Recuperación ante una caída entre crear la comanda y
                    # guardar su ID en online_orders. La clave online_order_id
                    # evita duplicar comandas al reintentar el webhook.
                    recovered_admin_doc = await store_repository.collection("orders").find_one(
                        {"online_order_id": str(order["_id"])}
                    )
                    if recovered_admin_doc:
                        recovered_admin = serialize_mongo(recovered_admin_doc)
                        update_fields.update({
                            "administrative_order_id": recovered_admin.get("id"),
                            "administrative_order_number": recovered_admin.get("order_number"),
                            "status": "paid",
                            "conversion_state": "completed",
                        })
                        order["_converted_admin_order"] = recovered_admin
                    else:
                        return {"received": True, "matched": True, "conversion": "processing"}

    await store_repository.collection("online_orders").update_one({"_id": order["_id"]}, {"$set": update_fields})

    if approved:
        latest = await store_repository.collection("online_orders").find_one({"_id": order["_id"]})
        await broadcast_change("online_order", "paid", _serialize_order(latest))
        if latest and latest.get("administrative_order_id"):
            admin_order = order.get("_converted_admin_order")
            if admin_order:
                await broadcast_change("order", "created", admin_order)

    latest_order = await store_repository.collection("online_orders").find_one({"_id": order["_id"]})
    return {
        "received": True,
        "matched": True,
        "payment_status": latest_order.get("payment_status") if latest_order else None,
        "order_status": latest_order.get("status") if latest_order else None,
        "conversion_state": latest_order.get("conversion_state") if latest_order else None,
        "administrative_order_id": latest_order.get("administrative_order_id") if latest_order else None,
        "conversion_error": latest_order.get("conversion_error") if latest_order else None,
    }


async def list_online_orders(status: str | None = None):
    query = {"status": status} if status else {}
    cursor = store_repository.collection("online_orders").find(query).sort("created_at", -1)
    return [_serialize_order(row) async for row in cursor]


async def retry_online_order_conversion(
    order_id: str,
    request: Request,
    current_user=None,
):
    if not ObjectId.is_valid(order_id):
        raise HTTPException(404, "Pedido no encontrado.")
    order = await store_repository.collection("online_orders").find_one({"_id": ObjectId(order_id)})
    if not order:
        raise HTTPException(404, "Pedido no encontrado.")
    if order.get("payment_status") != "approved":
        raise HTTPException(409, "El pago todavía no está aprobado por Mercado Pago.")
    if order.get("administrative_order_id"):
        return _serialize_order(order)

    register_id = str(order.get("cash_register_id") or "")
    register = await cash_register_repository.get_by_id(register_id) if register_id else None
    if not register or not register.get("status") or register.get("status_cash_register") != "open":
        raise HTTPException(409, "Abrí la misma caja asociada al checkout para poder crear la comanda.")

    # Recuperar una comanda que pudiera haberse creado antes de una caída.
    existing_doc = await store_repository.collection("orders").find_one({"online_order_id": str(order["_id"])})
    if existing_doc:
        admin_order = serialize_mongo(existing_doc)
    else:
        now = DateUtils.now_argentina()
        reserved = await store_repository.collection("online_orders").update_one(
            {
                "_id": order["_id"],
                "administrative_order_id": {"$exists": False},
                "$or": [
                    {"conversion_state": {"$ne": "processing"}},
                    {"conversion_started_at": {"$lte": now - timedelta(minutes=2)}},
                    {"conversion_started_at": {"$exists": False}},
                ],
            },
            {"$set": {"conversion_state": "processing", "conversion_started_at": now}},
        )
        if not reserved.modified_count:
            latest = await store_repository.collection("online_orders").find_one({"_id": order["_id"]})
            if latest and latest.get("administrative_order_id"):
                return _serialize_order(latest)
            raise HTTPException(409, "La conversión del pedido ya está siendo procesada. Esperá unos segundos y actualizá.")

        try:
            order_items = [
                {
                    "item_type": "product",
                    "product_id": item["product_id"],
                    "quantity": item["quantity"],
                    "store_discount_percentage": item.get("store_discount_percentage", 0),
                    "garnish": item.get("garnish") or None,
                    "removed_ingredients": item.get("removed_ingredients", []),
                }
                for item in order.get("items", [])
            ]
            admin_order = await order_service.create(
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
                    confirmed_out_of_stock=bool((await store_repository.collection("app_settings").find_one({"_id": "operational"}) or {}).get("allow_out_of_stock", False)),
                ),
                str(current_user["sub"]),
            )
        except Exception as exc:
            await store_repository.collection("online_orders").update_one(
                {"_id": order["_id"]},
                {"$set": {"status": "paid_pending_cash", "conversion_state": "error", "conversion_error": str(exc)[:1000], "updated_at": DateUtils.now_argentina()}, "$unset": {"conversion_started_at": ""}},
            )
            raise HTTPException(409, f"No se pudo crear la comanda: {str(exc)[:400]}") from exc

    await store_repository.collection("online_orders").update_one(
        {"_id": order["_id"]},
        {"$set": {
            "status": "paid",
            "conversion_state": "completed",
            "administrative_order_id": admin_order.get("id"),
            "administrative_order_number": admin_order.get("order_number"),
            "updated_at": DateUtils.now_argentina(),
        }, "$unset": {"conversion_error": "", "conversion_started_at": ""}},
    )
    latest = await store_repository.collection("online_orders").find_one({"_id": order["_id"]})
    serialized = _serialize_order(latest)
    await broadcast_change("online_order", "updated", serialized, request.headers.get("X-Client-ID"))
    await broadcast_change("order", "created", admin_order, request.headers.get("X-Client-ID"))
    return serialized


async def process_online_order_refund(
    order_id: str,
    request: Request,
    current_user=None,
):
    if not ObjectId.is_valid(order_id):
        raise HTTPException(404, "Pedido no encontrado.")

    order = await store_repository.collection("online_orders").find_one({"_id": ObjectId(order_id)})
    if not order:
        raise HTTPException(404, "Pedido no encontrado.")
    if order.get("refund_status") == "refunded":
        return _serialize_order(order)
    if order.get("refund_status") not in {"requested", "processing", "refunded_needs_sync", "refunded"}:
        # Administración puede iniciar la cancelación sin que el cliente
        # haya abierto previamente una solicitud.
        if order.get("payment_status") == "approved":
            now_request = DateUtils.now_argentina()
            await store_repository.online_orders.update_one(
                {"_id": order["_id"], "payment_status": "approved", "refund_status": {"$nin": ["requested", "processing", "refunded_needs_sync", "refunded"]}},
                {"$set": {"refund_status": "requested", "refund_requested_at": now_request, "updated_at": now_request}},
            )
            order = await store_repository.online_orders.find_one({"_id": order["_id"]})
        else:
            raise HTTPException(409, "El pedido no tiene un pago aprobado que pueda reembolsarse.")
    if order.get("payment_status") not in {"approved", "refunded"}:
        raise HTTPException(409, "El pago no está aprobado o ya fue reembolsado.")
    if not order.get("administrative_order_id"):
        raise HTTPException(409, "No existe una comanda administrativa vinculada a este pedido.")

    original_register_id = str(order.get("cash_register_id") or "")
    original_register = await cash_register_repository.get_by_id(original_register_id) if original_register_id else None
    if not original_register or not original_register.get("status") or original_register.get("status_cash_register") != "open":
        if not await cash_register_repository.get_open_register():
            raise HTTPException(409, "Abrí una caja para registrar el egreso del reembolso antes de devolver el dinero.")

    now = DateUtils.now_argentina()
    refund_status = order.get("refund_status")
    already_refunded_at_provider = refund_status == "refunded_needs_sync"

    # Reservar el reembolso. Si quedó processing por una caída, se permite
    # recuperar la operación después de dos minutos usando la misma clave MP.
    if not already_refunded_at_provider:
        if refund_status == "processing":
            updated_at = order.get("updated_at")
            if updated_at and updated_at > now - timedelta(minutes=2):
                raise HTTPException(409, "El reembolso ya está siendo procesado. Esperá y actualizá el pedido.")
            reservation_filter = {
                "_id": order["_id"],
                "refund_status": "processing",
                "updated_at": updated_at,
            }
        else:
            reservation_filter = {"_id": order["_id"], "refund_status": "requested"}

        reserved = await store_repository.collection("online_orders").update_one(
            reservation_filter,
            {"$set": {"refund_status": "processing", "updated_at": now}},
        )
        if not reserved.modified_count:
            latest = await store_repository.collection("online_orders").find_one({"_id": order["_id"]})
            if latest and latest.get("refund_status") == "refunded":
                return _serialize_order(latest)
            raise HTTPException(409, "El reembolso está siendo procesado por otra operación.")

        payment_id = order.get("payment_id")
        token = settings.MERCADOPAGO_ACCESS_TOKEN.strip()
        if not payment_id or not token:
            await store_repository.collection("online_orders").update_one(
                {"_id": order["_id"], "refund_status": "processing"},
                {"$set": {"refund_status": "requested", "updated_at": DateUtils.now_argentina()}},
            )
            raise HTTPException(503, "No se pudo validar el pago original para reembolsarlo.")

        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.post(
                    f"https://api.mercadopago.com/v1/payments/{payment_id}/refund",
                    headers={
                        "Authorization": f"Bearer {token}",
                        "X-Idempotency-Key": f"boutique-refund-{order_id}",
                        "Content-Type": "application/json",
                    },
                    json={},
                )
            response.raise_for_status()
            refund_data = response.json()
            if refund_data.get("status") not in {"approved", "refunded", None}:
                raise HTTPException(502, "Mercado Pago no confirmó el reembolso.")
        except HTTPException:
            await store_repository.collection("online_orders").update_one(
                {"_id": order["_id"], "refund_status": "processing"},
                {"$set": {"refund_status": "requested", "updated_at": DateUtils.now_argentina()}},
            )
            raise
        except Exception as exc:
            await store_repository.collection("online_orders").update_one(
                {"_id": order["_id"], "refund_status": "processing"},
                {"$set": {"refund_status": "requested", "refund_error": str(exc)[:500], "updated_at": DateUtils.now_argentina()}},
            )
            raise HTTPException(502, "Mercado Pago no pudo completar el reembolso. Podés volver a intentar.") from exc

        await store_repository.collection("online_orders").update_one(
            {"_id": order["_id"], "refund_status": "processing"},
            {"$set": {
                "refund_status": "refunded_needs_sync",
                "refund_provider_id": str(refund_data.get("id", "")),
                "refund_provider_status": refund_data.get("status", "approved"),
                "payment_status": "refunded",
                "updated_at": DateUtils.now_argentina(),
            }, "$unset": {"refund_error": ""}},
        )

    # Reservar por separado la sincronización contable/operativa para evitar
    # duplicar movimientos de caja si dos administradores actúan a la vez.
    current_sync = await store_repository.collection("online_orders").find_one({"_id": order["_id"]})
    sync_state = (current_sync or {}).get("refund_sync_state")
    sync_started_at = (current_sync or {}).get("refund_sync_started_at")
    if sync_state == "processing" and sync_started_at and sync_started_at > now - timedelta(minutes=2):
        raise HTTPException(409, "El reintegro ya fue aceptado y se está sincronizando con la comanda.")

    sync_filter = {
        "_id": order["_id"],
        "refund_status": "refunded_needs_sync",
        "$or": [
            {"refund_sync_state": {"$ne": "processing"}},
            {"refund_sync_started_at": {"$lte": now - timedelta(minutes=2)}},
            {"refund_sync_started_at": {"$exists": False}},
        ],
    }
    sync_reserved = await store_repository.collection("online_orders").update_one(
        sync_filter,
        {"$set": {"refund_sync_state": "processing", "refund_sync_started_at": now}},
    )
    if not sync_reserved.modified_count:
        latest = await store_repository.collection("online_orders").find_one({"_id": order["_id"]})
        if latest and latest.get("refund_status") == "refunded":
            return _serialize_order(latest)
        raise HTTPException(409, "La sincronización del reembolso ya está siendo procesada.")

    # Solo después de la confirmación de Mercado Pago se autoriza la
    # cancelación de la comanda online. OrderService registra el egreso y stock.
    await store_repository.collection("orders").update_one(
        {"_id": ObjectId(str(order.get("administrative_order_id")))},
        {"$set": {"online_refund_confirmed": True}},
    )
    try:
        await order_service.update(
            str(order.get("administrative_order_id")),
            OrderUpdate(status_payment="cancelled"),
            str(current_user["sub"]),
        )
    except Exception as exc:
        await store_repository.collection("online_orders").update_one(
            {"_id": order["_id"]},
            {"$set": {
                "refund_status": "refunded_needs_sync",
                "refund_sync_state": "error",
                "refund_sync_error": str(exc)[:500],
                "updated_at": DateUtils.now_argentina(),
            }, "$unset": {"refund_sync_started_at": ""}},
        )
        raise HTTPException(409, "El dinero fue devuelto por Mercado Pago, pero no se pudo cancelar la comanda. Reintentá la sincronización desde este pedido.") from exc

    await store_repository.collection("online_orders").update_one(
        {"_id": order["_id"]},
        {"$set": {
            "refund_status": "refunded",
            "refund_sync_state": "completed",
            "payment_status": "refunded",
            "status": "cancelled",
            "refund_processed_at": DateUtils.now_argentina(),
            "updated_at": DateUtils.now_argentina(),
        }, "$unset": {"refund_sync_error": "", "refund_sync_started_at": ""}},
    )
    latest = await store_repository.collection("online_orders").find_one({"_id": order["_id"]})
    serialized = _serialize_order(latest)
    await broadcast_change("online_order", "refunded", serialized, request.headers.get("X-Client-ID"))
    await broadcast_change("order", "updated", {"id": order.get("administrative_order_id"), "status_payment": "cancelled"})
    return serialized


async def update_online_order_status(
    order_id: str,
    data: OnlineOrderStatusUpdate,
    request: Request,
):
    if data.status not in ORDER_STATUSES:
        raise HTTPException(422, "Estado de pedido inválido.")

    if not ObjectId.is_valid(order_id):
        raise HTTPException(404, "Pedido no encontrado.")

    current = await store_repository.collection("online_orders").find_one(
        {"_id": ObjectId(order_id)}
    )

    if not current:
        raise HTTPException(404, "Pedido no encontrado.")

    if data.status == "paid" and current.get("payment_status") == "approved" and not current.get("administrative_order_id"):
        raise HTTPException(409, "El pago fue aprobado, pero todavía no se generó la comanda administrativa.")

    if data.status == "cancelled" and current.get("payment_status") == "approved" and current.get("refund_status") != "refunded":
        raise HTTPException(409, "Este pedido ya fue pagado. Para cancelarlo primero procesá el reembolso de Mercado Pago.")

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

    result = await store_repository.collection("online_orders").update_one(
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

    order = await store_repository.collection("online_orders").find_one(
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

