# BoutiqueSabores Backend — cambios aplicados

## 1. Organización agregada

Se incorporó una separación explícita para el caso de uso de cuentas del Store:

- `app/api/routes/store.py`: conserva las rutas HTTP y delega registro, sesión e historial.
- `app/services/store_customer_service.py`: concentra normalización de teléfono, creación/acceso de cuenta, validación de sesión y armado del historial.
- `app/repositories/store_customer_repository.py`: concentra las consultas y escrituras de `store_customers` y `online_orders` para ese caso de uso.
- `app/schema/store_schema.py`: contiene el modelo de entrada `StoreCustomerCreate`.
- `app/middleware/cors.py`: centraliza la configuración CORS.
- `app/main.py`: registra el middleware y los routers.

Los endpoints públicos existentes se mantienen:
- `POST /public/customers/access`
- `POST /public/customers/register`
- `GET /public/customers/me`
- `GET /public/customers/me/orders`

## 2. Corrección de historial por teléfono

El código anterior vinculaba pedidos de invitado solo si `customer_id` no existía y después consultaba el historial únicamente por `customer_id` y por estados de pago `approved`/`refunded`.

Eso podía dejar fuera compras históricas cuando:
- el pedido ya tenía `customer_id` vacío o un valor legacy no estándar;
- el teléfono estaba guardado con espacios, guiones, paréntesis o prefijo `+`;
- el pedido tenía un estado distinto de `approved` o `refunded` (por ejemplo, pendiente);
- el usuario esperaba ver todas sus compras y no solamente las pagadas.

Ahora:
1. Se normalizan los teléfonos eliminando caracteres que no sean dígitos.
2. Al acceder/registrarse, se recorren pedidos online con teléfono y se asocian los que coinciden y no pertenecen a otra cuenta.
3. Se guarda `customer_phone_normalized` en nuevos pedidos.
4. El historial busca por `customer_id` y recupera también compras históricas coincidentes por teléfono.
5. El historial ya no filtra exclusivamente por estado de pago aprobado/reembolsado.

La asociación no reasigna pedidos que ya estén vinculados a otra cuenta.

## 3. CORS

La lista de orígenes permitidos se movió a `app/middleware/cors.py`. Se mantienen los dominios locales y de producción presentes en el proyecto, y se admiten `FRONTEND_URL` y `STORE_FRONTEND_URL` con múltiples dominios separados por coma.

## 4. Verificaciones ejecutadas

- Compilación sintáctica de todos los archivos Python de `app/` con `compileall`: correcta.
- Comprobación estática de que las rutas de cuenta delegan al servicio: correcta.
- No se ejecutaron pruebas de integración contra MongoDB, Mercado Pago ni WebSocket porque este entorno no dispone de las credenciales/servicios del proyecto.
- No se pudo ejecutar un arranque real de FastAPI en este entorno porque no están instaladas las dependencias del proyecto (por ejemplo, `motor`).

## 5. Importante: alcance de la refactorización

El backend ya tenía carpetas `api/routes`, `services`, `repositories`, `schema`, `database` y `api/dependencies`. Esta entrega ordena el middleware CORS y separa correctamente el flujo de cuentas/historial del Store.

No se trasladó todavía toda la lógica comercial de los demás módulos (comandas, caja, stock, promociones, webhook y reembolsos) fuera de sus servicios/rutas. Hacerlo en bloque sin pruebas de regresión podría alterar reglas de stock, caja o pagos. Esas áreas deben refactorizarse por módulo, conservando contratos y ejecutando pruebas específicas.

## 6. Prueba manual recomendada

1. Desplegar Backend en un entorno de prueba.
2. Crear un pedido invitado con teléfono de prueba.
3. Verificar que el documento aparezca en `online_orders` con `phone`.
4. Crear/acceder a una cuenta con el mismo número (con o sin separadores).
5. Consultar `GET /public/customers/me/orders` con el token Bearer devuelto.
6. Confirmar que el pedido aparece.
7. Repetir con una compra que ya tenga `customer_id` de otra cuenta y confirmar que no se reasigna.
8. Probar el reembolso únicamente con un pago de prueba aprobado y una comanda asociada.

## 7. Seguridad

El acceso de cliente sigue siendo el mecanismo existente basado en nombre, apellido y teléfono; no se agregó OTP. El teléfono no demuestra por sí solo la titularidad de una cuenta. Antes de exponer historial y reembolsos a producción, se recomienda verificar el número mediante OTP por SMS o WhatsApp.
