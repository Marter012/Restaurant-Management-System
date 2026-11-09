from datetime import timedelta
from app.database.connection import database
from app.utils.dateZone import DateUtils
from app.utils.serializers import serialize_mongo


class SettingsService:
    collection = database["app_settings"]
    DEFAULT_ESTABLISHMENT = {"_id": "establishment", "name": "Boutique de Sabores", "phone_number": ""}
    DEFAULT_COMMERCIAL = {
        "_id": "commercial", "public_sales_enabled": False,
        "general_discount_enabled": False, "general_discount_percentage": 0
    }
    DEFAULT_RETENTION = {"_id": "audit_retention", "retention_days": 30}

    @classmethod
    async def get_document(cls, key, default):
        doc = await cls.collection.find_one({"_id": key})
        return serialize_mongo(doc or default.copy())

    @classmethod
    async def get_establishment(cls):
        return await cls.get_document("establishment", cls.DEFAULT_ESTABLISHMENT)

    @classmethod
    async def get_commercial(cls):
        return await cls.get_document("commercial", cls.DEFAULT_COMMERCIAL)

    @classmethod
    async def get_retention(cls):
        return await cls.get_document("audit_retention", cls.DEFAULT_RETENTION)

    @classmethod
    async def retention_preview(cls, days):
        cutoff = DateUtils.now_argentina() - timedelta(days=days)
        count = await database["audit_logs"].count_documents({"created_at": {"$lt": cutoff}})
        oldest = await database["audit_logs"].find_one(
            {"created_at": {"$lt": cutoff}}, sort=[("created_at", 1)]
        )
        return {"retention_days": days, "cutoff_date": cutoff.isoformat(),
                "records_to_delete": count,
                "oldest_record_date": oldest.get("created_at").isoformat() if oldest and oldest.get("created_at") else None}

    @classmethod
    async def apply_retention(cls, days):
        await cls.collection.update_one({"_id": "audit_retention"},
            {"$set": {"retention_days": days, "updated_at": DateUtils.now_argentina()}}, upsert=True)
        cutoff = DateUtils.now_argentina() - timedelta(days=days)
        result = await database["audit_logs"].delete_many({"created_at": {"$lt": cutoff}})
        return result.deleted_count

    @classmethod
    async def cleanup_expired_audit_logs(cls):
        retention = await cls.get_retention()
        days = int(retention.get("retention_days", 30))
        cutoff = DateUtils.now_argentina() - timedelta(days=days)
        result = await database["audit_logs"].delete_many({"created_at": {"$lt": cutoff}})
        return result.deleted_count
