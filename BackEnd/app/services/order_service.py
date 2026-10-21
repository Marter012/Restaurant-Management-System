from app.utils.dateZone import DateUtils

from app.services.base_service import BaseService

from app.services.stock_movement_service import (
    StockMovementService
)

from app.services.cash_movement_service import (
    CashMovementService
)

from app.repositories.order_repository import (
    OrderRepository
)

from app.repositories.product_repository import (
    ProductRepository
)

from app.repositories.cash_register_repository import (
    CashRegisterRepository
)

from app.database.connection import database

from app.repositories.base_repository import BaseRepository

from app.schema.stock_movement_schema import (
    StockMovementCreate
)

from app.schema.cash_movement_schema import (
    CashMovementCreate
)

from app.utils.exceptions import NotFoundException
from uuid import uuid4
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError


class PromotionRepository(BaseRepository):
    """
    Repositorio local para promociones.
    """

    def __init__(self):
        self.collection = database["promotions"]
        super().__init__(self.collection)

    async def get_by_id(self, promotion_id):
        return await super().get_by_id(promotion_id)


class OrderService(BaseService):

    def __init__(self):

        self.repository = OrderRepository()

        self.product_repository = ProductRepository()

        self.stock_movement_service = StockMovementService()

        self.cash_movement_service = CashMovementService()

        self.cash_register_repository = CashRegisterRepository()

        self.promotion_repository = PromotionRepository()

        super().__init__(self.repository)

    async def _out_of_stock_enabled(self):
        settings = await database["app_settings"].find_one({"_id": "operational"})
        return bool(settings and settings.get("allow_out_of_stock", False))

    async def _next_order_number(self, cash_register_id):
        """Asigna un número de comanda atómico por caja/turno."""
        cursor = self.repository.collection.find(
            {"cash_register_id": str(cash_register_id)}
        ).sort("order_number", -1).limit(1)
        existing = await cursor.to_list(length=1)
        highest_existing = int(existing[0].get("order_number", 0)) if existing else 0
        counter_filter = {"_id": str(cash_register_id)}
        update_pipeline = [{"$set": {
            "value": {
                "$add": [
                    {"$max": [{"$ifNull": ["$value", 0]}, highest_existing]},
                    1,
                ]
            }
        }}]
        try:
            counter = await database["order_counters"].find_one_and_update(
                counter_filter,
                update_pipeline,
                upsert=True,
                return_document=ReturnDocument.AFTER,
            )
        except DuplicateKeyError:
            # Dos primeras ventas concurrentes pueden intentar crear el mismo
            # contador. La segunda reintenta sobre el documento ya existente.
            counter = await database["order_counters"].find_one_and_update(
                counter_filter,
                update_pipeline,
                upsert=False,
                return_document=ReturnDocument.AFTER,
            )
        return int(counter["value"])

    @staticmethod
    def _normalize_extras(extra_items):
        """Valida extras y devuelve su representación canónica."""
        normalized = []
        order_items = []
        total = 0.0
        for extra in extra_items or []:
            if not isinstance(extra, dict):
                extra = extra.model_dump() if hasattr(extra, "model_dump") else {}
            name = str(extra.get("name", "")).strip()
            price = float(extra.get("price", 0) or 0)
            quantity = int(extra.get("quantity", 1) or 1)
            if not name or price < 0 or quantity < 1:
                raise NotFoundException(
                    "El producto extra requiere descripción, precio válido y cantidad mayor a cero"
                )
            normalized_extra = {"name": name, "price": price, "quantity": quantity}
            normalized.append(normalized_extra)
            subtotal = price * quantity
            total += subtotal
            order_items.append({
                "id": str(uuid4()),
                "type": "extra",
                "item_type": "extra",
                "product_id": None,
                "promotion_id": None,
                "name": name,
                "quantity": quantity,
                "unit_price": price,
                "subtotal": subtotal,
                "status": True,
            })
        return normalized, order_items, total

    @staticmethod
    def _apply_discount(subtotal, discount_type, discount_value):
        value = float(discount_value or 0)
        if value < 0:
            raise NotFoundException("El descuento no puede ser negativo")
        if discount_type == "percent":
            if value > 100:
                raise NotFoundException("El descuento porcentual no puede superar el 100%")
            subtotal *= (100 - value) / 100
        elif discount_type == "amount":
            subtotal = max(0, subtotal - value)
        elif discount_type not in (None, ""):
            raise NotFoundException("El tipo de descuento no es válido")
        return round(float(subtotal), 2), value

    # =========================================================
    # HELPERS
    # =========================================================

    @staticmethod
    def _value(item, name, default=None):

        if isinstance(item, dict):
            return item.get(name, default)

        return getattr(item, name, default)

    @staticmethod
    def _is_promotion_item(item):

        return bool(
            OrderService._value(item, "promotion_id")
            or OrderService._value(item, "type") == "promotion"
            or OrderService._value(item, "item_type") == "promotion"
        )

    def _normalize_promotion_selections(self, item):

        selections = self._value(
            item,
            "promotion_selections"
        )

        if selections is None:
            selections = self._value(
                item,
                "promotion_items"
            )

        if selections is None:
            selections = self._value(
                item,
                "selections"
            )

        if selections is None:
            selections = self._value(
                item,
                "items"
            )

        return selections or []

    @staticmethod
    def _selection_value(
        selection,
        name,
        default=None
    ):

        if isinstance(selection, dict):
            return selection.get(
                name,
                default
            )

        return getattr(
            selection,
            name,
            default
        )

    # =========================================================
    # VALIDAR SELECCIÓN DE PROMOCIÓN
    # =========================================================

    async def _validate_promotion_selection(
        self,
        promotion,
        selections,
        quantity=1,
        old_promotion_item=None
    ):
        """
        Valida la composición de una promoción.

        IMPORTANTE:

        promotion.quantity = cantidad de promociones vendidas.

        selection.quantity = cantidad de productos que contiene
        UNA promoción.

        Ejemplo:

        Promoción:
            12 empanadas

        Orden:
            quantity = 1

        Selección:
            quantity = 12

        Stock utilizado:
            12

        Si se venden 2 promociones:

            quantity = 2
            selección = 12

        Stock utilizado:
            12 * 2 = 24
        """

        template_items = (
            promotion.get("items")
            or promotion.get("composition")
            or []
        )

        if not template_items:

            raise NotFoundException(
                "La promoción no tiene una composición configurada"
            )

        if not selections:

            raise NotFoundException(
                "Debe indicar la composición elegida para la promoción"
            )

        # -----------------------------------------------------
        # AGRUPAR SELECCIONES
        # -----------------------------------------------------

        grouped = {}

        ungrouped = []

        for selection in selections:

            group_index = self._selection_value(
                selection,
                "group_index"
            )

            if group_index is None:
                group_index = self._selection_value(selection, "composition_index")

            if group_index is None:
                selected_group_id = self._selection_value(selection, "promotion_item_id")
                if selected_group_id is not None:
                    group_index = next((
                        index for index, template_item in enumerate(template_items)
                        if str(template_item.get("id") or template_item.get("_id") or "") == str(selected_group_id)
                    ), None)

            if group_index is None:
                ungrouped.append(selection)
            else:

                grouped.setdefault(
                    int(group_index),
                    []
                ).append(selection)

        normalized = []

        # -----------------------------------------------------
        # VALIDAR CADA GRUPO
        # -----------------------------------------------------

        for index, rule in enumerate(template_items):

            required = int(
                rule.get(
                    "quantity",
                    0
                )
            )

            if required <= 0:

                raise NotFoundException(
                    "La composición de la promoción tiene "
                    f"una cantidad inválida en el grupo {index}"
                )

            group = grouped.get(index)

            # -------------------------------------------------
            # SI NO VIENE group_index
            # -------------------------------------------------

            if group is None:

                remaining = required

                group = []

                while ungrouped and remaining > 0:

                    candidate = ungrouped[0]

                    candidate_quantity = int(
                        self._selection_value(
                            candidate,
                            "quantity",
                            0
                        )
                    )

                    if candidate_quantity <= 0:

                        raise NotFoundException(
                            "La cantidad seleccionada en una "
                            "promoción debe ser mayor a 0"
                        )

                    take = min(
                        candidate_quantity,
                        remaining
                    )

                    if take == candidate_quantity:

                        group.append(
                            ungrouped.pop(0)
                        )

                    else:

                        if isinstance(candidate, dict):

                            part = dict(candidate)

                        else:

                            part = {
                                "product_id":
                                    self._selection_value(
                                        candidate,
                                        "product_id"
                                    ),
                                "quantity": take
                            }

                        part["quantity"] = take

                        group.append(part)

                        if isinstance(candidate, dict):

                            candidate["quantity"] = (
                                candidate_quantity - take
                            )

                    remaining -= take

                if remaining > 0:

                    raise NotFoundException(
                        f"La promoción "
                        f"'{promotion.get('name', 'sin nombre')}' "
                        f"requiere {required} unidades "
                        f"en el grupo {index}"
                    )

            # -------------------------------------------------
            # VALIDAR PRODUCTOS DEL GRUPO
            # -------------------------------------------------

            group_total = 0

            allowed_ids = {
                str(x)
                for x in (
                    rule.get("product_ids")
                    or rule.get("allowed_product_ids")
                    or []
                )
            }

            fixed_product_id = rule.get(
                "product_id"
            )

            allowed_category = rule.get(
                "category"
            )

            for selection in group:

                product_id = self._selection_value(
                    selection,
                    "product_id"
                )

                selection_quantity = int(
                    self._selection_value(
                        selection,
                        "quantity",
                        0
                    )
                )

                if (
                    not product_id
                    or selection_quantity <= 0
                ):

                    raise NotFoundException(
                        "Cada selección de una promoción debe "
                        "indicar producto y cantidad válida"
                    )

                product = await self.product_repository.get_by_id(
                    product_id
                )

                if not product:

                    raise NotFoundException(
                        f"El producto con ID "
                        f"{product_id} no existe"
                    )

                if not product["status"]:

                    raise NotFoundException(
                        f"El producto '{product['name']}' "
                        "está inactivo"
                    )

                if (
                    fixed_product_id
                    and str(fixed_product_id)
                    != str(product_id)
                ):

                    raise NotFoundException(
                        f"El producto '{product['name']}' "
                        "no corresponde al grupo fijo "
                        "de la promoción"
                    )

                if (
                    allowed_ids
                    and str(product_id)
                    not in allowed_ids
                ):

                    raise NotFoundException(
                        f"El producto '{product['name']}' "
                        "no está permitido en este grupo "
                        "de la promoción"
                    )

                if (
                    allowed_category
                    and str(
                        product.get(
                            "category",
                            ""
                        )
                    ).lower()
                    != str(
                        allowed_category
                    ).lower()
                ):

                    raise NotFoundException(
                        f"El producto '{product['name']}' "
                        "no pertenece a la categoría permitida"
                    )

                group_total += selection_quantity

                normalized.append({
                    "promotion_item_id": str(rule.get("id") or rule.get("_id") or index),
                    "group_index": index,
                    "group_name": str(rule.get("name") or rule.get("group_name") or f"Grupo {index + 1}"),
                    "product_id": product_id,
                    "product_name": product["name"],
                    "name": product["name"],
                    "quantity": selection_quantity,
                    "unit_price": product["price"],
                    "subtotal": product["price"] * selection_quantity,
                    "status": True,
                })

            # -------------------------------------------------
            # CANTIDAD DEL GRUPO
            # -------------------------------------------------

            if group_total != required:

                raise NotFoundException(
                    f"El grupo {index} de la promoción "
                    f"requiere {required} unidades y "
                    f"se seleccionaron {group_total}"
                )

        # -----------------------------------------------------
        # NO PUEDE HABER SELECCIONES SOBRANTES
        # -----------------------------------------------------

        if ungrouped:

            raise NotFoundException(
                "La promoción contiene más unidades "
                "de las permitidas"
            )

        # El stock se valida de forma agregada en _process_items para que
        # las líneas repetidas, las guarniciones y las promociones cuenten
        # contra el mismo inventario sin validaciones parciales.

        return normalized

    # =========================================================
    # PROCESAR PROMOCIÓN
    # =========================================================

    async def _process_promotion_item(
        self,
        item,
        old_item=None
    ):

        promotion_id = self._value(
            item,
            "promotion_id"
        )

        promotion = await self.promotion_repository.get_by_id(
            promotion_id
        )

        if not promotion:

            raise NotFoundException(
                f"La promoción con ID "
                f"{promotion_id} no existe"
            )

        if not promotion.get(
            "status",
            True
        ):

            raise NotFoundException(
                f"La promoción "
                f"'{promotion.get('name', '')}' "
                "está inactiva"
            )

        quantity = int(
            self._value(
                item,
                "quantity",
                1
            )
        )

        if quantity <= 0:

            raise NotFoundException(
                "La cantidad de la promoción "
                "debe ser mayor a 0"
            )

        selections = (
            self._normalize_promotion_selections(
                item
            )
        )

        old_promotion_item = (
            old_item
            if old_item
            and old_item.get("type") == "promotion"
            else None
        )

        normalized_selections = (
            await self._validate_promotion_selection(
                promotion,
                selections,
                quantity=quantity,
                old_promotion_item=old_promotion_item
            )
        )

        # -----------------------------------------------------
        # PRECIO DE LA PROMOCIÓN
        # -----------------------------------------------------

        unit_price = promotion.get(
            "price"
        )

        if unit_price is None:

            unit_price = promotion.get(
                "promotional_price"
            )

        if unit_price is None:

            raise NotFoundException(
                "La promoción no tiene "
                "un precio configurado"
            )

        subtotal = (
            float(unit_price)
            * quantity
        )

        return {
            "id": str(uuid4()),
            "type": "promotion",
            "item_type": "promotion",
            "promotion_id": promotion_id,
            "name": promotion.get(
                "name",
                "Promoción"
            ),
            "quantity": quantity,
            "unit_price": float(unit_price),
            "subtotal": subtotal,
            "status": True,
            "promotion_items": normalized_selections,
            "promotion_selections": normalized_selections,
        }, subtotal

    # =========================================================
    # PROCESAR ITEMS
    # =========================================================

    async def _process_items(
        self,
        items,
        old_items=None,
        allow_out_of_stock=False,
        confirmed_out_of_stock=False,
    ):

        # Una comanda puede contener exclusivamente productos extra.
        # La validación de que no quede completamente vacía se hace en create/update,
        # una vez normalizados tanto los productos como los extras.
        if not items:
            return [], 0.0

        old_items = old_items or []

        old_normal = {}

        old_promotions = {}

        for old_item in old_items:

            if old_item.get("type") == "extra":
                continue

            if old_item.get(
                "type"
            ) == "promotion":

                old_promotions[
                    str(
                        old_item.get(
                            "promotion_id"
                        )
                    )
                ] = old_item

            else:

                pid = str(
                    old_item["product_id"]
                )

                old_normal[pid] = (
                    old_normal.get(
                        pid,
                        0
                    )
                    + old_item["quantity"]
                )

        order_items = []

        total_price = 0

        for item in items:

            # =================================================
            # PROMOCIÓN
            # =================================================

            if self._is_promotion_item(
                item
            ):

                promotion_item, subtotal = (
                    await self._process_promotion_item(
                        item,
                        old_promotions.get(
                            str(
                                self._value(
                                    item,
                                    "promotion_id"
                                )
                            )
                        )
                    )
                )

                order_items.append(
                    promotion_item
                )

                total_price += subtotal

                continue

            # =================================================
            # PRODUCTO NORMAL
            # =================================================

            product_id = self._value(
                item,
                "product_id"
            )

            quantity = int(
                self._value(
                    item,
                    "quantity",
                    0
                )
            )

            product = await self.product_repository.get_by_id(
                product_id
            )

            if not product:

                raise NotFoundException(
                    f"El producto con ID "
                    f"{product_id} no existe"
                )

            if not product["status"]:

                raise NotFoundException(
                    f"El producto "
                    f"'{product['name']}' "
                    "está inactivo."
                )

            if quantity <= 0:

                raise NotFoundException(
                    "La cantidad del producto "
                    "debe ser mayor a 0"
                )

            unit_price = product["price"]

            subtotal = (
                unit_price
                * quantity
            )

            order_items.append({
                "id": str(uuid4()),
                "type": "product",
                "item_type": "product",
                "product_id": product_id,
                "name": product["name"],
                "quantity": quantity,
                "unit_price": unit_price,
                "subtotal": subtotal,
                "status": True,
                "garnish": self._value(item, "garnish"),
                "ingredients": list(product.get("ingredients", []) or []),
                "removed_ingredients": list(self._value(item, "removed_ingredients", []) or []),
            })

            total_price += subtotal

        # Validar el total por producto, no cada renglón por separado.
        # Así se contemplan múltiples guarniciones y componentes de promociones.
        required_map = self._flatten_stock_requirements(order_items)
        previous_map = self._flatten_stock_requirements(old_items)
        shortages = []

        for product_id, required_quantity in required_map.items():
            additional_quantity = required_quantity - previous_map.get(product_id, 0)
            if additional_quantity <= 0:
                continue

            product = await self.product_repository.get_by_id(product_id)
            if not product:
                raise NotFoundException(f"El producto con ID {product_id} no existe")

            available_quantity = int(product.get("quantity", 0) or 0)
            if available_quantity < additional_quantity:
                shortages.append({
                    "name": product.get("name", product_id),
                    "available": available_quantity,
                    "requested": additional_quantity,
                })

        if shortages:
            first = shortages[0]
            if not allow_out_of_stock:
                raise NotFoundException(
                    f"No hay stock suficiente del producto '{first['name']}'. "
                    f"Disponible: {first['available']}, solicitado adicionalmente: {first['requested']}"
                )
            if not confirmed_out_of_stock:
                details = "; ".join(
                    f"{entry['name']} (disponible {entry['available']}, solicitado {entry['requested']})"
                    for entry in shortages
                )
                raise NotFoundException(
                    "La venta supera el stock disponible. Confirmá con cocina antes de continuar. "
                    + details
                )

        return order_items, total_price

    # =========================================================
    # VALIDAR CAJA
    # =========================================================

    async def _get_cash_register(
        self,
        cash_register_id: str
    ):

        cash_register = (
            await self.cash_register_repository.get_by_id(
                cash_register_id
            )
        )

        if not cash_register:

            raise NotFoundException(
                "No se encontró la caja indicada"
            )

        if not cash_register["status"]:

            raise NotFoundException(
                "La caja indicada está inactiva"
            )

        if (
            cash_register["status_cash_register"]
            != "open"
        ):

            raise NotFoundException(
                "La caja indicada está cerrada. "
                "No se pueden realizar movimientos "
                "sobre una caja cerrada."
            )

        return cash_register

    # =========================================================
    # CREAR ORDEN
    # =========================================================

    async def create(
        self,
        data,
        current_user_id
    ):

        if data.status_payment == "cancelled":

            raise NotFoundException(
                "No se puede crear una orden "
                "directamente como cancelada"
            )

        # -----------------------------------------------------
        # PROCESAR ITEMS
        # -----------------------------------------------------

        allow_out_of_stock = await self._out_of_stock_enabled()
        items, total_price = (
            await self._process_items(
                data.items,
                allow_out_of_stock=allow_out_of_stock,
                confirmed_out_of_stock=bool(getattr(data, "confirmed_out_of_stock", False)),
            )
        )

        extra_items, extra_order_items, extras_total = self._normalize_extras(
            data.extra_items
        )
        if not items and not extra_order_items:
            raise NotFoundException(
                "No se puede crear una comanda vacía. Agregá al menos un producto, una promoción o un producto extra."
            )
        items.extend(extra_order_items)
        total_price += extras_total
        total_price, discount_value = self._apply_discount(
            total_price,
            data.discount_type,
            data.discount_value,
        )

        # -----------------------------------------------------
        # CAJA
        # -----------------------------------------------------

        if not data.cash_register_id:

            raise NotFoundException(
                "Debe indicar una caja para crear "
                "la orden"
            )

        await self._get_cash_register(
            data.cash_register_id
        )

        # -----------------------------------------------------
        # FECHA
        # -----------------------------------------------------

        date = DateUtils.now_argentina()

        order_number = await self._next_order_number(data.cash_register_id)
        order_data = {

            "order_number": order_number,

            "customer_name": data.customer_name,

            "items": items,

            "total_price": total_price,

            "method_payment": data.method_payment,

            "status_payment": data.status_payment,

            "created_at": date,

            "delivery_time": data.delivery_time,

            "cash_register_id": data.cash_register_id,

            "status": data.status,
            "stock_deducted": not allow_out_of_stock,
            "out_of_stock_confirmed": bool(allow_out_of_stock and data.confirmed_out_of_stock),
            "out_of_stock_confirmed_by_user_id": str(current_user_id) if allow_out_of_stock and data.confirmed_out_of_stock else None,
        }

        order_data["discount_type"] = data.discount_type or None
        order_data["discount_value"] = discount_value
        order_data["extra_items"] = extra_items
        order_data["created_by_user_id"] = str(current_user_id)
        payments = [payment.model_dump() for payment in (data.payments or [])]
        if data.status_payment == "paid":
            if not payments:
                payments = [{"method_payment": data.method_payment, "amount": total_price}]
            paid_total = sum(float(payment["amount"]) for payment in payments)
            if any(float(payment["amount"]) <= 0 for payment in payments) or abs(paid_total - total_price) > 0.01:
                raise NotFoundException("La suma de los medios de pago debe coincidir con el total de la orden y cada importe debe ser mayor a cero")
        order_data["payments"] = payments

        # -----------------------------------------------------
        # CREAR ORDEN
        # -----------------------------------------------------

        order = await self.repository.create(
            order_data
        )

        # -----------------------------------------------------
        # DESCONTAR STOCK
        # -----------------------------------------------------

        if not allow_out_of_stock:
            await self._create_stock_outflows(order, allow_negative_stock=False)

        # -----------------------------------------------------
        # MOVIMIENTO DE CAJA
        # -----------------------------------------------------

        amount = (
            total_price
            if data.status_payment == "paid"
            else 0
        )

        if data.status_payment == "paid" and payments:
            for payment in payments:
                await self._create_sale_cash_movement(
                    order=order, amount=payment["amount"],
                    method_payment=payment["method_payment"],
                    cash_register_id=data.cash_register_id,
                    current_user_id=current_user_id
                )
        else:
            await self._create_sale_cash_movement(
                order=order, amount=amount,
                method_payment=data.method_payment,
                cash_register_id=data.cash_register_id,
                current_user_id=current_user_id
            )

        return order

    # =========================================================
    # CREAR MOVIMIENTOS DE STOCK
    # =========================================================

    async def _create_stock_outflows(
        self,
        order,
        allow_negative_stock=False
    ):
        # Una salida por producto consolida todas las líneas, guarniciones y
        # selecciones de promociones y evita que las validaciones aisladas
        # permitan sobre-vender stock.
        requirements = self._flatten_stock_requirements(order.get("items", []))
        for product_id, quantity in requirements.items():
            movement = StockMovementCreate(
                product_id=product_id,
                type="outflow",
                description=f"Venta pedido #{order['order_number']}",
                quantity=quantity,
                order_id=order["id"],
                status=True,
            )
            await self.stock_movement_service.create(
                movement,
                allow_negative=allow_negative_stock,
            )

    # =========================================================
    # MOVIMIENTO DE CAJA
    # =========================================================

    async def _create_sale_cash_movement(
        self,
        order,
        amount,
        method_payment,
        cash_register_id,
        current_user_id
    ):

        cash_register = (
            await self._get_cash_register(
                cash_register_id
            )
        )

        order_id = (
            order.get("id")
            or order.get("_id")
        )

        if not order_id:

            raise NotFoundException(
                "La orden no tiene un ID válido"
            )

        cash_movement = CashMovementCreate(

            cash_register_id=str(
                cash_register["id"]
            ),

            order_id=str(
                order_id
            ),

            type="inflow",

            category="sale",

            amount=amount,

            method_payment=method_payment,

            description=(
                f"Venta pedido "
                f"#{order['order_number']}"
            ),

            date=DateUtils.now_argentina(),

            status=True
        )

        return await self.cash_movement_service.create(
            cash_movement,
            current_user_id
        )

    # =========================================================
    # ACTUALIZAR MOVIMIENTO DE CAJA
    # =========================================================

    async def _update_sale_cash_movement(
        self,
        order_id,
        amount,
        method_payment,
        cash_register_id,
        current_user_id
    ):

        await self._get_cash_register(
            cash_register_id
        )

        cursor = self.cash_movement_service.repository.collection.find({
                "order_id": str(order_id),
                "category": "sale",
                "status": True
            })
        movements = [movement async for movement in cursor]

        if not movements:

            raise NotFoundException(
                "No se encontró el movimiento "
                "de venta de la orden"
            )

        order = await self.repository.get_by_id(
            str(order_id)
        )

        if not order:

            raise NotFoundException(
                "No se encontró la orden"
            )

        updated = await self.cash_movement_service.repository.update(
            str(movements[0]["_id"]),
            {
                "amount": amount,
                "method_payment": method_payment,
                "cash_register_id": str(
                    cash_register_id
                ),
                "description":
                    f"Venta pedido "
                    f"#{order['order_number']}",
                "updated_by_user_id": str(
                    current_user_id
                )
            }
        )
        # Al convertir pagos divididos a un único medio, consolidar la venta
        # para que los reportes no cuenten movimientos antiguos duplicados.
        for extra_movement in movements[1:]:
            await self.cash_movement_service.repository.update(
                str(extra_movement["_id"]),
                {"status": False, "updated_by_user_id": str(current_user_id)}
            )
        return updated

    # =========================================================
    # ACTUALIZAR ORDEN
    # =========================================================

    async def update(
        self,
        order_id,
        data,
        current_user_id
    ):
        old_order = await self.repository.get_by_id(order_id)
        if not old_order:
            raise NotFoundException("Orden no encontrada")

        old_payment_status = old_order["status_payment"]
        new_payment_status = data.status_payment if data.status_payment is not None else old_payment_status
        stock_deducted = old_order.get("stock_deducted", True)
        explicitly_set = getattr(data, "model_fields_set", set())

        if old_payment_status == "cancelled" and new_payment_status != "cancelled":
            raise NotFoundException("Una orden cancelada no puede volver a cambiar su estado de pago")
        if old_payment_status == "paid" and new_payment_status == "pending":
            raise NotFoundException("Una orden pagada no puede volver a pendiente")

        commercial_fields_changed = (
            data.items is not None
            or data.extra_items is not None
            or "discount_type" in explicitly_set
            or "discount_value" in explicitly_set
        )
        if commercial_fields_changed and old_payment_status in ("paid", "cancelled"):
            raise NotFoundException(
                "No se pueden modificar productos, extras ni descuentos de una orden pagada o cancelada"
            )
        if commercial_fields_changed and new_payment_status == "cancelled":
            raise NotFoundException(
                "Primero guardá los cambios comerciales y después cancelá la orden en una operación separada"
            )

        update_data = data.model_dump(exclude_none=True, exclude_unset=True)
        update_data["updated_by_user_id"] = str(current_user_id)

        cash_register_id = data.cash_register_id if data.cash_register_id is not None else old_order.get("cash_register_id")
        if data.cash_register_id is not None:
            await self._get_cash_register(data.cash_register_id)

        # Recalcular el total de forma consistente cuando cambian los productos,
        # extras o descuentos. Si solo cambia un descuento/extra, se conservan
        # los precios snapshot de los renglones ya vendidos.
        if commercial_fields_changed:
            if data.items is not None:
                base_items, base_subtotal = await self._process_items(
                    data.items,
                    old_items=old_order.get("items", []),
                    allow_out_of_stock=not stock_deducted,
                    confirmed_out_of_stock=not stock_deducted,
                )
            else:
                base_items = [
                    item for item in old_order.get("items", [])
                    if item.get("type", item.get("item_type")) != "extra"
                ]
                base_subtotal = sum(
                    float(item.get("subtotal", float(item.get("unit_price", 0)) * int(item.get("quantity", 1))))
                    for item in base_items
                )

            if data.extra_items is not None:
                source_extras = data.extra_items
            elif "extra_items" in old_order:
                source_extras = old_order.get("extra_items") or []
            else:
                source_extras = [
                    {"name": item.get("name", ""), "price": item.get("unit_price", 0), "quantity": item.get("quantity", 1)}
                    for item in old_order.get("items", [])
                    if item.get("type", item.get("item_type")) == "extra"
                ]

            normalized_extras, extra_order_items, extras_total = self._normalize_extras(source_extras)
            effective_discount_type = (
                data.discount_type if "discount_type" in explicitly_set
                else old_order.get("discount_type")
            )
            effective_discount_value = (
                data.discount_value if "discount_value" in explicitly_set
                else old_order.get("discount_value", 0)
            )
            if not effective_discount_type:
                effective_discount_value = 0
            new_total, normalized_discount_value = self._apply_discount(
                base_subtotal + extras_total,
                effective_discount_type,
                effective_discount_value,
            )

            new_items = base_items + extra_order_items
            if not new_items:
                raise NotFoundException(
                    "La comanda debe conservar al menos un producto, una promoción o un producto extra."
                )
            update_data["items"] = new_items
            update_data["extra_items"] = normalized_extras
            update_data["discount_type"] = effective_discount_type or None
            update_data["discount_value"] = normalized_discount_value
            update_data["total_price"] = new_total

            # Solo se corrige inventario si esta orden originalmente lo descontó.
            # Las órdenes hechas con "ventas sin stock" nunca deben tocarlo.
            if data.items is not None and stock_deducted:
                await self._adjust_order_stock(old_order.get("items", []), new_items, str(old_order["id"]))

        # Al pasar de pendiente a pagada se conservan los pagos divididos.
        if old_payment_status == "pending" and new_payment_status == "paid":
            if not cash_register_id:
                raise NotFoundException("Debe indicar la caja para registrar el pago")
            await self._get_cash_register(cash_register_id)
            total = float(update_data.get("total_price", old_order["total_price"]))
            requested_payments = data.payments if data.payments is not None else old_order.get("payments", [])
            payments = [
                payment.model_dump() if hasattr(payment, "model_dump") else dict(payment)
                for payment in (requested_payments or [])
            ]
            if not payments:
                method = data.method_payment or old_order["method_payment"]
                payments = [{"method_payment": method, "amount": total}]
            paid_total = sum(float(payment["amount"]) for payment in payments)
            if any(float(payment["amount"]) <= 0 for payment in payments) or abs(paid_total - total) > 0.01:
                raise NotFoundException("La suma de los medios de pago debe coincidir con el total de la orden")

            await self._update_sale_cash_movement(
                order_id=str(old_order["id"]), amount=float(payments[0]["amount"]),
                method_payment=payments[0]["method_payment"], cash_register_id=cash_register_id,
                current_user_id=current_user_id,
            )
            for payment in payments[1:]:
                await self._create_sale_cash_movement(
                    order=old_order, amount=float(payment["amount"]),
                    method_payment=payment["method_payment"], cash_register_id=cash_register_id,
                    current_user_id=current_user_id,
                )
            update_data["payments"] = payments
            update_data["method_payment"] = payments[0]["method_payment"]
            update_data["cash_register_id"] = cash_register_id

        # Cambiar el medio/caja o la división de una venta ya pagada actualiza
        # los movimientos para que caja y orden sigan coincidiendo.
        elif old_payment_status == "paid" and new_payment_status == "paid" and (
            data.method_payment is not None or data.cash_register_id is not None or data.payments is not None
        ):
            total = float(old_order["total_price"])
            payments = [
                payment.model_dump() if hasattr(payment, "model_dump") else dict(payment)
                for payment in (data.payments or [])
            ]
            if not payments:
                payments = [{
                    "method_payment": data.method_payment or old_order["method_payment"],
                    "amount": total,
                }]
            paid_total = sum(float(payment["amount"]) for payment in payments)
            if any(float(payment["amount"]) <= 0 for payment in payments) or abs(paid_total - total) > 0.01:
                raise NotFoundException("La suma de los medios de pago debe coincidir con el total de la orden")
            await self._update_sale_cash_movement(
                order_id=str(old_order["id"]), amount=float(payments[0]["amount"]),
                method_payment=payments[0]["method_payment"], cash_register_id=cash_register_id,
                current_user_id=current_user_id,
            )
            for payment in payments[1:]:
                await self._create_sale_cash_movement(
                    order=old_order, amount=float(payment["amount"]),
                    method_payment=payment["method_payment"], cash_register_id=cash_register_id,
                    current_user_id=current_user_id,
                )
            update_data["payments"] = payments
            update_data["method_payment"] = payments[0]["method_payment"]
            update_data["cash_register_id"] = cash_register_id

        if old_payment_status == "pending" and new_payment_status == "cancelled":
            await self._restore_order_stock(old_order)

        if old_payment_status == "paid" and new_payment_status == "cancelled":
            await self._refund_order(
                old_order,
                cash_register_id=data.cash_register_id,
                current_user_id=current_user_id,
            )

        return await self.repository.update(order_id, update_data)

    # =========================================================
    # APLANAR STOCK
    # =========================================================

    def _flatten_stock_requirements(
        self,
        items
    ):

        result = {}

        for item in items or []:
            item_type = item.get("type", item.get("item_type", "product"))
            if item_type == "extra":
                continue

            if item_type == "promotion":

                promotion_quantity = int(
                    item.get(
                        "quantity",
                        1
                    )
                )

                for selection in (item.get("promotion_items") or item.get("promotion_selections") or []):

                    pid = str(
                        selection[
                            "product_id"
                        ]
                    )

                    result[pid] = (
                        result.get(
                            pid,
                            0
                        )
                        + int(
                            selection[
                                "quantity"
                            ]
                        )
                        * promotion_quantity
                    )

            else:

                pid = str(
                    item["product_id"]
                )

                result[pid] = (
                    result.get(
                        pid,
                        0
                    )
                    + int(
                        item["quantity"]
                    )
                )

        return result

    # =========================================================
    # AJUSTAR STOCK AL EDITAR
    # =========================================================

    async def _adjust_order_stock(
        self,
        old_items,
        new_items,
        order_id
    ):

        old_map = self._flatten_stock_requirements(
            old_items
        )

        new_map = self._flatten_stock_requirements(
            new_items
        )

        product_ids = set(old_map).union(new_map)

        # Validación previa de todas las diferencias: no iniciar ajustes si
        # alguna línea agregada excede el stock actual.
        for product_id in product_ids:
            difference = new_map.get(product_id, 0) - old_map.get(product_id, 0)
            if difference <= 0:
                continue
            product = await self.product_repository.get_by_id(product_id)
            if not product:
                raise NotFoundException(f"El producto con ID {product_id} no existe")
            available = int(product.get("quantity", 0) or 0)
            if available < difference:
                raise NotFoundException(
                    f"No hay stock suficiente del producto '{product['name']}'. "
                    f"Disponible: {available}, solicitado adicionalmente: {difference}"
                )

        for product_id in product_ids:

            difference = (
                new_map.get(
                    product_id,
                    0
                )
                - old_map.get(
                    product_id,
                    0
                )
            )

            if difference > 0:

                movement = StockMovementCreate(

                    product_id=product_id,

                    type="outflow",

                    description=(
                        f"Agregado a pedido "
                        f"#{order_id}"
                    ),

                    quantity=difference,

                    order_id=order_id,

                    status=True
                )

                await self.stock_movement_service.create(
                    movement
                )

            elif difference < 0:

                movement = StockMovementCreate(

                    product_id=product_id,

                    type="inflow",

                    description=(
                        f"Quitado de pedido "
                        f"#{order_id}"
                    ),

                    quantity=abs(
                        difference
                    ),

                    order_id=order_id,

                    status=True
                )

                await self.stock_movement_service.create(
                    movement
                )

    # =========================================================
    # REEMBOLSO
    # =========================================================

    async def _refund_order(
        self,
        order,
        cash_register_id=None,
        current_user_id=None
    ):

        selected_cash_register_id = (
            cash_register_id
            or order.get(
                "cash_register_id"
            )
        )

        if not selected_cash_register_id:

            raise NotFoundException(
                "Debe indicar una caja para "
                "realizar el reembolso"
            )

        cash_register = (
            await self._get_cash_register(
                selected_cash_register_id
            )
        )

        order_id = (
            order.get("id")
            or order.get("_id")
        )

        if not order_id:

            raise NotFoundException(
                "La orden no tiene un ID válido"
            )

        payments = order.get("payments") or [{
            "method_payment": order["method_payment"],
            "amount": order["total_price"],
        }]
        # Cada medio original se reembolsa por separado para que los reportes
        # de caja conserven la composición del pago.
        for payment in payments:
            amount = float(payment.get("amount", 0) or 0)
            if amount <= 0:
                continue
            cash_movement = CashMovementCreate(
                cash_register_id=str(cash_register["id"]),
                order_id=str(order_id),
                type="outflow",
                category="refund",
                amount=amount,
                method_payment=payment.get("method_payment", order["method_payment"]),
                description=f"Reembolso pedido #{order['order_number']}",
                date=DateUtils.now_argentina(),
                status=True,
            )
            await self.cash_movement_service.create(cash_movement, current_user_id)

        # -----------------------------------------------------
        # DEVOLVER STOCK
        # -----------------------------------------------------

        await self._restore_order_stock(
            order
        )

    # =========================================================
    # RESTAURAR STOCK
    # =========================================================

    async def _restore_order_stock(
        self,
        order
    ):
        # Compatibilidad histórica: órdenes sin este campo se consideran
        # descontadas, porque las versiones anteriores sí modificaban stock.
        if order.get("stock_deducted", True) is False:
            return

        requirements = self._flatten_stock_requirements(order.get("items", []))
        for product_id, quantity in requirements.items():
            movement = StockMovementCreate(
                product_id=product_id,
                type="inflow",
                description=f"Devolución pedido #{order['order_number']}",
                quantity=quantity,
                order_id=str(order.get("id") or order.get("_id")),
                status=True,
            )
            await self.stock_movement_service.create(movement)

