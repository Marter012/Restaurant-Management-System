from fastapi import APIRouter, Depends, Request, HTTPException, status

from app.services.cash_movement_service import CashMovementService
from app.schema.cash_movement_schema import (
    CashMovementCreate,
    CashMovementResponse,
    CashMovementUpdate,
)
from app.websocket.events import broadcast_change
from app.api.dependencies.auth import get_current_user
from app.services.audit_service import AuditService


router = APIRouter(
    prefix="/cashMovement",
    tags=["CashMovement"],
)

service = CashMovementService()


@router.get(
    "/",
    response_model=list[CashMovementResponse],
)
async def get_cash_movements(current_user = Depends(get_current_user)):
    return await service.get_all()


@router.get(
    "/{cash_movement_id}",
    response_model=CashMovementResponse,
)
async def get_cash_movement(cash_movement_id: str, current_user = Depends(get_current_user)):
    return await service.get_by_id(cash_movement_id)


@router.post(
    "/",
    response_model=CashMovementResponse,
)
async def create_cash_movement(
    data: CashMovementCreate,
    request: Request,
    current_user = Depends(get_current_user),
):
    result = await service.create(data, current_user["sub"])
    await AuditService.record(current_user, "created", "cash_movement", result.get("id"), data.description)

    await broadcast_change(
        resource="cash_movement",
        action="created",
        data=result,
        source_client_id=request.headers.get("X-Client-ID"),
    )

    return result


@router.put(
    "/{cash_movement_id}",
    response_model=CashMovementResponse,
)
async def update_cash_movement(
    cash_movement_id: str,
    data: CashMovementUpdate,
    request: Request,
    current_user = Depends(get_current_user),
):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo un administrador puede modificar movimientos de caja",
        )

    result = await service.update(cash_movement_id, data, current_user["sub"])
    await AuditService.record(current_user, "updated", "cash_movement", cash_movement_id, result.get("description"))

    await broadcast_change(
        resource="cash_movement",
        action="updated",
        data=result,
        source_client_id=request.headers.get("X-Client-ID"),
    )

    return result


@router.delete(
    "/{cash_movement_id}",
    status_code=status.HTTP_200_OK,
)
async def delete_cash_movement(
    cash_movement_id: str,
    request: Request,
    current_user = Depends(get_current_user),
):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo un administrador puede eliminar movimientos de caja",
        )

    result = await service.delete_manual(cash_movement_id, current_user["sub"])
    await AuditService.record(current_user, "deleted", "cash_movement", cash_movement_id, result.get("description"))
    await broadcast_change(
        resource="cash_movement",
        action="deleted",
        data=result,
        source_client_id=request.headers.get("X-Client-ID"),
    )
    return result
