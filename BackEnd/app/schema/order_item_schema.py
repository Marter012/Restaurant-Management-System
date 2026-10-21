from typing import Literal

from pydantic import BaseModel, Field, model_validator
from app.schema.base_schema import MongoModel


class PromotionSelectionLoad(BaseModel):
    """Selección concreta realizada para un grupo de la promoción."""

    promotion_item_id: str | None = None
    product_id: str
    quantity: int = Field(gt=0)
    group_index: int | None = None
    group_name: str | None = None
    product_name: str | None = None


class PromotionSelectionResponse(PromotionSelectionLoad):
    # Campos de snapshot usados por el servicio y por tickets antiguos.
    name: str | None = None
    unit_price: float | None = None
    subtotal: float | None = None
    status: bool | None = None


class OrderItemLoad(BaseModel):
    # Si no viene item_type, el elemento se interpreta como producto normal.
    item_type: Literal["product", "promotion", "extra"] = "product"
    product_id: str | None = None
    promotion_id: str | None = None
    quantity: int = Field(gt=0)
    promotion_selections: list[PromotionSelectionLoad] = Field(default_factory=list)
    garnish: str | None = None
    removed_ingredients: list[str] = Field(default_factory=list)


class OrderItemCreate(BaseModel):
    item_type: Literal["product", "promotion", "extra"] = "product"
    product_id: str | None = None
    promotion_id: str | None = None
    name: str
    quantity: int = Field(gt=0)
    unit_price: float = Field(ge=0)
    subtotal: float = Field(ge=0)
    promotion_selections: list[PromotionSelectionResponse] = Field(default_factory=list)
    status: bool = True
    garnish: str | None = None
    ingredients: list[str] = Field(default_factory=list)
    removed_ingredients: list[str] = Field(default_factory=list)

    @model_validator(mode="before")
    @classmethod
    def normalize_legacy_item_fields(cls, value):
        if not isinstance(value, dict):
            return value
        data = dict(value)
        if "item_type" not in data and data.get("type") in {"product", "promotion", "extra"}:
            data["item_type"] = data["type"]
        if "promotion_selections" not in data and "promotion_items" in data:
            data["promotion_selections"] = data["promotion_items"]
        return data


class OrderItemUpdate(BaseModel):
    item_type: Literal["product", "promotion", "extra"] | None = None
    product_id: str | None = None
    promotion_id: str | None = None
    name: str | None = None
    quantity: int | None = Field(default=None, gt=0)
    unit_price: float | None = Field(default=None, ge=0)
    subtotal: float | None = Field(default=None, ge=0)
    promotion_selections: list[PromotionSelectionResponse] | None = None
    status: bool | None = None
    garnish: str | None = None
    ingredients: list[str] | None = None
    removed_ingredients: list[str] | None = None


class OrderItemResponse(OrderItemCreate, MongoModel):
    pass
