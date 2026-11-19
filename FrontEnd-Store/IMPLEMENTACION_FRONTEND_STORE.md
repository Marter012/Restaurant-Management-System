# FrontEnd Store — navegación por secciones, cuenta e historial

## Navegación

La tienda usa renderización por secciones React con rutas visibles:

- `/` — Inicio.
- `/productos` — Catálogo completo.
- `/promociones` — Todas las promociones vigentes.
- `/cuenta` — Cuenta del cliente.

La navegación inferior cambia la vista sin recargar la aplicación. Se conserva el botón superior derecho del carrito. Se agregó `vercel.json` para que las rutas internas carguen correctamente al abrirlas directamente o actualizar el navegador.

## Inicio y destacados

- Inicio muestra el banner configurado desde Gestión.
- Productos destacados se alimentan de `featured` recibido en `GET /public/products`.
- Inicio muestra como máximo tres promociones activas con `featured: true`.
- `/promociones` muestra todas las promociones activas.

El Backend complementario incorpora `featured_promotion_ids` en la configuración Store. La pantalla de Gestión debe guardar los IDs seleccionados en ese campo para que el comercio administre explícitamente las promociones destacadas. Como compatibilidad, si todavía no hay IDs en ese campo, el Backend usa `enabled_promotion_ids` como selección heredada.

## Cuenta

- Cuenta es una página completa; ya no se renderiza como modal.
- El inicio de sesión solicita únicamente el teléfono.
- Si el teléfono ya existe, el Backend devuelve los datos guardados.
- Si no existe, crea la cuenta con nombre y apellido vacíos.
- La columna izquierda muestra teléfono, nombre y apellido (y dirección si existe).
- La columna derecha muestra tarjetas de pedidos con fecha, total, método/proveedor de pago, estado del pago y modalidad.
- Al seleccionar una tarjeta se abre un modal de detalle del pedido con productos, cantidades, guarniciones, ingredientes quitados, notas, envío/retiro, dirección, horario, promociones aplicadas y total.
- Se conserva la solicitud de reembolso cuando el estado del pedido y del pago lo permiten.
- No se utiliza OTP ni se requieren credenciales de Twilio.

## Historial

El Frontend ahora presenta el error real devuelto por la API y permite reintentar la carga, en lugar de mostrar únicamente un mensaje genérico. El Backend complementario amplía el DTO del historial para devolver los datos requeridos por las tarjetas y el modal de detalle.

También se corrigió en el repositorio del Backend el ordenamiento de pedidos históricos cuando `created_at` está mezclado entre valores `datetime` y cadenas ISO. Comparar directamente ambos tipos podía producir un `TypeError` y hacer fallar la carga completa del historial.

## Instalación

1. Respaldar el FrontEnd-Store actual.
2. Reemplazarlo por el contenido de este ZIP.
3. Ejecutar `npm ci`.
4. Configurar `VITE_API_URL` con la URL base del Backend, sin `/public` al final.
5. Ejecutar `npm run build` y desplegar.

## Variables

No se necesitan variables de Twilio. Mantener únicamente las variables existentes del Store, por ejemplo `VITE_API_URL`.

## Verificación pendiente en el entorno del proyecto

Los archivos fuente se actualizaron. En este entorno no se pudo ejecutar `npm run build` porque el ZIP no incluye `node_modules` y la instalación de dependencias no terminó dentro del tiempo disponible. Ejecutar `npm ci` en el equipo local o en CI y luego `npm run build` antes del despliegue.
