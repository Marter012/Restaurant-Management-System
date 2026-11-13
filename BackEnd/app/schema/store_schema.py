from pydantic import BaseModel, Field
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
    delivery_enabled: bool = False
    pickup_enabled: bool = True
    # Parámetros complementarios administrados desde la pestaña Store.
    phone_number: str | None = Field(default=None, max_length=30)
    public_sales_enabled: bool | None = None


class OnlineOrderItem(BaseModel):
    product_id: str
    quantity: int = Field(ge=1, le=50)
    garnish: str = ""
    removed_ingredients: list[str] = Field(default_factory=list)
    note: str = Field(default="", max_length=500)


class OnlineOrderCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=8, max_length=30)
    email: str | None = Field(default=None, max_length=254)
    fulfillment: Literal["pickup", "delivery"] = "pickup"
    address: str = Field(default="", max_length=300)
    customer_location: str = Field(default="", max_length=300)
    pickup_time: str = ""
    note: str = Field(default="", max_length=1000)
    items: list[OnlineOrderItem] = Field(min_length=1)


class OnlineOrderStatusUpdate(BaseModel):
    status: str
