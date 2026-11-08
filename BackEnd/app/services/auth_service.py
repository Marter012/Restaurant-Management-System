from datetime import timedelta

from app.repositories.user_repository import UserRepository
from app.services.password_reset_service import PasswordResetService
from app.utils.exceptions import UnauthorizedException, NotFoundException
from app.utils.password import verify_password
from app.utils.jwt import create_access_token, create_refresh_token, decode_refresh_token


class AuthService:
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    REFRESH_TOKEN_EXPIRE_DAYS = 7

    def __init__(self):
        self.repository = UserRepository()
        self.password_reset_service = PasswordResetService()

    async def _get_active_user_by_id(self, user_id):
        try:
            user = await self.repository.get_by_id(user_id)
        except NotFoundException:
            raise UnauthorizedException("El usuario asociado al token no existe.")

        if not user or not user.get("status", False):
            raise UnauthorizedException("El usuario asociado al token no existe o se encuentra inactivo.")
        return user

    def _build_tokens(self, user):
        must_change = user.get("must_change_credentials", False)
        claims = {
            "sub": user["id"],
            "username": user["username"],
            "role": user["role"],
            "must_change_credentials": must_change,
        }

        return {
            "access_token": create_access_token(
                claims,
                timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES),
            ),
            "token_type": "bearer",
            "refresh_token": create_refresh_token(
                user["id"],
                timedelta(days=self.REFRESH_TOKEN_EXPIRE_DAYS),
            ),
            "expires_in": self.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "must_change_credentials": must_change,
        }

    async def login(self, username, password):
        user = await self.repository.get_by_username(username)
        if not user:
            raise UnauthorizedException("El nombre de usuario no existe.")
        if not user.get("status", False):
            raise UnauthorizedException("El usuario se encuentra inactivo.")
        if not verify_password(password, user["password_hash"]):
            raise UnauthorizedException("La contraseña ingresada es incorrecta.")
        return self._build_tokens(user)

    async def refresh(self, refresh_token):
        payload = decode_refresh_token(refresh_token)
        user_id = payload.get("sub")
        if not user_id:
            raise UnauthorizedException("El refresh token no contiene un usuario válido.")
        return self._build_tokens(await self._get_active_user_by_id(user_id))

    async def forgot_password(self, email):
        await self.password_reset_service.create_reset_code(email)
        return {"message": "Si el email corresponde a una cuenta, recibirás un código de recuperación."}

    async def verify_reset_code(self, email, code):
        await self.password_reset_service.verify_code(email, code)
        return {"message": "El código de recuperación es válido."}

    async def reset_password(self, email, code, new_password):
        await self.password_reset_service.reset_password(email, code, new_password)
        return {"message": "La contraseña fue actualizada correctamente."}

    async def get_reset_status(self, email):
        return await self.password_reset_service.get_reset_status(email)
