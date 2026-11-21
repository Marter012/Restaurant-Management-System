from pydantic import BaseModel, Field, field_validator, model_validator
from typing import Any, Literal


class StoreTheme(BaseModel):
    primary: str = "#173F35"
    accent: str = "#E9A23B"
    canvas: str = "#F7F6F0"
    surface: str = "#FFFFFF"
    surface_strong: str = "#FFFFFF"
    ink: str = "#1D2B26"
    muted: str = "#69766F"
    border: str = "#E3E8E1"


class StoreConfigurationUpdate(BaseModel):
    store_title: str = Field(default="", max_length=120)
    tagline: str = Field(default="", max_length=180)
    hero_title: str = Field(default="", max_length=180)
    hero_description: str = Field(default="", max_length=500)
    hero_image: str | None = None
    logo_url: str | None = None
    featured_product_ids: list[str] = Field(default_factory=list)
    enabled_product_ids: list[str] = Field(default_factory=list)
    catalog_restricted: bool = False
    enabled_promotion_ids: list[str] = Field(default_factory=list)
    promotion_selection_restricted: bool = False
    product_discounts: dict[str, float] = Field(default_factory=dict)
    general_store_discount: float = Field(default=0, ge=0, le=100)
    theme: StoreTheme = Field(default_factory=StoreTheme)
    show_promotions: bool = True
    show_featured: bool = True
    # Controlado desde Gestión; consumido por la tienda pública.
    product_highlight_mode: Literal["manual", "best_selling"] = "manual"
    promotion_highlight_mode: Literal["manual", "best_selling"] = "manual"
    ranking_period_days: int = Field(default=30, ge=0, le=3650)
    ranking_limit: int = Field(default=8, ge=1, le=50)
    delivery_enabled: bool = False
    pickup_enabled: bool = True
    # Parámetros complementarios administrados desde la pestaña Store.
    phone_number: str | None = Field(default=None, max_length=30)
    public_sales_enabled: bool | None = None
    allow_out_of_stock: bool = False


class OnlineOrderItem(BaseModel):
    product_id: str
    quantity: int = Field(ge=1, le=50)
    garnish: str = ""
    removed_ingredients: list[str] = Field(default_factory=list)
    note: str = Field(default="", max_length=500)


class OnlineOrderCreate(BaseModel):
    customer_name: str = Field(default="", max_length=120)
    phone: str = Field(min_length=8, max_length=30)
    email: str | None = Field(default=None, max_length=254)
    fulfillment: Literal["pickup", "delivery"] = "pickup"
    address: str = Field(default="", max_length=300)
    customer_location: str = Field(default="", max_length=300)
    pickup_time: str = ""
    note: str = Field(default="", max_length=1000)
    items: list[OnlineOrderItem] = Field(min_length=1)

    @field_validator("address", "customer_location", mode="before")
    @classmethod
    def clean_optional_location(cls, value):
        return str(value or "").strip()

    @model_validator(mode="after")
    def require_address_for_delivery(self):
        if self.fulfillment == "delivery" and not self.address:
            raise ValueError("La dirección es obligatoria para los pedidos con envío o cadetería.")
        return self


class OnlineOrderStatusUpdate(BaseModel):
    status: str


class StoreCustomerCreate(BaseModel):
    first_name: str = Field(default="", max_length=80)
    last_name: str = Field(default="", max_length=80)
    phone: str = Field(min_length=8, max_length=30)
    location: str = Field(default="", max_length=300)

    @field_validator("first_name", "last_name", mode="before")
    @classmethod
    def clean_optional_name(cls, value):
        return str(value or "").strip()

    @field_validator("phone", mode="before")
    @classmethod
    def validate_required_phone(cls, value):
        value = str(value or "").strip()
        digits = "".join(character for character in value if character.isdigit())
        if len(digits) < 8 or len(digits) > 15:
            raise ValueError("Ingresá un número de teléfono válido.")
        if any(not (character.isdigit() or character in "+ ()-.") for character in value):
            raise ValueError("El teléfono contiene caracteres no válidos.")
        return value

    @field_validator("location", mode="before")
    @classmethod
    def clean_optional_location(cls, value):
        return str(value or "").strip()


class StoreCustomerUpdate(BaseModel):
    """Datos editables de la cuenta Store. El teléfono es inmutable."""
    first_name: str = Field(default="", max_length=80)
    last_name: str = Field(default="", max_length=80)
    location: str = Field(default="", max_length=300)

    @field_validator("first_name", "last_name", mode="before")
    @classmethod
    def clean_optional_name_update(cls, value):
        return str(value or "").strip()

    @field_validator("location", mode="before")
    @classmethod
    def clean_location_update(cls, value):
        return str(value or "").strip()
