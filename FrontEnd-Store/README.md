# Boutique de Sabores — Store

Tienda pública para clientes, conectada al backend central de Boutique de Sabores.

## Requisitos

- Node.js compatible con Vite 8.
- Backend FastAPI disponible.
- MongoDB configurado en el backend.

## Instalación

```bash
npm ci
```

Copiar `.env.example` como `.env` y configurar `VITE_API_URL` con la URL base del backend, sin barra final.

```bash
npm run dev
```

El servidor de desarrollo usa el puerto `5174`.

## Funcionalidades

- Catálogo público con búsqueda, categorías, disponibilidad, extras y personalización de productos.
- Productos destacados seleccionados desde Gestión.
- Promociones activas publicadas desde Gestión.
- Hero, logo, textos e identidad visual configurables desde Gestión.
- Carrito persistente y checkout responsive.
- Pago online mediante preferencia de Mercado Pago generada por el backend.
- Pedido por WhatsApp como canal independiente, sin crear registros en Gestión.
- Navegación lateral en escritorio y menú hamburguesa en pantallas pequeñas.

## Pago online

El Store envía al backend los identificadores y cantidades de productos; el backend vuelve a consultar productos y precios y calcula el total. El navegador se redirige a Mercado Pago con la URL de checkout devuelta por la API. El estado pagado se confirma mediante el webhook del backend, no mediante la página de retorno.

Para activar pagos reales se requiere configurar `MERCADOPAGO_ACCESS_TOKEN`, `STORE_FRONTEND_URL` y `PUBLIC_API_URL` en el backend, además de registrar el webhook en Mercado Pago.
