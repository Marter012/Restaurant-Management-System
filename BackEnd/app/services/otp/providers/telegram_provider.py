class TelegramProvider:
    """Adaptador reservado para enviar códigos mediante un bot de Telegram."""

    async def send_code(self, phone: str) -> dict:
        raise NotImplementedError("Telegram OTP todavía no está configurado.")

    async def verify_code(self, phone: str, code: str) -> dict:
        raise NotImplementedError("La validación OTP todavía no está configurada.")
