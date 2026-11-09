# Boutique de Sabores — Tienda para clientes

Aplicación independiente de catálogo y preparación de pedidos. No crea comandas en el backend: el cliente arma el pedido y lo envía a WhatsApp para que el establecimiento lo revise y lo cargue manualmente en el sistema de gestión.

## Requisitos

- Node.js compatible con Vite 8.
- Backend Boutique de Sabores actualizado con las rutas públicas incluidas en `Backend-Patch`.

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

En Windows, creá `.env` manualmente copiando `.env.example`.

Configurá `VITE_API_URL` con la URL base del backend, sin barra final.

## Compilar

```bash
npm run build
npm run preview
```

## Funcionalidades

- Catálogo público de productos activos.
- Búsqueda por nombre/descripción y filtros por categoría.
- Precio efectivo entregado por el backend, con descuento individual prioritario sobre el general.
- Opciones de guarnición, ingredientes no disponibles y notas por producto.
- Carrito persistente en `localStorage`.
- Checkout con nombre, método de pago, horario de retiro y observaciones.
- Enlace `wa.me` con mensaje prearmado y número comercial administrado desde el FrontEnd de gestión.
- Diseño responsive para escritorio, tablet y móvil.
- Estado de tienda cerrada según `public_sales_enabled`.

## Endpoints públicos consumidos

- `GET /public/store`
- `GET /public/products`
- `GET /public/unavailable-ingredients`

El cliente no consulta rutas administrativas ni crea órdenes.

## Número de WhatsApp

Se administra desde el FrontEnd de gestión, en Configuración general → WhatsApp de pedidos. Ingresar el teléfono en formato internacional con código de país y área, por ejemplo `5493511234567`.

El cliente abre WhatsApp con el mensaje preparado. Por las restricciones de WhatsApp, el cliente debe presionar **Enviar**; la aplicación no envía mensajes automáticamente.

## CORS y despliegue

En desarrollo, el backend ya contempla `http://localhost:5174` y `http://127.0.0.1:5174`. Al desplegar la tienda, agregá su dominio exacto a `allow_origins` en `BackEnd/app/main.py`.

## Consideraciones

- El carrito se conserva localmente en el navegador y no se guarda en MongoDB.
- El total y los precios visibles provienen de la respuesta del backend; el mensaje se compone con esos valores.
- El pedido enviado por WhatsApp queda pendiente de confirmación y no se registra como comanda automáticamente.
- La hora de retiro se solicita como hora local del día. La tienda no tiene todavía reglas de horarios de apertura/cierre ni cupos de retiro.
