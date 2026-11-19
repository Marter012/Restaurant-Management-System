from collections import defaultdict
from datetime import timedelta
from app.repositories.sales_analytics_repository import SalesAnalyticsRepository
from app.services.product_service import ProductService
from app.services.promotion_service import PromotionService
from app.utils.dateZone import DateUtils


class SalesAnalyticsService:
    """Calcula popularidad usando únicamente comandas pagadas y no canceladas."""

    def __init__(self):
        self.repository = SalesAnalyticsRepository()
        self.products = ProductService()
        self.promotions = PromotionService()

    async def _counts(self, period_days: int = 30):
        since = None if int(period_days or 0) == 0 else DateUtils.now_argentina() - timedelta(days=int(period_days))
        orders = await self.repository.get_paid_orders(since)
        product_units = defaultdict(int)
        promotion_units = defaultdict(int)
        product_revenue = defaultdict(float)
        promotion_revenue = defaultdict(float)
        for order in orders:
            for item in order.get("items", []) or []:
                quantity = int(item.get("quantity", 0) or 0)
                if quantity <= 0 or item.get("status", True) is False:
                    continue
                kind = item.get("type") or item.get("item_type")
                product_id = item.get("product_id")
                promotion_id = item.get("promotion_id")
                unit_price = float(item.get("unit_price", 0) or 0)
                subtotal = float(item.get("subtotal", unit_price * quantity) or 0)
                if promotion_id or kind == "promotion":
                    key = str(promotion_id or "")
                    if key:
                        promotion_units[key] += quantity
                        promotion_revenue[key] += subtotal
                elif product_id and kind != "extra":
                    key = str(product_id)
                    product_units[key] += quantity
                    product_revenue[key] += subtotal
        return product_units, promotion_units, product_revenue, promotion_revenue, len(orders)

    async def product_ranking(self, period_days: int = 30, limit: int = 8):
        units, _, revenue, _, order_count = await self._counts(period_days)
        products = await self.products.get_all()
        by_id = {str(row.get("id")): row for row in products}
        result = []
        for product_id, quantity in units.items():
            product = by_id.get(product_id)
            if not product or product.get("status", True) is not True:
                continue
            result.append({"id": product_id, "name": product.get("name", "Producto"), "quantity_sold": quantity, "revenue": round(revenue[product_id], 2)})
        result.sort(key=lambda row: (row["quantity_sold"], row["revenue"]), reverse=True)
        return {"period_days": int(period_days or 0), "orders_analyzed": order_count, "items": result[:max(1, min(int(limit), 50))]}

    async def promotion_ranking(self, period_days: int = 30, limit: int = 8):
        _, units, _, revenue, order_count = await self._counts(period_days)
        promotions = await self.promotions.get_all()
        by_id = {str(row.get("id")): row for row in promotions}
        result = []
        for promotion_id, quantity in units.items():
            promotion = by_id.get(promotion_id)
            if not promotion or promotion.get("status", True) is not True:
                continue
            result.append({"id": promotion_id, "name": promotion.get("name", "Promoción"), "quantity_sold": quantity, "revenue": round(revenue[promotion_id], 2)})
        result.sort(key=lambda row: (row["quantity_sold"], row["revenue"]), reverse=True)
        return {"period_days": int(period_days or 0), "orders_analyzed": order_count, "items": result[:max(1, min(int(limit), 50))]}
