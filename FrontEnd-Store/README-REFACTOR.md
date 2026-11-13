# Refactor de FrontEnd-Store

Este paquete contiene el proyecto FrontEnd-Store reorganizado. Mantiene el servicio API, tipos, estilos globales, configuración Vite y dependencias existentes; divide la interfaz y la lógica en componentes, hooks, utilidades y constantes.

## Aplicación de los cambios

1. Hacé una copia de seguridad de tu carpeta `FrontEnd-Store`.
2. Descomprimí este ZIP.
3. Reemplazá el contenido de tu carpeta `FrontEnd-Store` por el contenido del ZIP (no copies `node_modules`; no está incluido).
4. Conservá tu `.env` local si no está incluido en el proyecto original.
5. Desde `FrontEnd-Store`, ejecutá `npm install` si fuera necesario y luego `npm run build`.

## Organización

- `components/`: componentes de interfaz; cada componente tiene su archivo `.styles.ts` local cuando requiere estilos propios.
- `styles/AppStyles.ts`: únicamente primitivas compartidas entre componentes (diálogos, botones, campos, overlay y avisos).
- `hooks/`: estado y lógica reutilizable.
- `services/`: comunicación con el backend, sin cambios de endpoints.
- `utils/`: formato de dinero, imágenes, carrito y construcción del enlace de WhatsApp.
- `constants/`: clave de almacenamiento y métodos de pago.

## Notas

- Se conserva `CART_STORAGE_KEY` para no perder el carrito existente guardado en LocalStorage.
- El pedido continúa enviándose a WhatsApp; no se crea una comanda en el backend.
- Se mantienen las validaciones del número, nombre, pago y horario de retiro.
- No se modificaron `publicApi.ts`, los tipos ni los endpoints.
