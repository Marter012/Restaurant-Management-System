from pydantic import BaseModel, Field

from app.schema.base_schema import MongoModel


class ProductCreate(BaseModel):

    name: str

    category: str

    price: float

    quantity: int

    status: bool = True
    has_garnish: bool = False
    garnish_options: list[str] = Field(default_factory=list)
    ingredients: list[str] = Field(default_factory=list)


class ProductUpdate(BaseModel):

    name: str | None = None

    category: str | None = None

    price: float | None = None

    quantity: int | None = Field(default=None, ge=0)

    status: bool | None = None
    has_garnish: bool | None = None
    garnish_options: list[str] | None = None
    ingredients: list[str] | None = None


class ProductResponse(
    ProductCreate,
    MongoModel
):

    pass
