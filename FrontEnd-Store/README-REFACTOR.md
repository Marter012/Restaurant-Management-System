# FrontEnd Store — estructura refactorizada

La refactorización reorganiza la capa visual sin reemplazar los flujos de negocio ni los contratos HTTP existentes.

## Estructura principal

- `src/main.tsx`: punto de entrada de React; monta estilos globales y `App`.
- `src/App.tsx`: orquestación del estado de tienda, carrito, checkout, sesión, pagos y acciones.
- `src/components/Page/`: contenedor raíz compartido por todas las vistas. `Page.tsx` decide qué vista mostrar (Inicio, Productos, Promociones o Cuenta) y `Page.styles.ts` centraliza el contenedor visual común.
- `src/components/<Componente>/`: cada componente visual vive en su propia carpeta. Cuando corresponde, incluye `<Componente>.tsx` y `<Componente>.styles.ts`.
- `src/hooks/`: estado y lógica reutilizable de tienda, carrito, selección, checkout y navegación.
- `src/services/`: comunicación con el backend. `publicApi.ts` conserva los endpoints públicos.
- `src/styles/`: estilos globales y primitivas compartidas (modales, botones, campos, avisos, etc.).
- `src/types/`: contratos TypeScript.
- `src/utils/` y `src/constants/`: funciones auxiliares y constantes.

## Convenciones

1. Los componentes visuales se mantienen pequeños y separados por responsabilidad.
2. Los estilos propios se ubican en el archivo `.styles.ts` de su componente.
3. Los estilos reutilizables/globales permanecen en `src/styles/`.
4. Cada carpeta de componente contiene como máximo tres archivos; la mayoría contiene el TSX y su archivo de estilos.
5. Las vistas se centralizan en `Page`; para cambiar el contenedor común de las pestañas se modifica `Page.styles.ts`.
6. La lógica de negocio, hooks, utilidades y endpoints no se trasladan a los componentes de presentación.

## Endpoints públicos conservados

`src/services/publicApi.ts` mantiene las rutas y métodos originales:

- `GET /public/store`
- `GET /public/products`
- `GET /public/unavailable-ingredients`
- `GET /public/promotions`
- `POST /public/online-orders`
- `POST /public/customers/access`
- `GET /public/customers/me`
- `PUT /public/customers/me`
- `GET /public/customers/me/orders`
- `POST /public/customers/me/orders/{order_number}/refund`

No se cambió el payload de pedidos, autenticación, historial ni solicitudes de reembolso.

## Instalación y validación

1. Crear `.env` a partir de `.env.example` y configurar `VITE_API_URL`.
2. Ejecutar `npm ci`.
3. Ejecutar `npm run dev`.
4. Antes de publicar, ejecutar `npm run build`.

El chequeo de TypeScript (`tsc -b`) se ejecutó correctamente tras la reorganización. En el entorno de preparación, Vite no pudo ejecutarse porque el `node_modules` incluido en el ZIP original carecía del binding nativo opcional de Rolldown; por eso se recomienda instalar dependencias limpias con `npm ci` y no reutilizar `node_modules`.
