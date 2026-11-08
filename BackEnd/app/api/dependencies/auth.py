from fastapi import Depends
from fastapi.security import HTTPBearer

from app.repositories.user_repository import UserRepository
from app.utils.exceptions import ForbiddenException, UnauthorizedException, NotFoundException
from app.utils.jwt import decode_access_token


security = HTTPBearer()
user_repository = UserRepository()


async def get_current_user(credentials=Depends(security)):
    payload = decode_access_token(credentials.credentials)
    user_id = payload.get("sub")
    if not user_id:
        raise UnauthorizedException("Token inválido")

    try:
        user = await user_repository.get_by_id(user_id)
    except NotFoundException:
        raise UnauthorizedException("Usuario inactivo o inexistente")

    if not user or not user.get("status", False):
        raise UnauthorizedException("Usuario inactivo o inexistente")

    return {
        "sub": user["id"],
        "username": user["username"],
        "role": user["role"],
        "must_change_credentials": user.get("must_change_credentials", False),
    }


async def require_admin(current_user=Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise ForbiddenException("No tienes permiso para realizar esta acción.")

    if current_user.get("must_change_credentials", False):
        raise ForbiddenException(
            "Debés actualizar el email y la contraseña iniciales antes de utilizar el sistema."
        )
    return current_user


async def require_admin_credentials_update(current_user=Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise ForbiddenException("No tienes permiso para realizar esta acción.")
    return current_user
