from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel, Field

from app.database.connection import database
from app.api.dependencies.auth import require_admin, get_current_user

from app.schema.product_schema import (
    ProductResponse,
    ProductCreate,
    ProductUpdate,
)

from app.services.product_service import ProductService
from app.services.audit_service import AuditService
from app.websocket.events import broadcast_change


router = APIRouter(
    prefix="/product",
    tags=["Product"],
)

service = ProductService()


# =========================================================
# SCHEMAS
# =========================================================

class BulkProductValue(BaseModel):
    product_id: str
    quantity: int | None = Field(default=None, ge=0)
    price: float | None = Field(default=None, ge=0)


class BulkProductUpdate(BaseModel):
    products: list[BulkProductValue]


class IngredientAvailabilityUpdate(BaseModel):
    ingredient: str = Field(min_length=1, max_length=120)
    unavailable: bool = True


# =========================================================
# PRODUCTOS
# =========================================================

@router.get(
    "/",
    response_model=list[ProductResponse],
)
async def get_products(
    current_user=Depends(get_current_user),
):
    return await service.get_all()


# =========================================================
# DISPONIBILIDAD DE INGREDIENTES
# IMPORTANTE: estas rutas deben estar antes de /{product_id}
# =========================================================

@router.get("/unavailable-ingredients")
async def get_unavailable_ingredients(
    current_user=Depends(get_current_user),
):
    cursor = database["unavailable_ingredients"].find({
        "active": True
    })

    return [
        {
            "ingredient": row.get("ingredient"),
            "active": True,
        }
        async for row in cursor
    ]


@router.put("/unavailable-ingredients")
async def set_ingredient_availability(
    data: IngredientAvailabilityUpdate,
    request: Request,
    current_user=Depends(require_admin),
):
    ingredient = data.ingredient.strip()

    if not ingredient:
        from app.utils.exceptions import NotFoundException
        raise NotFoundException("Debe indicar un ingrediente")

    collection = database["unavailable_ingredients"]

    if data.unavailable:
        await collection.update_one(
            {
                "ingredient_key": ingredient.casefold()
            },
            {
                "$set": {
                    "ingredient": ingredient,
                    "ingredient_key": ingredient.casefold(),
                    "active": True,
                    "updated_by_user_id": str(current_user["sub"]),
                }
            },
            upsert=True,
        )

    else:
        await collection.update_one(
            {
                "ingredient_key": ingredient.casefold()
            },
            {
                "$set": {
                    "active": False,
                    "updated_by_user_id": str(current_user["sub"]),
                }
            },
            upsert=False,
        )

    result = {
        "ingredient": ingredient,
        "unavailable": data.unavailable,
    }

    await AuditService.record(
        current_user,
        "updated",
        "ingredient_availability",
        ingredient,
        "Disponibilidad de ingrediente modificada",
    )

    await broadcast_change(
        resource="product",
        action="ingredient_availability_updated",
        data=result,
        source_client_id=request.headers.get("X-Client-ID"),
    )

    return result


# =========================================================
# ACTUALIZACIÓN MASIVA DE PRODUCTOS
# =========================================================

@router.put("/bulk/update")
async def bulk_update_products(
    data: BulkProductUpdate,
    request: Request,
    current_user=Depends(require_admin),
):
    """Actualiza en lote stock y, opcionalmente, precios.
    El stock se modifica mediante movimientos.
    """

    from app.services.stock_movement_service import StockMovementService
    from app.api.routes.stock_movements import BulkStockEntry

    stock_entries = [
        BulkStockEntry(
            product_id=item.product_id,
            quantity=item.quantity,
        )
        for item in data.products
        if item.quantity is not None
    ]

    movements = (
        await StockMovementService().set_quantities(
            stock_entries,
            current_user["sub"],
        )
        if stock_entries
        else []
    )

    price_updates = []

    for item in data.products:
        if item.price is None:
            continue

        updated_product = await service.update(
            item.product_id,
            ProductUpdate(price=item.price),
        )

        price_updates.append({
            "product_id": item.product_id,
            "price": updated_product.get("price"),
        })

    response = {
        "stock_movements": movements,
        "price_updates": price_updates,
    }

    await AuditService.record(
        current_user,
        "bulk_updated",
        "products",
        "all",
        f"Productos: {len(data.products)}",
    )

    await broadcast_change(
        resource="product",
        action="bulk_updated",
        data=response,
        source_client_id=request.headers.get("X-Client-ID"),
    )

    return response


# =========================================================
# CREAR PRODUCTO
# =========================================================

@router.post(
    "/",
    response_model=ProductResponse,
)
async def create_product(
    product: ProductCreate,
    request: Request,
    current_user=Depends(get_current_user),
):
    result = await service.create(product)

    await AuditService.record(
        current_user,
        "created",
        "product",
        result.get("id"),
        result.get("name"),
    )

    await broadcast_change(
        resource="product",
        action="created",
        data=result,
        source_client_id=request.headers.get("X-Client-ID"),
    )

    return result


# =========================================================
# OBTENER PRODUCTO POR ID
# IMPORTANTE: ruta dinámica después de las rutas específicas
# =========================================================

@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
async def get_product(
    product_id: str,
    current_user=Depends(get_current_user),
):
    return await service.get_by_id(product_id)


# =========================================================
# ACTUALIZAR PRODUCTO POR ID
# =========================================================

@router.put(
    "/{product_id}",
    response_model=ProductResponse,
)
async def update_product(
    product_id: str,
    product: ProductUpdate,
    request: Request,
    current_user=Depends(get_current_user),
):
    result = await service.update(
        product_id,
        product,
    )

    await AuditService.record(
        current_user,
        "updated",
        "product",
        product_id,
        result.get("name"),
    )

    await broadcast_change(
        resource="product",
        action="updated",
        data=result,
        source_client_id=request.headers.get("X-Client-ID"),
    )

    return result

# =========================================================
# ELIMINAR PRODUCTO (solo si no tiene referencias)
# =========================================================

@router.delete("/{product_id}")
async def delete_product(
    product_id: str,
    request: Request,
    current_user=Depends(require_admin),
):
    deleted_product = await service.delete(product_id)

    await AuditService.record(
        current_user,
        "deleted",
        "product",
        product_id,
        deleted_product.get("name"),
    )

    await broadcast_change(
        resource="product",
        action="deleted",
        data={"id": product_id},
        source_client_id=request.headers.get("X-Client-ID"),
    )

    return {
        "success": True,
        "message": "Producto eliminado correctamente.",
        "id": product_id,
    }
