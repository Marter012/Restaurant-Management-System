from __future__ import annotations

from app.database.connection import database


class StoreRepository:
    """Acceso a las colecciones persistentes del canal Store.

    Los servicios obtienen colecciones exclusivamente a través de este
    repositorio; los endpoints HTTP no acceden directamente a MongoDB.
    """

    def __init__(self, db=database):
        self.database = db

    def collection(self, name: str):
        return self.database[name]

    @property
    def customers(self):
        return self.collection("store_customers")

    @property
    def online_orders(self):
        return self.collection("online_orders")

    @property
    def orders(self):
        return self.collection("orders")

    @property
    def settings(self):
        return self.collection("app_settings")


store_repository = StoreRepository()
