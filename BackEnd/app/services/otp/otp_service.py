from __future__ import annotations

from app.config.settings import settings


class OTPDisabledError(RuntimeError):
    """Señala que la verificación OTP todavía no está habilitada."""


class OTPService:
    """Orquestador futuro de OTP.

    El acceso actual al Store NO utiliza este servicio. Se conserva esta capa
    para poder incorporar un proveedor sin acoplarlo a los clientes ni a las rutas.
    """

    def __init__(self, provider=None):
        self.provider = provider

    @property
    def enabled(self) -> bool:
        return settings.OTP_PROVIDER.lower() not in {"", "disabled", "none"}

    async def send_code(self, phone: str) -> dict:
        if not self.enabled or self.provider is None:
            raise OTPDisabledError("La verificación OTP está deshabilitada.")
        return await self.provider.send_code(phone)

    async def verify_code(self, phone: str, code: str) -> dict:
        if not self.enabled or self.provider is None:
            raise OTPDisabledError("La verificación OTP está deshabilitada.")
        return await self.provider.verify_code(phone, code)


otp_service = OTPService()
