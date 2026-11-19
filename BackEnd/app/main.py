from contextlib import asynccontextmanager
import asyncio

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from app.api.routes import (
    products,
    orders,
    cash_registers,
    stock_movements,
    cash_movements,
    promotions,
    users,
    auth,
    settings,
    audit,
    public_store,
    store,
)

from app.utils.handlers import validation_exception_handler
from app.middleware.cors import configure_cors

from app.websocket.router import router as websocket_router

from app.database.indexes import create_indexes
from app.database.seed import (
    create_initial_admin,
    initialize_app_settings,
)

from app.services.settings_service import SettingsService


async def _audit_retention_worker():
    while True:
        try:
            await SettingsService.cleanup_expired_audit_logs()

        except Exception as exc:
            print(f"Error en limpieza de actividad vencida: {exc}")

        await asyncio.sleep(60 * 60)


@asynccontextmanager
async def lifespan(app: FastAPI):

    # 1. Crear índices
    await create_indexes()

    # 2. Crear usuario administrador inicial
    await create_initial_admin()

    # 3. Inicializar configuraciones del sistema
    await initialize_app_settings()

    # 4. Iniciar limpieza automática de auditoría
    cleanup_task = asyncio.create_task(
        _audit_retention_worker()
    )

    print("Backend iniciado correctamente.")

    yield

    cleanup_task.cancel()

    try:
        await cleanup_task

    except asyncio.CancelledError:
        pass


app = FastAPI(
    title="Boutique de Sabores",
    description="API gestion",
    version="1.0.0",
    lifespan=lifespan,
)

# Middleware HTTP centralizado.
configure_cors(app)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler,
)


app.include_router(products.router)
app.include_router(orders.router)
app.include_router(stock_movements.router)
app.include_router(cash_registers.router)
app.include_router(cash_movements.router)
app.include_router(promotions.router)
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(settings.router)
app.include_router(audit.router)
app.include_router(public_store.router)
app.include_router(store.router)
app.include_router(websocket_router)


@app.get("/")
def root():
    return {
        "message": "API Gestion BDS funcionando"
    }