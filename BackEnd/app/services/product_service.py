from app.services.base_service import BaseService
from app.repositories.product_repository import ProductRepository
from app.utils.exceptions import ConflictException
from app.services.deletion_guard_service import DeletionGuardService
from bson import ObjectId

class ProductService (BaseService) :
    
    def __init__(self):
        super().__init__(ProductRepository())

    async def create(self, data):
        if data.quantity < 0:
            raise ConflictException("El stock inicial no puede ser negativo.")
        for item in await self.repository.get_all():
            if item.get("name", "").strip().casefold() == data.name.strip().casefold():
                raise ConflictException("Ya existe un producto con ese nombre.")
        return await super().create(data)

    async def update(self, document_id, data):
        if "quantity" in getattr(data, "model_fields_set", set()):
            raise ConflictException(
                "El stock debe modificarse mediante movimientos de stock para conservar el historial de inventario."
            )
        name = getattr(data, "name", None)
        if name:
            for item in await self.repository.get_all():
                if item["id"] != document_id and item.get("name", "").strip().casefold() == name.strip().casefold():
                    raise ConflictException("Ya existe un producto con ese nombre.")
        return await super().update(document_id, data)
        
    


    async def delete(self, product_id):
        # get_by_id valida el ObjectId y confirma que el producto exista.
        product = await self.repository.get_by_id(product_id)
        references = await DeletionGuardService.product_references(product_id)
        blocked_by = {key: value for key, value in references.items() if value > 0}

        # No eliminar inventario disponible: representa unidades aún existentes.
        current_stock = int(product.get("quantity", 0) or 0)
        if current_stock > 0:
            blocked_by["stock_quantity"] = current_stock

        if blocked_by:
            details = ", ".join(
                f"{name}: {count}" for name, count in blocked_by.items()
            )
            raise ConflictException(
                "No se puede eliminar el producto porque tiene registros asociados. "
                f"Referencias encontradas — {details}."
            )

        result = await self.repository.collection.delete_one({"_id": ObjectId(product_id)})
        if result.deleted_count != 1:
            raise ConflictException(
                "El producto cambió durante la operación. Actualizá la lista e intentá nuevamente."
            )

        return product
