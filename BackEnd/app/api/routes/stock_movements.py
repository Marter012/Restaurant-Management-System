from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel, Field

from app.services.stock_movement_service import StockMovementService
from app.schema.stock_movement_schema import (
    StockMovementResponse,
    StockMovementCreate,
    StockMovementUpdate,
)
from app.websocket.events import broadcast_change
from app.api.dependencies.auth import get_current_user, require_admin
from app.services.audit_service import AuditService


router = APIRouter(
    prefix="/stockMovement",
    tags=["StockMovement"],
)

service = StockMovementService()

class BulkStockEntry(BaseModel):
    product_id: str
    quantity: int = Field(ge=0)

class BulkStockUpdate(BaseModel):
    products: list[BulkStockEntry]


@router.get(
    "/",
    response_model=list[StockMovementResponse],
)
async def get_stock_movements(current_user = Depends(get_current_user)):
    return await service.get_all()


@router.get(
    "/{stock_movement_id}",
    response_model=StockMovementResponse,
)
async def get_stock_movement(stock_movement_id: str, current_user = Depends(get_current_user)):
    return await service.get_by_id(stock_movement_id)


@router.post(
    "/",
    response_model=StockMovementResponse,
)
async def create_stock_movement(
    data: StockMovementCreate,
    request: Request,
    current_user = Depends(get_current_user),
):
    result = await service.create(data, current_user["sub"])
    await AuditService.record(current_user, "created", "stock_movement", result.get("id"), data.description)

    await broadcast_change(
        resource="stock_movement",
        action="created",
        data=result,
        source_client_id=request.headers.get("X-Client-ID"),
    )

    return result


@router.put(
    "/{stock_movement_id}",
    response_model=StockMovementResponse,
)
async def update_stock_movement(
    stock_movement_id: str,
    data: StockMovementUpdate,
    request: Request,
    current_user = Depends(get_current_user),
):
    result = await service.update(stock_movement_id, data, current_user["sub"])
    await AuditService.record(current_user, "updated", "stock_movement", stock_movement_id, data.description or "Movimiento de stock")

    await broadcast_change(
        resource="stock_movement",
        action="updated",
        data=result,
        source_client_id=request.headers.get("X-Client-ID"),
    )

    return result

@router.put("/bulk/adjust", response_model=list[StockMovementResponse])
async def update_all_stock(data: BulkStockUpdate, request: Request, current_user=Depends(require_admin)):
    result = await service.set_quantities(data.products, current_user["sub"])
    await AuditService.record(current_user, "bulk_updated", "stock", "all", f"Productos ajustados: {len(data.products)}")
    await broadcast_change(resource="product", action="bulk_stock_updated", data=result,
                           source_client_id=request.headers.get("X-Client-ID"))
    return result
