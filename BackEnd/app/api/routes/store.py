from fastapi import APIRouter, Depends, Request

from app.api.dependencies.auth import get_current_user, require_admin
from app.schema.store_schema import (
    StoreConfigurationUpdate, OnlineOrderCreate, OnlineOrderStatusUpdate,
    StoreCustomerCreate, StoreCustomerUpdate,
)
from app.services import store_service as service

router = APIRouter(tags=["Online Store"])


@router.get("/settings/store")
async def get_store_configuration():
    return await service.get_store_configuration()


@router.put("/settings/store", dependencies=[Depends(require_admin)])
async def update_store_configuration(data: StoreConfigurationUpdate, request: Request, current_user=Depends(get_current_user)):
    return await service.update_store_configuration(data, request, current_user)


@router.post("/public/customers/access")
async def access_store_customer(data: StoreCustomerCreate):
    return await service.access_store_customer(data)


@router.post("/public/customers/register")
async def register_store_customer(data: StoreCustomerCreate):
    return await service.register_store_customer(data)


@router.get("/public/customers/me")
async def get_store_customer_me(request: Request):
    return await service.get_store_customer_me(request)


@router.put("/public/customers/me")
async def update_store_customer_me(data: StoreCustomerUpdate, request: Request):
    return await service.update_store_customer_account(data, request)


@router.get("/public/customers/me/orders")
async def get_store_customer_orders(request: Request):
    return await service.get_store_customer_orders(request)


@router.post("/public/customers/me/orders/{order_number}/refund")
async def cancel_store_customer_order(order_number: int, request: Request):
    return await service.request_store_order_refund(order_number, request)


@router.get("/public/promotions")
async def get_store_promotions():
    return await service.get_store_promotions()


@router.post("/public/online-orders")
async def create_online_order(data: OnlineOrderCreate, request: Request):
    return await service.create_online_order(data, request)


@router.post("/payments/mercadopago/webhook")
async def mercadopago_webhook(request: Request):
    return await service.mercadopago_webhook(request)


@router.get("/online-orders", dependencies=[Depends(require_admin)])
async def list_online_orders(status: str | None = None):
    return await service.list_online_orders(status)


@router.post("/online-orders/{order_id}/retry-conversion", dependencies=[Depends(require_admin)])
async def retry_online_order_conversion(order_id: str, request: Request, current_user=Depends(get_current_user)):
    return await service.retry_online_order_conversion(order_id, request, current_user)


@router.post("/online-orders/{order_id}/refund", dependencies=[Depends(require_admin)])
async def process_online_order_refund(order_id: str, request: Request, current_user=Depends(get_current_user)):
    return await service.process_online_order_refund(order_id, request, current_user)


@router.patch("/online-orders/{order_id}", dependencies=[Depends(require_admin)])
async def update_online_order_status(order_id: str, data: OnlineOrderStatusUpdate, request: Request):
    return await service.update_online_order_status(order_id, data, request)
