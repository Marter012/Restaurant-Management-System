import json
import logging
import os
from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect

from app.repositories.user_repository import UserRepository
from app.utils.jwt import decode_access_token
from app.websocket.manager import manager

router = APIRouter(tags=["WebSocket"])
logger = logging.getLogger(__name__)
user_repository = UserRepository()


ALLOWED_PRINT_ACTIONS = {
    "health",
    "print",
    "config_get",
    "config_update",
    "queue",
    "printer_status",
    "status",
    "printers",
    "test_print",
    "jobs",
    "cancel_job",
    "history",
    "open_queue",
}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


async def _reject_socket(websocket: WebSocket, message_type: str, error: str) -> None:
    await manager.send_to(websocket, {"type": message_type, "error": error, "timestamp": utc_now()})
    try:
        await websocket.close(code=1008, reason=error[:120])
    except Exception:
        pass


async def _authenticate_browser(websocket: WebSocket, message: dict) -> None:
    if manager.get_role(websocket) != "pending":
        await _reject_socket(websocket, "AUTH_ERROR", "La conexión ya fue autenticada.")
        return

    token = message.get("token")
    if not isinstance(token, str) or not token.strip():
        await _reject_socket(websocket, "AUTH_ERROR", "Falta el token de acceso.")
        return

    try:
        claims = decode_access_token(token.strip())
        user_id = claims.get("sub")
        if not user_id:
            raise ValueError("El token no contiene un usuario válido.")

        # Igual que en la API HTTP: validar que el usuario siga activo y exista.
        user = await user_repository.get_by_id(str(user_id))
        if not user or not user.get("status", False):
            raise ValueError("El usuario está inactivo o no existe.")

        current_claims = {
            "sub": str(user.get("id", user_id)),
            "username": user.get("username", ""),
            "role": user.get("role", ""),
            "exp": claims.get("exp"),
        }
        if not manager.authenticate_client(websocket, current_claims):
            raise ValueError("No se pudo autenticar esta conexión.")

    except Exception:
        await _reject_socket(websocket, "AUTH_ERROR", "La sesión no es válida. Iniciá sesión nuevamente.")
        return

    await manager.send_to(websocket, {"type": "AUTHENTICATED", "timestamp": utc_now()})


async def _register_print_agent(websocket: WebSocket, message: dict) -> None:
    if manager.get_role(websocket) != "pending":
        await _reject_socket(websocket, "PRINT_AGENT_AUTH_ERROR", "La conexión ya fue registrada.")
        return

    expected_token = os.environ.get("PRINT_AGENT_TOKEN", "").strip()
    provided_token = message.get("token")
    logger.info(
    "Print Agent: solicitud de autenticación recibida."
)
    if not expected_token or not isinstance(provided_token, str) or provided_token != expected_token:
        logger.warning(
    "Print Agent: autenticación rechazada. Revisar PRINT_AGENT_TOKEN."
)
        await _reject_socket(
            websocket,
            "PRINT_AGENT_AUTH_ERROR",
            "El Print Agent no está autenticado. Revisá PRINT_AGENT_TOKEN.",
        )
        return

    if not manager.set_role(websocket, "print_server"):
        await _reject_socket(
            websocket,
            "PRINT_AGENT_AUTH_ERROR",
            "Ya hay un Print Agent conectado a este backend.",
        )
        return

    await manager.send_to(websocket, {"type": "PRINT_SERVER_REGISTERED", "timestamp": utc_now()})
    logger.info(
    "Print Agent: autenticación correcta y agente registrado."
)
    cached_status = manager.print_server_status
    if cached_status is not None:
        await manager.send_to(
            websocket,
            {"type": "PRINT_STATUS", "data": cached_status, "timestamp": utc_now()},
        )


