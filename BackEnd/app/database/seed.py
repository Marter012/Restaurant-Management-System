from app.database.connection import users_collection, database
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


async def initialize_app_settings():
    """
    Inicializa las configuraciones necesarias para el funcionamiento
    del sistema cuando la base de datos está vacía.

    No modifica documentos existentes.
    """

    collection = database["app_settings"]

    default_settings = [
        {
            "_id": "operational",
            "allow_out_of_stock": False,
        },
        {
            "_id": "establishment",
            "name": "Boutique de Sabores",
            "phone_number": "",
        },
        {
            "_id": "commercial",
            "public_sales_enabled": False,
            "general_discount_enabled": False,
            "general_discount_percentage": 0,
        },
        {
            "_id": "audit_retention",
            "retention_days": 30,
        },
        {
            "_id": "store",
            "tagline": "Hecho para disfrutar",
            "hero_title": "Tu próximo favorito está acá.",
            "hero_description": "Elegí lo que más te gusta y armá tu pedido.",
            "hero_image": None,
            "logo_url": None,
            "featured_product_ids": [],
            "theme": {"primary": "#4A2818", "accent": "#B7834E", "canvas": "#F5E8D1", "surface": "#FFF9F0", "surface_strong": "#FFFFFF", "ink": "#332116", "muted": "#806B5A", "border": "#E7D6C1"},
            "show_promotions": True,
            "show_featured": True,
            "delivery_enabled": False,
            "pickup_enabled": True,
        },
    ]

    for document in default_settings:
        await collection.update_one(
            {"_id": document["_id"]},
            {
                "$setOnInsert": document
            },
            upsert=True,
        )

    print("Configuraciones iniciales verificadas correctamente.")