from fastapi import APIRouter, Depends

from app.services.user_service import UserService
from app.schema.user_schema import UserCreate, UserResponse, UserUpdate
from app.api.dependencies.auth import require_admin, require_admin_credentials_update
from app.utils.exceptions import ForbiddenException


router = APIRouter(prefix="/users", tags=["Users"])
service = UserService()


@router.get("/", response_model=list[UserResponse])
async def get_users(current_user=Depends(require_admin)):
    return await service.get_all()


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str, current_user=Depends(require_admin)):
    return await service.get_by_id(user_id)


@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, current_user=Depends(require_admin)):
    return await service.create(user)


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: str,
    user: UserUpdate,
    current_user=Depends(require_admin_credentials_update),
):
    if current_user.get("must_change_credentials", False):
        if user_id != current_user["sub"]:
            raise ForbiddenException("Debés actualizar únicamente tus propias credenciales.")

        if user.model_fields_set != {"email", "password"}:
            raise ForbiddenException(
                "Debés enviar únicamente el nuevo email y la nueva contraseña."
            )

        if user.email is None or user.password is None:
            raise ForbiddenException("El email y la contraseña son obligatorios.")

    return await service.update(user_id, user)
