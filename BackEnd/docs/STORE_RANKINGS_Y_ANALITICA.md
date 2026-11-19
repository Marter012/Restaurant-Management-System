# Rankings y destacados del Store

## Responsabilidades
- FrontEnd-Management configura los modos desde `PUT /settings/store` (autenticado como administrador).
- FrontEnd-Store consume `GET /public/products` y `GET /public/promotions`; ambos mantienen sus contratos y agregan `featured` y `highlight_mode`.
- Los cálculos se realizan en `SalesAnalyticsService`; las consultas Mongo están en `SalesAnalyticsRepository`.

## Configuración
- `product_highlight_mode`: `manual` o `best_selling`.
- `promotion_highlight_mode`: `manual` o `best_selling`.
- `ranking_period_days`: días hacia atrás; `0` significa todo el historial.
- `ranking_limit`: máximo de elementos destacados (1 a 50).
- Los modos manuales conservan `featured_product_ids` y `enabled_promotion_ids` existentes.

## Criterio de ventas
Se cuentan ítems de comandas con `status_payment=paid` y `status != false`. Se excluyen comandas canceladas/no pagadas y extras. Los productos se rankean por unidades vendidas; las promociones por unidades de promoción vendidas. El ingreso se devuelve como métrica secundaria.

## Endpoints de consulta analítica
- `GET /public/analytics/products?period_days=30&limit=8`
- `GET /public/analytics/promotions?period_days=30&limit=8`

Los endpoints analíticos públicos son de solo lectura. La configuración se modifica desde Gestión mediante `PUT /settings/store`.
