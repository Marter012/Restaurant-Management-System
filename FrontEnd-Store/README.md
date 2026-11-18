# Boutique de Sabores — FrontEnd Store

Tienda pública de Boutique de Sabores. Aplicación React + TypeScript + Vite, conectada al Backend FastAPI.

## Requisitos

- Node.js 22.12+ (compatible con Vite 8).
- Backend FastAPI desplegado y accesible por HTTPS.
- MongoDB configurado en el Backend.

## Instalación local

```bash
npm ci
```

Copiar `.env.example` a `.env` y configurar `VITE_API_URL` con la URL base del Backend, sin barra final.

```bash
npm run dev
```

El servidor de desarrollo usa el puerto `5174`.

## Funcionalidades

- Catálogo responsive con filtros por categoría, disponibilidad y orden.
- Búsqueda insensible a mayúsculas y acentos sobre todos los datos del producto recibidos del Backend: nombre, descripción, categoría, ingredientes, guarniciones, identificadores y demás campos.
- Productos destacados, promociones, imágenes, logotipo y textos configurables desde Gestión.
- Carrito persistente, personalización de productos y checkout responsive.
- Pago con Mercado Pago mediante preferencia generada por el Backend.
- Pedido por WhatsApp como canal independiente, sin crear un pedido administrativo.
- Navegación superior para escritorio y navegación adaptada a móviles.
- Cuenta de cliente con historial de compras aprobadas.
- Solicitud de reembolso desde el historial del cliente.
- Iconografía de todo el Store mediante nombres originales de `@phosphor-icons/react`.

## Cuenta de cliente y compras como invitado

La cuenta se identifica con nombre, apellido y teléfono. El Store usa el endpoint `POST /public/customers/access`.

No es obligatorio crear una cuenta para comprar. Si un cliente compra como invitado, el pedido se crea con el teléfono indicado en el checkout. Cuando posteriormente crea o accede a su cuenta con ese mismo teléfono, el Backend normaliza ambos números (conserva solo los dígitos) y vincula las compras de invitado que todavía no tengan `customer_id`.

Por eso, para recuperar compras anteriores, el cliente debe ingresar el mismo número utilizado al comprar. El historial consulta `GET /public/customers/me/orders` con el token Bearer de la sesión.

La sesión del Backend tiene una duración de 10 minutos. El Store respeta esa expiración y solicita volver a ingresar cuando vence.

## Reembolsos

El Store no devuelve dinero directamente ni llama a Mercado Pago. El botón de la cuenta envía una solicitud al Backend mediante:

```http
POST /public/customers/me/orders/{order_number}/refund
Authorization: Bearer <customer_token>
```

El botón solo se muestra para compras con pago aprobado y estado operativo vinculado a una comanda. La solicitud queda registrada como `refund_status: requested` y el Backend notifica a Gestión. El comercio procesa el reembolso desde su FrontEnd de Gestión; allí se ejecuta el reembolso de Mercado Pago y la sincronización administrativa.

Estados que muestra la cuenta:

- `requested`: solicitud recibida por el comercio.
- `processing`: reembolso en proceso.
- `refunded_needs_sync`: Mercado Pago aceptó el reintegro y el Backend está sincronizando.
- `refunded`: reembolso completado.

## API utilizada

| Acción | Método y endpoint |
|---|---|
| Configuración pública | `GET /public/store` |
| Catálogo | `GET /public/products` |
| Ingredientes no disponibles | `GET /public/unavailable-ingredients` |
| Promociones | `GET /public/promotions` |
| Crear pedido online | `POST /public/online-orders` |
| Crear / acceder a cuenta | `POST /public/customers/access` |
| Perfil de cliente | `GET /public/customers/me` |
| Historial de compras | `GET /public/customers/me/orders` |
| Solicitar reembolso | `POST /public/customers/me/orders/{order_number}/refund` |

## Variables de entorno

| Variable | Uso |
|---|---|
| `VITE_API_URL` | URL base HTTPS del Backend |
| `VITE_API_WS_URL` | Reservada para la conexión WebSocket cuando corresponda |
| `VITE_STORE_PREVIEW_URL` | URL de vista previa del Store |

No incluir credenciales privadas en variables `VITE_*`: Vite las incorpora al bundle público. El token privado de Mercado Pago debe permanecer exclusivamente en el Backend.

## Pago online

El Store envía identificadores y cantidades de productos. El Backend vuelve a consultar productos, disponibilidad y precios y calcula el total. El navegador se redirige a Mercado Pago con la URL de checkout devuelta por la API. El estado pagado se confirma mediante el webhook del Backend, no mediante la página de retorno.

Para activar pagos reales, configurar en el Backend `MERCADOPAGO_ACCESS_TOKEN`, `STORE_FRONTEND_URL` y `PUBLIC_API_URL`, además del webhook de Mercado Pago.
