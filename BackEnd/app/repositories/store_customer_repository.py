from __future__ import annotations

from typing import Any

from app.database.connection import database


class StoreCustomerRepository:
    """Persistencia de cuentas del Store y asociación de compras históricas."""

    def __init__(self) -> None:
        self.customers = database["store_customers"]
        self.online_orders = database["online_orders"]

    async def get_by_phone(self, phone: str) -> dict | None:
        """Busca por teléfono normalizado, sin excluir cuentas inactivas.

        Una cuenta inactiva también reserva el número: no debe habilitar un
        segundo registro con el mismo teléfono.
        """
        return await self.customers.find_one({"phone": phone})

    async def create(self, document: dict) -> Any:
        """Inserta la cuenta. El índice único de phone es la última barrera
        contra registros duplicados concurrentes.
        """
        result = await self.customers.insert_one(document)
        document["_id"] = result.inserted_id
        return document

    async def update(self, customer_id: Any, changes: dict) -> None:
        await self.customers.update_one({"_id": customer_id}, {"$set": changes})

    async def get_by_token_hash(self, token_hash: str) -> dict | None:
        return await self.customers.find_one(
            {"token_hash": token_hash, "active": True}
        )

    async def attach_guest_orders(self, customer_id: str, normalized_phone: str, normalize) -> int:
        """Asocia pedidos históricos sin cuenta; nunca reasigna pedidos de otra cuenta."""
        cursor = self.online_orders.find(
            {"phone": {"$exists": True, "$ne": ""}},
            {"_id": 1, "phone": 1, "customer_id": 1},
        )
        linked = 0
        async for order in cursor:
            existing_customer_id = order.get("customer_id")
            if existing_customer_id not in (None, "", customer_id):
                continue
            if normalize(str(order.get("phone", ""))) != normalized_phone:
                continue
            result = await self.online_orders.update_one(
                {
                    "_id": order["_id"],
                    "$or": [
                        {"customer_id": {"$exists": False}},
                        {"customer_id": None},
                        {"customer_id": ""},
                        {"customer_id": customer_id},
                    ],
                },
                {"$set": {"customer_id": customer_id, "customer_phone_normalized": normalized_phone}},
            )
            linked += result.modified_count
        return linked

    async def find_orders_for_customer(self, customer_id: str, normalized_phone: str, normalize) -> list[dict]:
        """Devuelve pedidos propios y compras de invitado históricas con el mismo teléfono."""
        cursor = self.online_orders.find(
            {"phone": {"$exists": True, "$ne": ""}}
        ).sort("created_at", -1).limit(500)
        matched: dict[str, dict] = {}
        async for order in cursor:
            owner = order.get("customer_id")
            if owner not in (None, "", customer_id):
                continue
            if normalize(str(order.get("phone", ""))) != normalized_phone:
                continue
            order["customer_id"] = customer_id
            matched[str(order.get("_id"))] = order

        # Incluye también documentos vinculados cuyo teléfono histórico ya no esté presente.
        linked_cursor = self.online_orders.find({"customer_id": customer_id}).sort("created_at", -1).limit(500)
        async for order in linked_cursor:
            matched[str(order.get("_id"))] = order

        return sorted(
            matched.values(),
            key=lambda row: row.get("created_at") or 0,
            reverse=True,
        )[:100]
