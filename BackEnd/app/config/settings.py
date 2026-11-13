from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    MONGO_URL: str

    MONGO_DB_NAME: str

    SECRET_KEY: str

    MAILERSEND_API_KEY: str = ""
    MAILERSEND_FROM_EMAIL: str = ""

    INITIAL_ADMIN_USERNAME: str
    INITIAL_ADMIN_EMAIL: str
    INITIAL_ADMIN_PASSWORD: str

    # Mercado Pago
    MERCADOPAGO_ACCESS_TOKEN: str = ""

    # Store
    STORE_FRONTEND_URL: str = "http://localhost:5174"
    PUBLIC_API_URL: str = ""


settings = Settings()