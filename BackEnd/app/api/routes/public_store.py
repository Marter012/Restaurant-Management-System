from fastapi import APIRouter, HTTPException, Query

from app.database.connection import database
from app.services.product_service import ProductService
from app.services.settings_service import SettingsService
from app.services.sales_analytics_service import SalesAnalyticsService
from app.services.promotion_service import PromotionService

router = APIRouter(prefix="/public", tags=["Public Store"])
products_service = ProductService()
sales_analytics_service = SalesAnalyticsService()
promotions_service = PromotionService()


async def _effective_product(product: dict, commercial: dict, allow_out_of_stock: bool = False) -> dict:
    base_price = float(product.get("price", 0) or 0)
    individual = product.get("discount_percentage")
    if individual is not None and float(individual) > 0:
        percentage = float(individual)
        source = "individual"
    elif commercial.get("general_discount_enabled"):
        percentage = float(commercial.get("general_discount_percentage", 0) or 0)
        source = "general" if percentage > 0 else None
    else:
        percentage = 0.0
        source = None
    discount_amount = round(base_price * percentage / 100, 2)
    return {
        "id": product.get("id"),
        "name": product.get("name", ""),
        "description": product.get("description", ""),
        "image": product.get("image"),
        "category": product.get("category", "Otros"),
        "price": base_price,
        "discount_percentage": product.get("discount_percentage"),
        "effective_discount_percentage": percentage,
        "discount_amount": discount_amount,
        "final_price": round(base_price - discount_amount, 2),
        "discount_source": source,
        "has_garnish": bool(product.get("has_garnish", False)),
        "garnish_options": product.get("garnish_options", []) or [],
        "ingredients": product.get("ingredients", []) or [],
        "available": int(product.get("quantity", 0) or 0) > 0 or allow_out_of_stock,
    }


@router.get("/store")
async def get_public_store():
    establishment = await SettingsService.get_establishment()
    commercial = await SettingsService.get_commercial()
    store_config = await SettingsService.get_store_configuration()
    operational = await database["app_settings"].find_one({"_id": "operational"}) or {}
    operational_updated_at = operational.get("updated_at")
    return {
        "name": store_config.get("store_title") or establishment.get("name", "Boutique de Sabores"),
        "phone_number": establishment.get("phone_number", ""),
        "public_sales_enabled": bool(commercial.get("public_sales_enabled", False)),
        "general_discount_enabled": bool(commercial.get("general_discount_enabled", False)),
        "general_discount_percentage": float(commercial.get("general_discount_percentage", 0) or 0),
        "configuration": store_config,
        "cash_register_open": bool(await database["cash_registers"].find_one({"status_cash_register": "open", "status": True}, {"_id": 1})),
        "allow_out_of_stock": bool(store_config.get("allow_out_of_stock", False)),
        "operational_updated_at": operational_updated_at.isoformat() if hasattr(operational_updated_at, "isoformat") else str(operational_updated_at or ""),
    }


@router.get("/products")
async def get_public_products():
    commercial = await SettingsService.get_commercial()
    store_config = await SettingsService.get_store_configuration()
    featured_ids = set(store_config.get("featured_product_ids", []))
    enabled_ids = set(store_config.get("enabled_product_ids", []))
    allow_out_of_stock = bool(store_config.get("allow_out_of_stock", False))
    products = await products_service.get_all()
    visible = [
        product for product in products
        if product.get("status", True) is True
        and (not store_config.get("catalog_restricted") or product.get("id") in enabled_ids)
        and (allow_out_of_stock or int(product.get("quantity", 0) or 0) > 0)
    ]
    result = [await _effective_product(product, commercial, allow_out_of_stock) for product in visible]
    highlight_mode = store_config.get("product_highlight_mode", "manual")
    ranking_period = int(store_config.get("ranking_period_days", 30) or 0)
    ranking_limit = int(store_config.get("ranking_limit", 8) or 8)
    ranked_ids = set()
    if highlight_mode == "best_selling":
        ranking = await sales_analytics_service.product_ranking(ranking_period, ranking_limit)
        ranked_ids = {row["id"] for row in ranking["items"]}
    discounts = store_config.get("product_discounts", {}) or {}
    general_store_discount = float(store_config.get("general_store_discount", 0) or 0)
    for product in result:
        product["featured"] = (product.get("id") in ranked_ids) if highlight_mode == "best_selling" else (product.get("id") in featured_ids)
        product["highlight_mode"] = highlight_mode
        store_discount = float(discounts.get(product["id"], general_store_discount) or 0)
        if store_discount > 0:
            product["effective_discount_percentage"] = min(store_discount, 100)
            product["discount_amount"] = round(product["price"] * store_discount / 100, 2)
            product["final_price"] = round(product["price"] - product["discount_amount"], 2)
            product["discount_source"] = "store"
    if highlight_mode == "best_selling":
        result.sort(key=lambda row: row.get("featured", False), reverse=True)
    return result


@router.get("/unavailable-ingredients")
async def get_public_unavailable_ingredients():
    cursor = database["unavailable_ingredients"].find({"active": True}, {"_id": 0, "ingredient": 1})
    return [row.get("ingredient", "") async for row in cursor]


@router.get("/analytics/products")
async def get_public_product_ranking(period_days: int = Query(default=30, ge=0, le=3650), limit: int = Query(default=8, ge=1, le=50)):
    ranking = await sales_analytics_service.product_ranking(period_days, limit)
    config = await SettingsService.get_store_configuration()
    commercial = await SettingsService.get_commercial()
    allow_out_of_stock = bool(config.get("allow_out_of_stock", False))
    all_products = await products_service.get_all()
    enabled_ids = set(config.get("enabled_product_ids", []))
    visible_ids = {str(row.get("id")) for row in all_products if row.get("status", True) is True and (not config.get("catalog_restricted") or str(row.get("id")) in enabled_ids) and (allow_out_of_stock or int(row.get("quantity", 0) or 0) > 0)}
    ranking["items"] = [row for row in ranking["items"] if row["id"] in visible_ids]
    return ranking


@router.get("/analytics/promotions")
async def get_public_promotion_ranking(period_days: int = Query(default=30, ge=0, le=3650), limit: int = Query(default=8, ge=1, le=50)):
    ranking = await sales_analytics_service.promotion_ranking(period_days, limit)
    config = await SettingsService.get_store_configuration()
    promotions = await promotions_service.get_all()
    allowed_ids = set(config.get("enabled_promotion_ids", []))
    visible_ids = {str(row.get("id")) for row in promotions if row.get("status", True) is True and (not config.get("promotion_selection_restricted") or str(row.get("id")) in allowed_ids)}
    ranking["items"] = [row for row in ranking["items"] if row["id"] in visible_ids]
    return ranking
