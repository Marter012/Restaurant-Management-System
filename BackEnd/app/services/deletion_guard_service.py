from app.database.connection import database


class DeletionGuardService:
    """Comprueba referencias históricas antes de eliminar productos/promociones."""

    @staticmethod
    async def _count(collection_name: str, queries: list[dict]) -> int:
        if not queries:
            return 0
        return await database[collection_name].count_documents({"$or": queries})

    @classmethod
    async def product_references(cls, product_id: str) -> dict[str, int]:
        return {
            "orders": await cls._count("orders", [
                {"items.product_id": product_id},
                {"items.promotion_selections.product_id": product_id},
                {"items.promotion_items.product_id": product_id},
                {"items.selections.product_id": product_id},
            ]),
            "promotions": await cls._count("promotions", [
                {"items.product_ids": product_id},
                {"items.allowed_product_ids": product_id},
                {"items.product_id": product_id},
            ]),
            "stock_movements": await cls._count("stock_movements", [
                {"product_id": product_id},
            ]),
            "order_items": await cls._count("order_items", [
                {"product_id": product_id},
                {"promotion_selections.product_id": product_id},
            ]),
        }

    @classmethod
    async def promotion_references(cls, promotion_id: str) -> dict[str, int]:
        return {
            "orders": await cls._count("orders", [
                {"items.promotion_id": promotion_id},
            ]),
            "order_items": await cls._count("order_items", [
                {"promotion_id": promotion_id},
            ]),
        }
