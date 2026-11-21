from __future__ import annotations

import hashlib
import secrets
from datetime import timedelta, timezone

from fastapi import HTTPException, Request
from pymongo.errors import DuplicateKeyError

from app.repositories.store_customer_repository import StoreCustomerRepository
from app.utils.dateZone import DateUtils


class StoreCustomerService:
    """Casos de uso de registro, sesión e historial de clientes del Store."""

    SESSION_MINUTES = 60 * 24 * 30

    def __init__(self, repository: StoreCustomerRepository | None = None) -> None:
        self.repository = repository or StoreCustomerRepository()

    @staticmethod
    def normalize_phone(value: str) -> str:
        return "".join(char for char in str(value or "") if char.isdigit())

    @staticmethod
    def _token_hash(token: str) -> str:
        return hashlib.sha256(token.encode("utf-8")).hexdigest()

    async def access(self, data, *, reject_existing: bool = False) -> dict:
        """Registra una cuenta nueva o inicia sesión en la cuenta del teléfono.

        ``reject_existing`` se utiliza en el endpoint explícito de registro:
        si el teléfono ya está registrado, se informa que no puede crearse
        otra cuenta. El endpoint de acceso conserva el comportamiento de
        inicio de sesión para clientes existentes.
        """
        phone = self.normalize_phone(data.phone)
        first_name = data.first_name.strip()
        last_name = data.last_name.strip()
        if len(phone) < 8 or len(phone) > 15:
            raise HTTPException(422, "Ingresá un número de teléfono válido.")

        customer = await self.repository.get_by_phone(phone)
        if customer and reject_existing:
            raise HTTPException(
                status_code=409,
                detail=(
                    "Este número de teléfono ya tiene una cuenta registrada. "
                    "Iniciá sesión para continuar. Recordá que solamente se "
                    "permite una cuenta por número de teléfono."
                ),
            )

        if customer and not customer.get("active", True):
            raise HTTPException(
                status_code=403,
                detail="Esta cuenta no está activa. Comunicate con el establecimiento.",
            )


        now = DateUtils.now_argentina()
        if not customer:
            document = {
                "first_name": first_name,
                "last_name": last_name,
                "phone": phone,
                "location": data.location.strip(),
                "created_at": now,
                "active": True,
            }
            try:
                customer = await self.repository.create(document)
            except DuplicateKeyError:
                # Otra solicitud pudo insertar el mismo teléfono entre la
                # consulta inicial y el insert. Nunca se crea una segunda cuenta.
                customer = await self.repository.get_by_phone(phone)
                if not customer:
                    raise HTTPException(
                        status_code=409,
                        detail=(
                            "Este número de teléfono ya está registrado. "
                            "Solo se permite una cuenta por número de teléfono."
                        ),
                    )
                if reject_existing:
                    raise HTTPException(
                        status_code=409,
                        detail=(
                            "Este número de teléfono ya tiene una cuenta registrada. "
                            "Iniciá sesión para continuar. Recordá que solamente "
                            "se permite una cuenta por número de teléfono."
                        ),
                    )
                if not customer.get("active", True):
                    raise HTTPException(403, "Esta cuenta no está activa. Comunicate con el establecimiento.")
        elif data.location.strip() or first_name or last_name:
            changes = {"updated_at": DateUtils.now_argentina()}
            if data.location.strip(): changes["location"] = data.location.strip()
            if first_name: changes["first_name"] = first_name
            if last_name: changes["last_name"] = last_name
            await self.repository.update(customer["_id"], changes)
            customer.update(changes)

        token = secrets.token_urlsafe(36)
        await self.repository.update(customer["_id"], {
            "token_hash": self._token_hash(token),
            "token_expires_at": now + timedelta(minutes=self.SESSION_MINUTES),
            "last_login_at": now,
        })

        customer_id = str(customer["_id"])
        linked_count = await self.repository.attach_guest_orders(
            customer_id, phone, self.normalize_phone
        )
        return {
            "token": token,
            "customer_id": customer_id,
            "first_name": customer.get("first_name", first_name),
            "last_name": customer.get("last_name", last_name),
            "phone": phone,
            "location": customer.get("location", ""),
            "expires_in": self.SESSION_MINUTES * 60,
            "linked_orders": linked_count,
        }

    async def get_from_request(self, request: Request):
        authorization = request.headers.get("Authorization", "")
        scheme, _, token = authorization.partition(" ")
        if scheme.lower() != "bearer" or not token:
            return None
        customer = await self.repository.get_by_token_hash(self._token_hash(token))
        if not customer:
            return None
        expires_at = customer.get("token_expires_at")
        if not expires_at:
            raise HTTPException(
                status_code=401,
                detail="La sesión del cliente ha expirado."
            )

        # PyMongo devuelve datetimes naive en UTC por defecto.
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if expires_at <= DateUtils.now_argentina().astimezone(timezone.utc):
            raise HTTPException(
                status_code=401,
                detail="La sesión del cliente ha expirado."
            )
        return customer

    async def me(self, request: Request) -> dict:
        customer = await self.get_from_request(request)
        if not customer:
            raise HTTPException(401, "La sesión venció. Volvé a iniciar sesión.")
        expires_at = customer.get("token_expires_at")
        return {
            "first_name": customer.get("first_name", ""),
            "last_name": customer.get("last_name", ""),
            "phone": customer.get("phone", ""),
            "location": customer.get("location", ""),
            "expires_at": expires_at.isoformat() if expires_at else None,
        }

    async def update_account(self, data, request: Request) -> dict:
        """Actualiza nombre, apellido y ubicación; el teléfono no se modifica.

        Mantener el teléfono inmutable conserva la unicidad de cuenta y evita
        reasignar compras históricas a otro número sin un proceso verificado.
        """
        customer = await self.get_from_request(request)
        if not customer:
            raise HTTPException(401, "La sesión venció. Volvé a iniciar sesión.")

        changes = {
            "first_name": data.first_name.strip(),
            "last_name": data.last_name.strip(),
            "location": data.location.strip(),
            "updated_at": DateUtils.now_argentina(),
        }
        await self.repository.update(customer["_id"], changes)
        return {
            "first_name": changes["first_name"],
            "last_name": changes["last_name"],
            "phone": customer.get("phone", ""),
            "location": changes["location"],
        }

    async def orders(self, request: Request) -> list[dict]:
        customer = await self.get_from_request(request)
        if not customer:
            raise HTTPException(401, "Iniciá sesión nuevamente para consultar tus compras.")

        phone = self.normalize_phone(customer.get("phone", ""))
        documents = await self.repository.find_orders_for_customer(
            str(customer["_id"]), phone, self.normalize_phone
        )
        rows = []
        now = DateUtils.now_argentina()
        for order in documents:
            if order.get("payment_status") == "pending":
                expires_at = order.get("payment_expires_at")
                if expires_at is None:
                    created_at = order.get("created_at")
                    if created_at is not None:
                        if created_at.tzinfo is None:
                            created_at = created_at.replace(tzinfo=timezone.utc)
                        expires_at = created_at + timedelta(minutes=30)
                if expires_at is not None:
                    if expires_at.tzinfo is None:
                        expires_at = expires_at.replace(tzinfo=timezone.utc)
                    if expires_at <= now.astimezone(timezone.utc):
                        continue
            created = order.get("created_at")
            requested_at = order.get("refund_requested_at")
            rows.append({
                "order_number": order.get("order_number"),
                "created_at": created.isoformat() if hasattr(created, "isoformat") else str(created or ""),
                "total": order.get("total", 0),
                "items": [
                    {"name": item.get("name", ""), "quantity": item.get("quantity", 0)}
                    for item in order.get("items", [])
                ],
                "payment_status": order.get("payment_status", "pending"),
                "status": order.get("status", ""),
                "refund_status": order.get("refund_status", ""),
                "refund_requested_at": requested_at.isoformat() if hasattr(requested_at, "isoformat") else None,
                "payment_provider": order.get("payment_provider"),
                "payment_method": order.get("payment_method"),
                "checkout_url": order.get("checkout_url"),
                "payment_expires_at": order.get("payment_expires_at").isoformat() if hasattr(order.get("payment_expires_at"), "isoformat") else None,
            })
        return rows


store_customer_service = StoreCustomerService()
