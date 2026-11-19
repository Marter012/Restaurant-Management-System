from datetime import datetime
from app.database.connection import database


class SalesAnalyticsRepository:
    """Acceso a las ventas confirmadas para los rankings del canal Store."""

    def __init__(self):
        self.orders = database["orders"]

    async def get_paid_orders(self, since: datetime | None = None) -> list[dict]:
        query = {
            "status_payment": "paid",
            "status": {"$ne": False},
        }
        if since is not None:
            query["created_at"] = {"$gte": since}
        projection = {"items": 1, "created_at": 1, "total_price": 1}
        cursor = self.orders.find(query, projection)
        return [row async for row in cursor]
