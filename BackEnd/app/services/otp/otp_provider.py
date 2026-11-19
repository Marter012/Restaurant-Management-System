from __future__ import annotations

from typing import Protocol


class OTPProvider(Protocol):
    """Contrato que deberán implementar los proveedores OTP."""

    async def send_code(self, phone: str) -> dict:
        ...

    async def verify_code(self, phone: str, code: str) -> dict:
        ...
