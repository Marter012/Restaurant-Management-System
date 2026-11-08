from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.database.connection import database
from app.api.dependencies.auth import get_current_user, require_admin

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
        {"_id": "operational"},
        {"$set": {"allow_out_of_stock": data.allow_out_of_stock}},
        upsert=True,
    )
    return data.model_dump()
