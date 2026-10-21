from app.services.base_service import BaseService

from app.repositories.stock_movement_repository import (
    StockMovementRepository
)

from app.repositories.product_repository import (
    ProductRepository
)

from app.utils.exceptions import NotFoundException
from app.schema.stock_movement_schema import StockMovementCreate
from app.utils.object_id import validate_object_id


class StockMovementService(
    BaseService
):

    def __init__(self):

        self.repository = StockMovementRepository()

        self.product_repository = ProductRepository()

        super().__init__(
            self.repository
        )

    async def set_quantities(self, entries, user_id):
        results = []
        seen = set()
        for entry in entries:
            product_id = entry.product_id
            if product_id in seen:
                raise NotFoundException("La lista contiene productos duplicados")
            seen.add(product_id)
            product = await self.product_repository.get_by_id(product_id)
            if not product:
                raise NotFoundException("Producto no encontrado")
            delta = int(entry.quantity) - int(product["quantity"])
            if delta:
                movement_data = StockMovementCreate(
                    product_id=product_id,
                    type="inflow" if delta > 0 else "outflow",
                    description="Ajuste masivo de stock",
                    quantity=abs(delta),
                    status=True,
                )
                result = await self.create(movement_data)
                await self.repository.update(result["id"], {"user_id": str(user_id)})
                results.append(result)
        return results

    # =========================================================
    # EFFECT
    # =========================================================

    def _effect(
        self,
        movement_type: str,
        quantity: int
    ):

        if movement_type == "inflow":

            return quantity

        if movement_type == "outflow":

            return -quantity

        raise NotFoundException(
            "Tipo de movimiento no válido"
        )

    # =========================================================
    # CREATE
    # =========================================================

    async def create(
        self,
        data,
        current_user_id=None,
        allow_negative=False
    ):

        if data.quantity <= 0:

            raise NotFoundException(
                "La cantidad debe ser mayor a 0"
            )

        if data.type not in [
            "inflow",
            "outflow"
        ]:

            raise NotFoundException(
                "Tipo de movimiento no válido"
            )

        # -----------------------------------------------------
        # PRODUCTO
        # -----------------------------------------------------

        product = (
            await self.product_repository.get_by_id(
                data.product_id
            )
        )

        if not product:

            raise NotFoundException(
                "Producto no encontrado"
            )

        # -----------------------------------------------------
        # ACTUALIZACIÓN ATÓMICA DEL INVENTARIO
        # -----------------------------------------------------
        effect = self._effect(data.type, data.quantity)
        product_object_id = validate_object_id(data.product_id)
        query = {"_id": product_object_id}
        if data.type == "outflow" and not allow_negative:
            query["quantity"] = {"$gte": data.quantity}

        result = await self.product_repository.collection.update_one(
            query,
            {"$inc": {"quantity": effect}},
        )
        if result.matched_count == 0:
            latest = await self.product_repository.get_by_id(data.product_id)
            if data.type == "outflow" and not allow_negative:
                raise NotFoundException(
                    f"No hay stock suficiente del producto '{latest['name']}'. "
                    f"Disponible: {latest['quantity']}"
                )
            raise NotFoundException("Producto no encontrado")

        movement_data = data.model_dump(exclude_none=True)
        if current_user_id:
            movement_data["user_id"] = str(current_user_id)

        try:
            return await self.repository.create(movement_data)
        except Exception:
            # Si falla el registro del movimiento, compensar el cambio de stock.
            await self.product_repository.collection.update_one(
                {"_id": product_object_id},
                {"$inc": {"quantity": -effect}},
            )
            raise

    # =========================================================
    # UPDATE
    # =========================================================

    async def update(
        self,
        movement_id,
        data,
        current_user_id=None
    ):

        # -----------------------------------------------------
        # OBTENER MOVIMIENTO ANTERIOR
        # -----------------------------------------------------

        old = await self.repository.get_by_id(
            movement_id
        )

        if not old:

            raise NotFoundException(
                "Movimiento no encontrado"
            )

        old_product_id = old["product_id"]

        old_type = old["type"]

        old_quantity = old["quantity"]

        old_effect = self._effect(
            old_type,
            old_quantity
        )

        # -----------------------------------------------------
        # NUEVOS VALORES
        # -----------------------------------------------------

        new_product_id = (
            data.product_id
            if data.product_id is not None
            else old_product_id
        )

        new_type = (
            data.type
            if data.type is not None
            else old_type
        )

        new_quantity = (
            data.quantity
            if data.quantity is not None
            else old_quantity
        )

        # -----------------------------------------------------
        # VALIDACIONES
        # -----------------------------------------------------

        if new_quantity <= 0:

            raise NotFoundException(
                "La cantidad debe ser mayor a 0"
            )

        if new_type not in [
            "inflow",
            "outflow"
        ]:

            raise NotFoundException(
                "Tipo de movimiento no válido"
            )

        # -----------------------------------------------------
        # PRODUCTO ANTERIOR
        # -----------------------------------------------------

        old_product = (
            await self.product_repository.get_by_id(
                old_product_id
            )
        )

        if not old_product:

            raise NotFoundException(
                "Producto anterior no encontrado"
            )

        # -----------------------------------------------------
        # REVERTIR MOVIMIENTO ANTERIOR
        # -----------------------------------------------------

        old_product_quantity = (
            old_product["quantity"]
            - old_effect
        )

        if old_product_quantity < 0:

            raise NotFoundException(
                "No se puede revertir el movimiento"
            )

        # =====================================================
        # MISMO PRODUCTO
        # =====================================================

        if old_product_id == new_product_id:

            new_effect = self._effect(
                new_type,
                new_quantity
            )

            final_quantity = (
                old_product_quantity
                + new_effect
            )

            if final_quantity < 0:

                raise NotFoundException(
                    f"No hay stock suficiente del producto "
                    f"'{old_product['name']}'"
                )

            await self.product_repository.update(
                old_product_id,
                {
                    "quantity": final_quantity
                }
            )

        # =====================================================
        # PRODUCTO DIFERENTE
        # =====================================================

        else:

            new_product = (
                await self.product_repository.get_by_id(
                    new_product_id
                )
            )

            if not new_product:

                raise NotFoundException(
                    "Nuevo producto no encontrado"
                )

            # -------------------------------------------------
            # RESTAURAR PRODUCTO ANTERIOR
            # -------------------------------------------------

            await self.product_repository.update(
                old_product_id,
                {
                    "quantity": old_product_quantity
                }
            )

            # -------------------------------------------------
            # APLICAR NUEVO MOVIMIENTO
            # -------------------------------------------------

            new_effect = self._effect(
                new_type,
                new_quantity
            )

            final_quantity = (
                new_product["quantity"]
                + new_effect
            )

            if final_quantity < 0:

                # Restaurar producto anterior
                await self.product_repository.update(
                    old_product_id,
                    {
                        "quantity": old_product["quantity"]
                    }
                )

                raise NotFoundException(
                    f"No hay stock suficiente del producto "
                    f"'{new_product['name']}'"
                )

            await self.product_repository.update(
                new_product_id,
                {
                    "quantity": final_quantity
                }
            )

        # -----------------------------------------------------
        # ACTUALIZAR MOVIMIENTO
        # -----------------------------------------------------

        update_data = data.model_dump(
            exclude_none=True,
            exclude_unset=True
        )
        if current_user_id:
            update_data["updated_by_user_id"] = str(current_user_id)

        return await self.repository.update(
            movement_id,
            update_data
        )
