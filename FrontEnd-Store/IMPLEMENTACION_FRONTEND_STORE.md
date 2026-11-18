# Implementación — FrontEnd Store BoutiqueSabores

## Cambios entregados

### Identidad visual y navegación
- Se incorporó el encabezado principal que estaba definido pero no se renderizaba desde `App`.
- El encabezado muestra el logotipo configurado en Gestión y utiliza un ícono Phosphor de respaldo si la URL de la imagen falla.
- La navegación se adapta a escritorio y móvil; se corrigió la duplicación de encabezados en pantallas pequeñas.
- Se agregó acceso a Mi cuenta en el encabezado y se conserva el acceso inferior en móviles.

### Catálogo y búsqueda
- Filtro horizontal por todas las categorías recibidas desde el Backend.
- Filtro de disponibilidad, orden y limpieza de filtros.
- La búsqueda consulta todos los valores del objeto de producto entregado por el API, incluyendo nombre, descripción, categoría, ingredientes, guarniciones, identificadores y campos futuros.
- Búsqueda sin distinguir mayúsculas ni acentos y con coincidencia de todos los términos ingresados.

### Cuenta e historial
- La cuenta usa el contrato real del Backend: `POST /public/customers/access`, con `first_name`, `last_name` y `phone`.
- No se exige ubicación para crear o acceder a la cuenta porque el esquema del Backend no la requiere.
- El historial usa `GET /public/customers/me/orders` con token Bearer.
- La sesión respeta los 600 segundos informados por el Backend.
- El acceso a cuenta informa que las compras invitadas anteriores se recuperan usando el mismo teléfono.

### Compras como invitado
- Se conserva la posibilidad de finalizar una compra sin cuenta.
- Se corrigió el flujo de “Continuar como invitado”: ya no borra nombre, teléfono y datos del checkout antes de enviar el pago o abrir WhatsApp.
- El Backend de la versión implementada asocia al iniciar sesión las órdenes invitadas cuyo teléfono normalizado coincide con el teléfono de la cuenta.

### Reembolsos
- El historial muestra el botón para compras con pago aprobado y estados que indican que la comanda ya está vinculada (`paid`, `preparing`, `ready`, `delivered`).
- El botón abre una confirmación propia del Store y envía `POST /public/customers/me/orders/{order_number}/refund` con el token Bearer.
- La interfaz deja claro que el cliente solicita el reembolso; no se ejecuta el reintegro desde el navegador. Gestión recibe la solicitud y el administrador procesa el reembolso desde su flujo.
- Se muestran los estados `requested`, `processing`, `refunded_needs_sync` y `refunded`.

### Iconografía y estructura
- Todos los íconos del FrontEnd-Store utilizan exports nativos de `@phosphor-icons/react`.
- Se eliminaron los alias `Fa*`, `Md*`, `Io*`, `Ri*`, `Fi*` y cualquier import de `react-icons`.
- Los estilos de cuenta, confirmación de registro y navegación inferior se separaron a archivos `*Styles.ts`.

## Contrato de Backend verificado

Esta implementación está alineada con las rutas presentes en la versión de Backend previamente entregada:

- `GET /public/store`
- `GET /public/products`
- `GET /public/unavailable-ingredients`
- `GET /public/promotions`
- `POST /public/online-orders`
- `POST /public/customers/access`
- `GET /public/customers/me/orders`
- `POST /public/customers/me/orders/{order_number}/refund`

El Backend de Gestión procesa la devolución real en `POST /online-orders/{order_id}/refund`. El Store no llama a esa ruta administrativa ni expone credenciales de Mercado Pago.

## Configuración para Vercel

Configurar la variable de entorno:

`VITE_API_URL=https://api-restaurant-management-system.onrender.com`

Aplicarla a Production y Preview según corresponda y volver a desplegar. La URL debe ser la base del Backend, sin `/public` al final.

No subir `.env` al repositorio. El ZIP incluye `.env.example`; crear el `.env` local a partir de ese ejemplo.

## Verificaciones

- `tsc -b`: ejecutado correctamente sin errores de TypeScript.
- Escaneo de `src`: no quedan nombres de íconos con prefijos de React Icons ni imports de `react-icons`.
- La compilación Vite no pudo completarse en este entorno de trabajo porque el `node_modules` incluido en el ZIP original no contiene el binding nativo opcional de Rolldown para Linux (`@rolldown/binding-linux-x64-gnu`). El `package-lock.json` sí declara ese paquete opcional. En Vercel debe realizarse una instalación limpia con `npm ci` para resolver las dependencias de la plataforma.

## Importante sobre seguridad

El contrato actual de cuenta del Backend identifica al cliente por nombre, apellido y teléfono y mantiene la sesión durante 10 minutos. No incluye verificación OTP. Para producción con historial de compras y solicitudes de reembolso, es recomendable incorporar verificación por SMS o WhatsApp en el Backend.
