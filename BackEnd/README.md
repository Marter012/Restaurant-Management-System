# BoutiqueSabores Backend

Backend FastAPI + MongoDB.

## Instalación local

```bash
python -m venv .venv
# Windows Git Bash:
source .venv/Scripts/activate
pip install -r requirements.txt
```

Configurar las variables de entorno requeridas en `.env` (no subir credenciales al repositorio). Iniciar:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

En Render, el comando habitual es:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

## Estructura principal

- `app/api/routes`: endpoints HTTP.
- `app/api/dependencies`: dependencias de autenticación/autorización.
- `app/services`: lógica de aplicación y reglas de negocio.
- `app/repositories`: persistencia MongoDB.
- `app/schema`: contratos Pydantic.
- `app/database`: conexión, índices y datos iniciales.
- `app/middleware`: middleware HTTP compartido.
- `app/websocket`: eventos y conexiones WebSocket.
- `app/integrations`: integraciones externas (cuando se separen por proveedor).

Ver `docs/CAMBIOS_ARQUITECTURA_Y_CUENTA_STORE.md` para el alcance y la validación del ajuste de cuentas/historial del Store.
