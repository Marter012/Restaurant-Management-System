from pydantic import BaseModel, Field

from app.schema.base_schema import MongoModel


class ProductCreate(BaseModel):

    name: str

    image: str | None = Field(default=None, max_length=7_000_000)

    category: str

    price: float

    discount_percentage: float | None = Field(default=None, ge=0, le=100)

    quantity: int

    status: bool = True
    has_garnish: bool = False
    garnish_options: list[str] = Field(default_factory=list)
    ingredients: list[str] = Field(default_factory=list)


class ProductUpdate(BaseModel):

    name: str | None = None

    image: str | None = Field(default=None, max_length=7_000_000)

    category: str | None = None

    price: float | None = None

    discount_percentage: float | None = Field(default=None, ge=0, le=100)

    quantity: int | None = Field(default=None, ge=0)

    status: bool | None = None
    has_garnish: bool | None = None
    garnish_options: list[str] | None = None
    ingredients: list[str] | None = None


class ProductResponse(
    ProductCreate,
    MongoModel
):

    discount_amount: float = 0
    final_price: float | None = None
    discount_source: str | None = None
    effective_discount_percentage: float = 0
