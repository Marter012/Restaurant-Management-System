from typing import Literal
from pydantic import BaseModel, Field


PaymentMethod = Literal[
    "cash",
    "transfer",
    "qr",
    "debit_card",
    "mercado_pago"
]


PaymentStatus = Literal[
    "pending",
    "paid",
    "cancelled"
]

class PaymentSplit(BaseModel):
    method_payment: PaymentMethod
    amount: float = Field(ge=0)


CashMovementType = Literal[
    "inflow",
    "outflow"
]
