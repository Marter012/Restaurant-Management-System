# Cambios FrontEnd Store – noviembre 2026

## Cambios incluidos

- Al cargar el Store se muestra un modal breve de estado operativo. El estado abierto/cerrado se determina con `cash_register_open`; el texto también informa si las ventas online están habilitadas mediante `public_sales_enabled`.
- El catálogo continúa visible aunque el comercio esté cerrado. La confirmación de compra sigue bloqueada desde el Store cuando `public_sales_enabled` o `cash_register_open` no habilitan ventas.
- La grilla de productos ahora muestra cinco columnas en desktop, cuatro en pantallas medianas, tres en tablet y dos en móvil. Se redujo la proporción de imagen, tipografía, espaciado y controles para compactar las tarjetas.
- Las promociones son seleccionables. Al elegir una se abre un modal que lee `promotion.items[]` y `product_ids`, filtra los productos permitidos por cada grupo y permite completar exactamente la cantidad solicitada.
- Si un grupo de promoción tiene un solo producto disponible, se completa automáticamente la cantidad requerida. Si tiene varias alternativas, el cliente distribuye las unidades entre ellas.
- Las promociones destacadas del inicio siguen llegando desde `featured` y se limitan a tres. Los productos destacados siguen llegando desde `featured`.
- El encabezado de Mi cuenta utiliza el nombre recibido desde `/public/store`; no se fija el nombre de otra marca.
- En Mi cuenta se pueden editar nombre, apellido y dirección. El botón «Guardar datos» aparece solamente cuando hay cambios y guarda mediante `PUT /public/customers/me`.

## Contratos de API utilizados

- `GET /public/store`: `name`, `cash_register_open`, `public_sales_enabled`.
- `GET /public/products`: productos con `featured`, `id`, `category` y `available`.
- `GET /public/promotions`: promociones con `featured`, `items[].name`, `items[].quantity` e `items[].product_ids`.
- `PUT /public/customers/me`: `first_name`, `last_name`, `location`.

## Nota sobre el teléfono

El teléfono se muestra en la ficha, pero queda de solo lectura porque el contrato actual del Backend declara el teléfono como identificador inmutable de la cuenta. Para permitir cambiarlo con seguridad habría que implementar una operación específica de cambio y reasignación/verificación del identificador; no se simula esa capacidad desde el Frontend.

## Prueba local

```bash
npm ci
npm run build
npm run dev
```

El chequeo TypeScript (`tsc -b`) se ejecutó correctamente. En el entorno de preparación, Vite no pudo iniciar el bundler porque faltaba el binding nativo opcional de Rolldown para Linux; `npm ci` en el entorno de despliegue debe instalar las dependencias opcionales correspondientes.
