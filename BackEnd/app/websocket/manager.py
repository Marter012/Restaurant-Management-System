from __future__ import annotations

import time
from typing import Any

from fastapi import WebSocket


class ConnectionManager:
    """Administra clientes autenticados y una conexión Print Agent por backend."""

    def __init__(self) -> None:
        self.active_connections: dict[WebSocket, str] = {}
        self.roles: dict[WebSocket, str] = {}
        self.user_claims: dict[WebSocket, dict[str, Any]] = {}
        self.print_server: WebSocket | None = None
        self.print_server_status: dict[str, Any] | None = None
        # request_id -> (cliente que inició la solicitud, instante de creación)
        self.pending_agent_requests: dict[str, tuple[WebSocket, float]] = {}

    async def connect(self, websocket: WebSocket, client_id: str) -> None:
        await websocket.accept()
        self.active_connections[websocket] = client_id
        # No se considera cliente autorizado hasta validar el JWT o el token del agente.
        self.roles[websocket] = "pending"

    def disconnect(self, websocket: WebSocket) -> bool:
        was_print_server = self.print_server is websocket

        self.active_connections.pop(websocket, None)
        self.roles.pop(websocket, None)
        self.user_claims.pop(websocket, None)

        # Las solicitudes originadas por una pestaña desconectada ya no tienen destino.
        for request_id, (requester, _created_at) in list(self.pending_agent_requests.items()):
            if requester is websocket:
                self.pending_agent_requests.pop(request_id, None)

        if was_print_server:
            self.print_server = None
            self.print_server_status = None

        return was_print_server

    def get_client_id(self, websocket: WebSocket) -> str | None:
        return self.active_connections.get(websocket)

    def get_role(self, websocket: WebSocket) -> str | None:
        return self.roles.get(websocket)

    def set_role(self, websocket: WebSocket, role: str) -> bool:
        if websocket not in self.active_connections:
            return False

        if role == "print_server":
            current = self.get_print_server()
            if current is not None and current is not websocket:
                # No reemplazar silenciosamente una impresora conectada por otra.
                return False
            self.print_server = websocket

        self.roles[websocket] = role
        return True

    def authenticate_client(self, websocket: WebSocket, claims: dict[str, Any]) -> bool:
        if websocket not in self.active_connections or self.roles.get(websocket) != "pending":
            return False
        self.user_claims[websocket] = claims
        self.roles[websocket] = "client"
        return True

    def is_client_authenticated(self, websocket: WebSocket) -> bool:
        if self.roles.get(websocket) != "client":
            return False
        claims = self.user_claims.get(websocket) or {}
        expiration = claims.get("exp")
        if expiration is not None:
            try:
                if float(expiration) <= time.time():
                    return False
            except (TypeError, ValueError):
                return False
        return bool(claims.get("sub"))

    def get_print_server(self) -> WebSocket | None:
        websocket = self.print_server
        if websocket is None:
            return None
        if websocket not in self.active_connections or self.roles.get(websocket) != "print_server":
            self.print_server = None
            self.print_server_status = None
            return None
        return websocket

    def set_print_server_status(self, status: dict[str, Any] | None) -> None:
        self.print_server_status = status

    def register_agent_request(self, request_id: str, requester: WebSocket) -> bool:
        self._remove_expired_requests()
        if not request_id or request_id in self.pending_agent_requests:
            return False
        if requester not in self.active_connections or not self.is_client_authenticated(requester):
            return False
        self.pending_agent_requests[request_id] = (requester, time.monotonic())
        return True

    async def send_agent_response(self, request_id: str, message: dict[str, Any]) -> bool:
        pending = self.pending_agent_requests.pop(request_id, None)
        if pending is None:
            return False
        requester, _created_at = pending
        return await self.send_to(requester, message)

    async def fail_pending_agent_requests(self, error: str) -> None:
        pending = list(self.pending_agent_requests.items())
        self.pending_agent_requests.clear()
        for request_id, (requester, _created_at) in pending:
            await self.send_to(
                requester,
                {
                    "type": "PRINT_AGENT_RESPONSE",
                    "request_id": request_id,
                    "success": False,
                    "error": error,
                },
            )

    def _remove_expired_requests(self, max_age_seconds: int = 90) -> None:
        cutoff = time.monotonic() - max_age_seconds
        for request_id, (_requester, created_at) in list(self.pending_agent_requests.items()):
            if created_at < cutoff:
                self.pending_agent_requests.pop(request_id, None)

    async def send_to(self, websocket: WebSocket | None, message: dict[str, Any]) -> bool:
        if websocket is None or websocket not in self.active_connections:
            return False
        try:
            await websocket.send_json(message)
            return True
        except Exception:
            # El endpoint propietario de la conexión se encargará de limpiarla.
            return False

    async def send_to_client(self, client_id: str | None, message: dict[str, Any]) -> bool:
        if not client_id:
            return False
        for websocket, current_client_id in list(self.active_connections.items()):
            if current_client_id == client_id and self.roles.get(websocket) == "client":
                return await self.send_to(websocket, message)
        return False

    async def broadcast(self, message: dict[str, Any]) -> None:
        # Nunca divulgar estados/eventos a sockets que aún no se autenticaron.
        allowed_roles = {"client", "print_server"}
        disconnected: list[WebSocket] = []
        for websocket in list(self.active_connections):
            if self.roles.get(websocket) not in allowed_roles:
                continue
            try:
                await websocket.send_json(message)
            except Exception:
                disconnected.append(websocket)
        for websocket in disconnected:
            self.disconnect(websocket)


manager = ConnectionManager()
