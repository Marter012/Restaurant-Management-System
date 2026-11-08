from app.database.connection import users_collection
from app.utils.password import hash_password
from app.utils.dateZone import DateUtils
from app.config.settings import settings


async def create_initial_admin():
    existing_admin = await users_collection.find_one({"role": "admin"})
    if existing_admin:
        return

    admin_data = {
        "username": settings.INITIAL_ADMIN_USERNAME,
        "email": settings.INITIAL_ADMIN_EMAIL,
        "password_hash": hash_password(settings.INITIAL_ADMIN_PASSWORD),
        "role": "admin",
        "created_at": DateUtils.now_argentina(),
        "status": True,
        "must_change_credentials": True,
    }

    await users_collection.insert_one(admin_data)
    print(
        "Usuario administrador inicial creado. "
        f"Debe actualizar sus credenciales: {settings.INITIAL_ADMIN_USERNAME}"
    )