async def handle_message(websocket: WebSocket, message: dict) -> None:
    message_type = message.get("type")

    if message_type == "ping":
        await manager.send_to(websocket, {"type": "pong", "timestamp": utc_now()})
        return

    if message_type == "AUTHENTICATE":
        await _authenticate_browser(websocket, message)
        return

    if message_type == "REGISTER_PRINT_SERVER":
        await _register_print_agent(websocket, message)
        return

    if message_type == "PRINT_STATUS":
        if manager.get_role(websocket) != "print_server":
            return
        status = message.get("data")
        if not isinstance(status, dict):
            return
        status["agent_connected"] = True
        manager.set_print_server_status(status)
        await manager.broadcast({"type": "PRINT_STATUS", "data": status, "timestamp": utc_now()})
        return

    if message_type == "PRINT_AGENT_REQUEST":
        if not manager.is_client_authenticated(websocket):
            request_id = message.get("request_id")
            if isinstance(request_id, str) and request_id:
                await manager.send_to(
                    websocket,
                    {
                        "type": "PRINT_AGENT_RESPONSE",
                        "request_id": request_id,
                        "success": False,
                        "error": "La sesión no está autenticada o expiró.",
                    },
                )
            else:
                await _reject_socket(websocket, "AUTH_ERROR", "La sesión no está autenticada.")
            return

        request_id = message.get("request_id")
        action = message.get("action")
        payload = message.get("payload", {})

        if not isinstance(request_id, str) or not request_id:
            return
        if not isinstance(action, str) or action not in ALLOWED_PRINT_ACTIONS:
            await manager.send_to(
                websocket,
                {
                    "type": "PRINT_AGENT_RESPONSE",
                    "request_id": request_id,
                    "success": False,
                    "error": "La operación del Print Agent no está permitida.",
                },
            )
            return
        if not isinstance(payload, dict):
            await manager.send_to(
                websocket,
                {
                    "type": "PRINT_AGENT_RESPONSE",
                    "request_id": request_id,
                    "success": False,
                    "error": "Los datos de la operación no son válidos.",
                },
            )
            return

        print_server = manager.get_print_server()
        if print_server is None:
            await manager.send_to(
                websocket,
                {
                    "type": "PRINT_AGENT_RESPONSE",
                    "request_id": request_id,
                    "success": False,
                    "error": "No hay un Print Agent conectado al backend.",
                },
            )
            return

        if not manager.register_agent_request(request_id, websocket):
            await manager.send_to(
                websocket,
                {
                    "type": "PRINT_AGENT_RESPONSE",
                    "request_id": request_id,
                    "success": False,
                    "error": "No se pudo registrar la solicitud de impresión.",
                },
            )
            return

        delivered = await manager.send_to(
            print_server,
            {
                "type": "PRINT_AGENT_COMMAND",
                "request_id": request_id,
                "source_client_id": manager.get_client_id(websocket),
                "action": action,
                "payload": payload,
                "timestamp": utc_now(),
            },
        )
        if not delivered:
            manager.pending_agent_requests.pop(request_id, None)
            await manager.send_to(
                websocket,
                {
                    "type": "PRINT_AGENT_RESPONSE",
                    "request_id": request_id,
                    "success": False,
                    "error": "No se pudo enviar la operación al Print Agent.",
                },
            )
        return

    if message_type == "PRINT_AGENT_RESULT":
        if manager.get_role(websocket) != "print_server":
            return
        request_id = message.get("request_id")
        if not isinstance(request_id, str) or not request_id:
            return

        result = {
            "type": "PRINT_AGENT_RESPONSE",
            "request_id": request_id,
            "success": bool(message.get("success")),
        }
        if "response" in message:
            result["response"] = message["response"]
        if "error" in message:
            result["error"] = str(message["error"])

        await manager.send_agent_response(request_id, result)
        return

    # Compatibilidad con clientes antiguos que envían PRINT_REQUEST.
    if message_type == "PRINT_REQUEST":
        message["type"] = "PRINT_AGENT_REQUEST"
        message["action"] = "print"
        message["payload"] = {"ticket": message.get("ticket", "")}
        await handle_message(websocket, message)


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    client_id: str | None = Query(default=None),
):
    client_id = client_id or str(uuid4())
    await manager.connect(websocket, client_id)

    try:
        while True:
            raw_message = await websocket.receive_text()
            try:
                message = json.loads(raw_message)
            except (json.JSONDecodeError, TypeError):
                continue
            if isinstance(message, dict):
                await handle_message(websocket, message)
    except WebSocketDisconnect:
        pass
    except Exception:
        logger.exception("Error en la conexión WebSocket.")
    finally:
        was_print_server = manager.get_role(websocket) == "print_server"
        manager.disconnect(websocket)
        if was_print_server:
            await manager.fail_pending_agent_requests("El Print Agent se desconectó del backend.")
            await manager.broadcast(
                {
                    "type": "PRINT_STATUS",
                    "data": {
                        "agent_connected": False,
                        "connected": False,
                        "online": False,
                        "status": "DISCONNECTED",
                        "status_message": "El Print Agent no está conectado.",
                        "printer": "",
                        "printer_type": "",
                        "driver": None,
                        "server": None,
                        "queue_count": 0,
                        "jobs": [],
                        "agent_queue_count": 0,
                    },
                    "timestamp": utc_now(),
                }
            )
