import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


DEFAULT_ALLOWED_ORIGINS = (
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://192.168.100.190:5173",
    "http://192.168.56.1:5173",
    "https://restaurant-management-system-phi-umber.vercel.app",
    "https://store-online-eight.vercel.app",
)


def configure_cors(app: FastAPI) -> None:
    """Registra CORS con dominios locales y dominios definidos en Render."""
    origins = list(DEFAULT_ALLOWED_ORIGINS)

    for variable in ("FRONTEND_URL", "STORE_FRONTEND_URL"):
        origins.extend(
            origin.strip().rstrip("/")
            for origin in os.getenv(variable, "").split(",")
            if origin.strip()
        )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=sorted(set(origins)),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
