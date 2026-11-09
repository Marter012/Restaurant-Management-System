from pydantic import BaseModel, Field, model_validator


class EstablishmentSettingsUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone_number: str | None = Field(default=None, max_length=30)


class CommercialSettingsUpdate(BaseModel):
    public_sales_enabled: bool
    general_discount_enabled: bool = False
    general_discount_percentage: float = Field(default=0, ge=0, le=100)

    @model_validator(mode="after")
    def validate_discount(self):
        if self.general_discount_enabled and self.general_discount_percentage <= 0:
            raise ValueError("El descuento general debe ser mayor que 0.")
        return self


class AuditRetentionUpdate(BaseModel):
    retention_days: int = Field(ge=1, le=3650)
    confirm_deletion: bool = False
