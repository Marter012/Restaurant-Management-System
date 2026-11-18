# Organización del FrontEnd-Store

El proyecto mantiene la estructura por componentes, hooks, servicios, utilidades y estilos. La implementación actual incorpora la cuenta de cliente, historial, solicitud de reembolso, búsqueda ampliada y navegación responsive.

## Estructura

- `components/`: componentes visuales por dominio (Account, Cart, Catalog, Checkout, Feedback, Layout y Product).
- `components/*/*Styles.ts`: estilos encapsulados en styled-components separados del JSX.
- `hooks/`: estado y lógica reutilizable del catálogo, carrito, checkout y datos de tienda.
- `services/publicApi.ts`: comunicación HTTP con los endpoints públicos del Backend.
- `types/`: contratos TypeScript del Store.
- `utils/`: iconos Phosphor, sesión de cliente, imágenes, carrito, dinero y WhatsApp.
- `styles/`: estilos globales y primitivas visuales compartidas.
- `constants/`: claves de almacenamiento y constantes del checkout.

## Instalación y actualización

1. Hacer una copia de seguridad de la carpeta `FrontEnd-Store`.
2. Reemplazar su contenido con este ZIP.
3. No copiar `node_modules`; ejecutar `npm ci`.
4. Crear `.env` desde `.env.example` y definir `VITE_API_URL`.
5. Ejecutar `npm run build` antes de publicar.

Se conserva la clave `CART_STORAGE_KEY` para mantener el carrito local existente. Las compras por WhatsApp continúan siendo un canal independiente; los pagos con Mercado Pago y la vinculación de órdenes se gestionan desde el Backend.

Para los contratos de cuenta y reembolsos, consultar `IMPLEMENTACION_FRONTEND_STORE.md`.
