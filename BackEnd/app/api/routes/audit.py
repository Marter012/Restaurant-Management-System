from fastapi import APIRouter, Depends
from app.services.audit_service import AuditService
from app.api.dependencies.auth import require_admin

router = APIRouter(prefix="/audit", tags=["Audit"])

@router.get("/")
async def get_recent_activity(current_user=Depends(require_admin)):
    return await AuditService.recent()
