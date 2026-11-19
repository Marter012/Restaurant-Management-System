from app.services.otp.otp_provider import OTPProvider


class TextBeeProvider:
    """Adaptador reservado para integrar TextBee en una futura etapa."""

    async def send_code(self, phone: str) -> dict:
        raise NotImplementedError("TextBee todavía no está configurado.")

    async def verify_code(self, phone: str, code: str) -> dict:
        raise NotImplementedError("La validación OTP todavía no está configurada.")
