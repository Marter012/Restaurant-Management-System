from contextlib import asynccontextmanager
import asyncio

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

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
)
from app.utils.handlers import (
    validation_exception_handler,
)
from app.websocket.router import router as websocket_router
from app.database.indexes import create_indexes
from app.database.seed import create_initial_admin
from app.services.settings_service import SettingsService


async def _audit_retention_worker():
    while True:
        try:
            await SettingsService.cleanup_expired_audit_logs()
        except Exception as exc:
            print(f"Error en limpieza de actividad vencida: {exc}")
        await asyncio.sleep(60 * 60)  # Una vez por hora.


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_indexes()
    await create_initial_admin()
    cleanup_task = asyncio.create_task(_audit_retention_worker())
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


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://192.168.100.190:5173",
        "http://192.168.56.1:5173",
        "https://restaurant-management-system-phi-umber.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
app.include_router(websocket_router)


@app.get("/")
def root():
    return {
        "message": "API Gestion BDS funcionando"
    }
