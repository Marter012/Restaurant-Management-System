# Store: arquitectura, cuenta y reembolsos

## Separación
- `app/api/routes/store.py`: rutas HTTP, dependencias y delegación.
- `app/services/store_service.py`: casos de uso del canal Store (catálogo, checkout, webhook, conversión, reembolso y estados).
- `app/repositories/store_repository.py`: punto único de acceso a las colecciones Mongo del Store.
- `app/services/store_customer_service.py` y `app/repositories/store_customer_repository.py`: casos de uso y persistencia de cuentas.

## Edición de cuenta
`PUT /public/customers/me` requiere `Authorization: Bearer <token>` y recibe `first_name`, `last_name` y `location`. El teléfono no se puede editar desde este endpoint para proteger la unicidad y el vínculo del historial.

## Cancelación y reembolso
- Cliente: `POST /public/customers/me/orders/{order_number}/refund`. La ruta verifica que la compra pertenezca a la cuenta, que el pago esté aprobado y que exista comanda vinculada. Ejecuta el reembolso de Mercado Pago con clave de idempotencia y, tras confirmación, sincroniza la cancelación de la comanda.
- Administración: `POST /online-orders/{order_id}/refund`, protegido por `require_admin`, ejecuta el mismo flujo.
- Si Mercado Pago confirma el reembolso pero falla la sincronización de la comanda, el pedido queda `refunded_needs_sync` para reintentar sin volver a cobrar/devolver el dinero.
- Se requiere una caja abierta para registrar el movimiento contable del reembolso, según la lógica existente de `OrderService`.

## Restricciones
No se altera el contrato de checkout, webhooks, conversión de pedidos ni los esquemas previos de validación de dirección obligatoria para delivery. Antes de crear el índice único de teléfonos, la base debe estar libre de duplicados.
