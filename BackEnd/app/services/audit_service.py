from app.database.connection import database
from app.utils.dateZone import DateUtils
from app.utils.serializers import serialize_mongo

class AuditService:
    collection = database["audit_logs"]

    @classmethod
    async def record(cls, user, action, resource, resource_id, details=None):
        await cls.collection.insert_one({
            "actor_user_id": str(user.get("sub", "")),
            "actor_username": user.get("username", "Usuario"),
            "action": action,
            "resource": resource,
            "resource_id": str(resource_id or ""),
            "details": details or "",
            "created_at": DateUtils.now_argentina(),
        })

    @classmethod
    async def recent(cls, limit=100):
        cursor = cls.collection.find().sort("created_at", -1).limit(limit)
        return [serialize_mongo(item) async for item in cursor]
