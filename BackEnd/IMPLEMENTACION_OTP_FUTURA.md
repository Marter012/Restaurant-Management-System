# Store sin OTP (OTP preparado, desactivado)

## Comportamiento actual
- El cliente ingresa su número de teléfono para acceder a su cuenta.
- El teléfono es obligatorio; nombre y apellido son opcionales.
- No se solicita ni se envía ningún código de verificación.
- El Backend crea o recupera la cuenta mediante `POST /public/customers/access`.
- Se conservan el token de sesión, historial de pedidos y asociación de pedidos por teléfono.

## Endpoints de cuenta
- `POST /public/customers/access`: crea o inicia sesión por teléfono.
- `POST /public/customers/register`: registro explícito, rechaza teléfonos existentes.
- `GET /public/customers/me`: obtiene el perfil de la sesión.
- `PUT /public/customers/me`: actualiza datos editables.
- `GET /public/customers/me/orders`: historial.
- `POST /public/customers/me/orders/{order_number}/refund`: solicitud de reembolso.

## OTP reservado para una futura etapa
Se agregó `app/services/otp/` con:
- `otp_provider.py`: contrato común.
- `otp_service.py`: orquestador deshabilitado por defecto.
- `providers/textbee_provider.py`
- `providers/twilio_provider.py`
- `providers/telegram_provider.py`

La variable `OTP_PROVIDER` queda en `disabled`. Ninguna ruta ni flujo de autenticación importa o invoca `otp_service`. Los adaptadores son esqueletos deliberados, no integraciones funcionales todavía.

Para activar OTP en el futuro habrá que implementar el proveedor elegido, agregar límites de frecuencia y protección contra abuso, y conectar explícitamente el flujo de solicitud/verificación a las rutas. No alcanza con cambiar la variable de entorno.

## Advertencia de seguridad
Mientras OTP esté desactivado, conocer el número de teléfono puede ser suficiente para acceder a la cuenta y consultar su historial. Esta modalidad se deja habilitada temporalmente según lo solicitado. No se recomienda para información sensible ni para una tienda con datos personales expuestos.

## Configuración
No se requieren credenciales Twilio, TextBee ni Telegram. En `.env`:
`OTP_PROVIDER=disabled`
