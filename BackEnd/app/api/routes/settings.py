from fastapi import APIRouter, Depends, Request, HTTPException
from pydantic import BaseModel

from app.database.connection import database
from app.api.dependencies.auth import get_current_user, require_admin
from app.schema.settings_schema import (
    EstablishmentSettingsUpdate, CommercialSettingsUpdate, AuditRetentionUpdate
)
from app.services.settings_service import SettingsService
from app.services.audit_service import AuditService
from app.websocket.events import broadcast_change

router = APIRouter(prefix="/settings", tags=["Settings"])

class OperationalSettings(BaseModel):
    allow_out_of_stock: bool = False

@router.get("/")
async def get_settings(current_user=Depends(get_current_user)):
    data = await database["app_settings"].find_one({"_id": "operational"})
    return {"allow_out_of_stock": bool(data and data.get("allow_out_of_stock", False))}

@router.put("/", dependencies=[Depends(require_admin)])
async def update_settings(data: OperationalSettings):
    await database["app_settings"].update_one(
        {"_id": "operational"}, {"$set": {"allow_out_of_stock": data.allow_out_of_stock}}, upsert=True
    )
    return data.model_dump()

@router.get("/establishment")
async def get_establishment():
    return await SettingsService.get_establishment()

@router.put("/establishment")
async def update_establishment(data: EstablishmentSettingsUpdate, request: Request, current_user=Depends(require_admin)):
    name = data.name.strip()
    if not name:
        raise HTTPException(status_code=422, detail="El nombre del establecimiento es obligatorio.")
    current_establishment = await database["app_settings"].find_one({"_id": "establishment"}) or {}
    submitted_phone = data.phone_number if "phone_number" in data.model_fields_set else current_establishment.get("phone_number", "")
    phone_number = (submitted_phone or "").strip()
    if phone_number and not phone_number.replace("+", "").replace(" ", "").replace("-", "").replace("(", "").replace(")", "").isdigit():
        raise HTTPException(status_code=422, detail="El teléfono debe contener únicamente números y símbolos telefónicos.")
    result = {"name": name, "phone_number": phone_number}
    await database["app_settings"].update_one({"_id": "establishment"}, {"$set": result}, upsert=True)
    await AuditService.record(current_user, "updated", "establishment_settings", "establishment", f"Nombre: {name}")
    await broadcast_change("settings", "establishment_updated", result, request.headers.get("X-Client-ID"))
    return {"_id": "establishment", **result}

@router.get("/commercial")
async def get_commercial():
    return await SettingsService.get_commercial()

@router.put("/commercial")
async def update_commercial(data: CommercialSettingsUpdate, request: Request, current_user=Depends(require_admin)):
    result = data.model_dump()
    result["updated_at"] = __import__("app.utils.dateZone", fromlist=["DateUtils"]).DateUtils.now_argentina()
    await database["app_settings"].update_one({"_id": "commercial"}, {"$set": result}, upsert=True)
    await AuditService.record(current_user, "updated", "commercial_settings", "commercial", "Configuración comercial modificada")
    await broadcast_change("settings", "commercial_updated", result, request.headers.get("X-Client-ID"))
    return {"_id": "commercial", **result}

@router.get("/public-sales")
async def get_public_sales_status():
    settings = await SettingsService.get_commercial()
    return {"public_sales_enabled": bool(settings.get("public_sales_enabled", False))}

@router.get("/audit-retention")
async def get_audit_retention(current_user=Depends(require_admin)):
    return await SettingsService.get_retention()

@router.post("/audit-retention/preview")
async def preview_audit_retention(data: AuditRetentionUpdate, current_user=Depends(require_admin)):
    return await SettingsService.retention_preview(data.retention_days)

@router.put("/audit-retention")
async def update_audit_retention(data: AuditRetentionUpdate, request: Request, current_user=Depends(require_admin)):
    preview = await SettingsService.retention_preview(data.retention_days)
    if preview["records_to_delete"] and not data.confirm_deletion:
        return {"confirmation_required": True, **preview,
                "message": "Hay registros que superan el período elegido. Confirmá para eliminarlos."}
    deleted = await SettingsService.apply_retention(data.retention_days)
    result = {"retention_days": data.retention_days, "deleted_records": deleted}
    await AuditService.record(current_user, "updated", "audit_retention", "audit_retention",
                              f"Conservación: {data.retention_days} días; eliminados: {deleted}")
    await broadcast_change("settings", "audit_retention_updated", result, request.headers.get("X-Client-ID"))
    return {"confirmation_required": False, **result, "message": "Período de conservación actualizado."}
