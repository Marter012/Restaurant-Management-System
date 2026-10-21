from app.services.base_service import BaseService
from app.repositories.product_repository import ProductRepository
from app.utils.exceptions import ConflictException

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
        
    
