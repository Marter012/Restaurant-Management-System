from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

from app.schema.base_schema import MongoModel
from app.schema.order_item_schema import OrderItemLoad, OrderItemResponse
from app.schema.payment_schema import PaymentMethod, PaymentStatus, PaymentSplit


class OrderCreate(BaseModel):
    order_number: int
    customer_name: str
    items: list[OrderItemLoad]
    method_payment: PaymentMethod
    status_payment: PaymentStatus
    delivery_time: str
    cash_register_id: str | None = None
    status: bool = True
    discount_type: Literal["percent", "amount"] | None = None
    discount_value: float = Field(default=0, ge=0)
    extra_items: list[dict] = Field(default_factory=list)
    payments: list[PaymentSplit] = Field(default_factory=list)
    # Solo se envía tras la confirmación explícita del aviso de cocina.
    confirmed_out_of_stock: bool = False


class OrderUpdate(BaseModel):
    order_number: int | None = None
    customer_name: str | None = None
    items: list[OrderItemLoad] | None = None
    method_payment: PaymentMethod | None = None
    status_payment: PaymentStatus | None = None
    delivery_time: str | None = None
    cash_register_id: str | None = None
    status: bool | None = None
    discount_type: Literal["percent", "amount"] | None = None
    discount_value: float | None = Field(default=None, ge=0)
    extra_items: list[dict] | None = None
    payments: list[PaymentSplit] | None = None


class OrderResponse(MongoModel):
    order_number: int
    customer_name: str
    items: list[OrderItemResponse]
    method_payment: PaymentMethod
    status_payment: PaymentStatus
    delivery_time: str
    cash_register_id: str | None = None
    status: bool = True
    total_price: float
    created_at: datetime
    # str mantiene compatibilidad con órdenes históricas que guardaron "".
    discount_type: str | None = None
    discount_value: float = 0
    extra_items: list[dict] = Field(default_factory=list)
    payments: list[PaymentSplit] = Field(default_factory=list)
    # False significa que esta venta se registró sin tocar inventario.
    stock_deducted: bool = True
    out_of_stock_confirmed: bool = False
    out_of_stock_confirmed_by_user_id: str | None = None
