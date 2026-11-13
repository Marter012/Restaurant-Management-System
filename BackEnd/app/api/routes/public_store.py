from fastapi import APIRouter, HTTPException

from app.database.connection import database
from app.services.product_service import ProductService
from app.services.settings_service import SettingsService

router = APIRouter(prefix="/public", tags=["Public Store"])
products_service = ProductService()


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
        "allow_out_of_stock": bool(operational.get("allow_out_of_stock", False)),
        "operational_updated_at": operational_updated_at.isoformat() if hasattr(operational_updated_at, "isoformat") else str(operational_updated_at or ""),
    }


@router.get("/products")
async def get_public_products():
    commercial = await SettingsService.get_commercial()
    store_config = await SettingsService.get_store_configuration()
    featured_ids = set(store_config.get("featured_product_ids", []))
    enabled_ids = set(store_config.get("enabled_product_ids", []))
    operational = await database["app_settings"].find_one({"_id": "operational"}) or {}
    allow_out_of_stock = bool(operational.get("allow_out_of_stock", False))
    products = await products_service.get_all()
    visible = [
        product for product in products
        if product.get("status", True) is True
        and (not store_config.get("catalog_restricted") or product.get("id") in enabled_ids)
        and (allow_out_of_stock or int(product.get("quantity", 0) or 0) > 0)
    ]
    result = [await _effective_product(product, commercial, allow_out_of_stock) for product in visible]
    discounts = store_config.get("product_discounts", {}) or {}
    general_store_discount = float(store_config.get("general_store_discount", 0) or 0)
    for product in result:
        product["featured"] = product.get("id") in featured_ids
        store_discount = float(discounts.get(product["id"], general_store_discount) or 0)
        if store_discount > 0:
            product["effective_discount_percentage"] = min(store_discount, 100)
            product["discount_amount"] = round(product["price"] * store_discount / 100, 2)
            product["final_price"] = round(product["price"] - product["discount_amount"], 2)
            product["discount_source"] = "store"
    return result


@router.get("/unavailable-ingredients")
async def get_public_unavailable_ingredients():
    cursor = database["unavailable_ingredients"].find({"active": True}, {"_id": 0, "ingredient": 1})
    return [row.get("ingredient", "") async for row in cursor]
