<div align="center">

# ⚙️ Backend — Boutique de Sabores
### API REST y lógica de negocio

![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-Backend-3776AB?logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Persistencia-47A248?logo=mongodb&logoColor=white)

</div>

---

## 📌 Objetivo

El Backend expone la API de gestión de Boutique de Sabores. Recibe solicitudes HTTP, autentica y autoriza usuarios, valida los datos con Pydantic, ejecuta servicios de negocio y accede a MongoDB.

## 🧱 Arquitectura interna

```text
BackEnd/
├── app/
│   ├── api/
│   │   ├── dependencies/   # Autenticación y autorización
│   │   └── routes/         # Endpoints REST por recurso
│   ├── config/             # Variables y settings
│   ├── database/           # Cliente MongoDB, índices, inicialización
│   ├── repositories/       # Acceso a colecciones
│   ├── schema/             # Modelos de entrada y salida
│   ├── services/           # Reglas de negocio
│   ├── websocket/          # Eventos y conexión en tiempo real
│   ├── utils/              # Utilidades y manejadores
│   └── main.py             # Aplicación FastAPI
└── requirements.txt
```

## 🛠️ Tecnologías

- Python.
- FastAPI y Uvicorn.
- Pydantic y pydantic-settings.
- Motor / PyMongo para MongoDB.
- JWT y utilidades de hash de contraseñas.
- WebSocket para difundir eventos de cambios.

Las versiones de dependencias están en `requirements.txt`.

## ✅ Requisitos

- Python compatible con `requirements.txt`.
- MongoDB accesible desde el entorno.
- Variables de entorno completas.
- Puerto de API libre (Uvicorn usa normalmente `8000`).

## 🚀 Instalación local

Desde la carpeta `BackEnd/`:

```bash
python -m venv .venv
```

Activación en Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Activación en Windows CMD:

```bat
.venv\Scripts\activate.bat
```

Instalar dependencias:

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Crear el archivo `.env` en `BackEnd/`. No copiar credenciales reales a la documentación ni al control de versiones.

Ejecutar:

```bash
uvicorn app.main:app --reload
```

La API suele quedar en `http://127.0.0.1:8000`. Confirmá el host/puerto que informa Uvicorn.

## 🔐 Configuración del entorno

El archivo `app/config/settings.py` exige estas variables:

| Variable | Descripción |
|---|---|
| `MONGO_URL` | URI de conexión de MongoDB. |
| `MONGO_DB_NAME` | Base de datos de la aplicación. |
| `SECRET_KEY` | Secreto para la firma de tokens. Debe ser privado y robusto. |
| `MAILERSEND_API_KEY` | Credencial del proveedor de correo. |
| `MAILERSEND_FROM_EMAIL` | Remitente configurado para correo. |
| `INITIAL_ADMIN_USERNAME` | Usuario inicial de administración. |
| `INITIAL_ADMIN_EMAIL` | Correo inicial de administración. |
| `INITIAL_ADMIN_PASSWORD` | Contraseña inicial. Usar una contraseña única y robusta. |

Ejemplo de estructura **sin valores reales**:

```dotenv
MONGO_URL=
MONGO_DB_NAME=
SECRET_KEY=
MAILERSEND_API_KEY=
MAILERSEND_FROM_EMAIL=
INITIAL_ADMIN_USERNAME=
INITIAL_ADMIN_EMAIL=
INITIAL_ADMIN_PASSWORD=
```

El archivo `.env` no debe versionarse ni compartirse. El arranque de FastAPI ejecuta la creación de índices y la inicialización del administrador.

## 🧭 Endpoints principales

Los prefijos siguientes se identifican en los routers del código. Consultá `/docs` para confirmar métodos, parámetros y modelos completos.

| Prefijo | Función |
|---|---|
| `/` | Comprobación básica de que la API está funcionando. |
| `/auth` | Inicio de sesión, refresh, perfil y recuperación de contraseña. |
| `/product` | Consulta, creación y actualización de productos. |
| `/order` | Consulta, creación y actualización de comandas. |
| `/cashRegister` | Operaciones de caja. |
| `/cashMovement` | Movimientos de caja. |
| `/promotion` | Promociones. |
| `/stockMovement` | Movimientos de stock y ajuste masivo. |
| `/user` | Administración de usuarios. |
| `/settings` | Configuración operativa. |
| `/audit` | Actividad reciente/auditoría. |

La mayoría de las rutas de recursos requiere autenticación. La gestión de usuarios, la auditoría, la actualización de configuración y el ajuste masivo de stock tienen restricciones administrativas según el código.

## 🔄 Persistencia y ciclo de solicitud

1. FastAPI recibe la solicitud.
2. Las dependencias resuelven autenticación y autorización.
3. Pydantic valida el cuerpo y parámetros.
4. El router delega el trabajo al servicio.
5. El servicio utiliza repositorios y colecciones de MongoDB.
6. La API responde con el modelo de salida.
7. Cuando corresponde, se registra auditoría y se emite un evento WebSocket.

## 📡 WebSocket

El Backend incluye un router WebSocket. Las rutas que crean o actualizan recursos pueden difundir un evento con el recurso, la acción, los datos y el identificador del cliente de origen. Revisá `app/websocket/` y cada router para conocer los eventos concretos.

## 🌐 CORS

La configuración de CORS se define en `app/main.py`. Para un despliegue diferente, agregá únicamente los orígenes frontend autorizados y necesarios. En producción, evitá ampliar el acceso de manera indiscriminada.

## 🧪 Verificación

Con la API activa:

- `GET /` debe devolver el mensaje de API funcionando.
- `/docs` muestra el contrato interactivo.
- `/redoc` presenta la documentación alternativa.
- Probá endpoints protegidos con un token válido y comprobá el comportamiento de roles.

## 🧯 Errores frecuentes

- **No inicia por configuración:** comprobar que todas las variables obligatorias estén definidas.
- **MongoDB no conecta:** verificar URI, nombre de base, red, permisos y disponibilidad.
- **401 Unauthorized:** token ausente, inválido o vencido.
- **403 Forbidden:** el usuario no tiene el rol requerido.
- **422 Unprocessable Entity:** datos incompatibles con el esquema de entrada.
- **CORS:** revisar origen exacto, protocolo y puerto del Frontend.
- **Eventos ausentes:** comprobar el router WebSocket y la emisión en la ruta correspondiente.

## 🔒 Buenas prácticas

- No registrar contraseñas, tokens ni claves.
- Usar HTTPS en producción.
- Mantener dependencias actualizadas y revisadas.
- Restringir credenciales y permisos de MongoDB.
- Hacer copias de seguridad y comprobar su restauración.
- No modificar los contratos de API sin actualizar el Frontend y esta documentación.

---

[← Volver al README principal](../README.md)
