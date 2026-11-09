<div align="center">

# ⚙️ Backend — Boutique de Sabores

### API REST y lógica de negocio

![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-Backend-3776AB?logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Persistencia-47A248?logo=mongodb&logoColor=white)

</div>

---

## 📌 Objetivo

El Backend de Boutique de Sabores expone la API encargada de gestionar las operaciones del establecimiento.

Recibe solicitudes HTTP, autentica y autoriza usuarios, valida información mediante Pydantic, ejecuta reglas de negocio y administra la persistencia de datos en MongoDB.

También proporciona comunicación en tiempo real mediante WebSockets y centraliza las configuraciones operativas y comerciales del establecimiento.

## 🧱 Arquitectura interna

```text
BackEnd/
├── app/
│   ├── api/
│   │   ├── dependencies/       # Autenticación y autorización
│   │   └── routes/             # Endpoints REST por recurso
│   ├── config/                 # Variables y configuración
│   ├── database/               # Cliente MongoDB, índices e inicialización
│   ├── repositories/           # Acceso a colecciones
│   ├── schema/                 # Modelos de entrada y salida
│   ├── services/               # Reglas de negocio
│   ├── websocket/              # Eventos y conexiones en tiempo real
│   ├── utils/                  # Utilidades y manejadores
│   └── main.py                 # Aplicación FastAPI
└── requirements.txt
```

## 🛠️ Tecnologías

- Python.
- FastAPI y Uvicorn.
- Pydantic y pydantic-settings.
- Motor / PyMongo para MongoDB.
- JWT para autenticación.
- Hash de contraseñas.
- WebSockets para comunicación en tiempo real.
- MailerSend para servicios de correo.

Las versiones de las dependencias se encuentran en `requirements.txt`.

## ✅ Requisitos

- Python compatible con las dependencias del proyecto.
- MongoDB accesible desde el entorno.
- Variables de entorno correctamente configuradas.
- Puerto de API disponible (Uvicorn utiliza normalmente el puerto `8000`).

## 🚀 Instalación local

Desde la carpeta `BackEnd/`:

Crear entorno virtual:

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

Crear el archivo `.env` en la raíz de `BackEnd/`.

Ejecutar el servidor:

```bash
uvicorn app.main:app --reload
```

La API estará disponible normalmente en:

```text
http://127.0.0.1:8000
```

Documentación interactiva:

```text
http://127.0.0.1:8000/docs
```

## 🔐 Configuración del entorno

El archivo `app/config/settings.py` requiere las siguientes variables:

| Variable | Descripción |
|---|---|
| `MONGO_URL` | URI de conexión de MongoDB. |
| `MONGO_DB_NAME` | Nombre de la base de datos. |
| `SECRET_KEY` | Clave privada para firmar tokens. |
| `MAILERSEND_API_KEY` | Credencial del proveedor de correo. |
| `MAILERSEND_FROM_EMAIL` | Correo remitente. |
| `INITIAL_ADMIN_USERNAME` | Usuario inicial administrador. |
| `INITIAL_ADMIN_EMAIL` | Correo del administrador inicial. |
| `INITIAL_ADMIN_PASSWORD` | Contraseña inicial del administrador. |

Ejemplo de estructura:

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

**Importante:** el archivo `.env` contiene credenciales privadas y no debe subirse al repositorio.

Al iniciar FastAPI se ejecutan la creación de índices y la inicialización del administrador.

---

# ⚙️ Configuración del establecimiento

El backend incorpora configuraciones centralizadas que permiten administrar diferentes aspectos comerciales y operativos de Boutique de Sabores.

Estas configuraciones se almacenan en MongoDB, dentro de la colección `app_settings`.

### 1. Identidad del establecimiento

Permite definir el nombre comercial del establecimiento.

Características:

- Consultar el nombre configurado.
- Modificar el nombre.
- Compartir la información con otros FrontEnds.

Endpoints:

| Método | Endpoint | Función |
|---|---|---|
| GET | `/settings/establishment` | Consultar establecimiento. |
| PUT | `/settings/establishment` | Actualizar nombre. |

### 2. Configuración de descuentos

Permite administrar descuentos comerciales desde el backend.

Actualmente contempla:

- Habilitación del descuento general.
- Configuración del porcentaje de descuento.
- Validación del porcentaje permitido.
- Persistencia de la configuración comercial.

Endpoint:

| Método | Endpoint | Función |
|---|---|---|
| GET | `/settings/commercial` | Consultar configuración comercial. |
| PUT | `/settings/commercial` | Actualizar configuración comercial. |

La configuración general permite establecer un porcentaje aplicable a los productos.

La arquitectura comercial prevista también contempla descuentos individuales por producto, con prioridad sobre el descuento general y sin acumulación de porcentajes.

### 3. Habilitación de venta al público

Permite controlar si el establecimiento acepta pedidos desde una aplicación externa de venta al público.

El backend proporciona un endpoint de consulta pública para que otro FrontEnd pueda conocer el estado de habilitación.

| Método | Endpoint | Función |
|---|---|---|
| GET | `/settings/public-sales` | Consultar habilitación de venta pública. |

Respuesta:

```json
{
  "public_sales_enabled": true
}
```

Interpretación:

- `true`: el establecimiento permite ventas al público.
- `false`: el establecimiento no permite nuevas ventas al público.

La creación y administración de las órdenes de la aplicación pública corresponden a otro sistema y no forman parte de este módulo.

### 4. Conservación del historial de actividad

El backend incorpora una configuración para determinar cuánto tiempo deben conservarse los registros de actividad de los usuarios.

Esta funcionalidad permite establecer un período de conservación expresado en días.

Configuración inicial:

```json
{
  "retention_days": 30
}
```

Características:

- Período de conservación configurable.
- Valor inicial de 30 días.
- Previsualización de registros vencidos.
- Confirmación administrativa antes de eliminar registros históricos.
- Eliminación física de registros vencidos en MongoDB.
- Limpieza automática periódica.

Endpoints:

| Método | Endpoint | Función |
|---|---|---|
| GET | `/settings/audit-retention` | Consultar período de conservación. |
| POST | `/settings/audit-retention/preview` | Previsualizar registros que serán eliminados. |
| PUT | `/settings/audit-retention` | Actualizar período de conservación. |

**Proceso de eliminación:**

1. El administrador selecciona un período de conservación.
2. El backend calcula cuántos registros superan ese período.
3. Si existen registros vencidos, devuelve una advertencia.
4. El administrador confirma la operación.
5. El backend actualiza la configuración y elimina los registros correspondientes.

Ejemplo de respuesta cuando requiere confirmación:

```json
{
  "confirmation_required": true,
  "retention_days": 30,
  "records_to_delete": 245,
  "message": "Hay registros que superan el período elegido. Confirmá para eliminarlos."
}
```

La eliminación automática se ejecuta mediante una tarea programada en el backend, con una frecuencia de una hora.

Los registros se almacenan en la colección `audit_logs`.

---

## 🧭 Endpoints principales

Los prefijos principales de la API son:

| Prefijo | Función |
|---|---|
| `/` | Comprobación de funcionamiento de la API. |
| `/auth` | Autenticación, refresh y recuperación de contraseña. |
| `/product` | Gestión de productos. |
| `/order` | Gestión de comandas. |
| `/cashRegister` | Operaciones de caja. |
| `/cashMovement` | Movimientos de dinero. |
| `/promotion` | Gestión de promociones. |
| `/stockMovement` | Movimientos de inventario. |
| `/user` | Administración de usuarios. |
| `/settings` | Configuración del establecimiento. |
| `/audit` | Historial de actividad de usuarios. |

Los métodos, parámetros y modelos completos pueden consultarse en `/docs`.

## 🔄 Persistencia y ciclo de solicitud

1. FastAPI recibe la solicitud HTTP.
2. Las dependencias resuelven autenticación y autorización.
3. Pydantic valida los datos recibidos.
4. El router delega la operación al servicio correspondiente.
5. El servicio ejecuta las reglas de negocio.
6. Los repositorios o servicios acceden a MongoDB.
7. La API devuelve la respuesta correspondiente.
8. Cuando corresponde, se registra auditoría y se emite un evento WebSocket.

## 📡 WebSocket

El backend incorpora comunicación mediante WebSockets para mantener sincronizados los clientes conectados.

Permite difundir eventos relacionados con modificaciones de recursos y operaciones del sistema.

La implementación se encuentra en:

```text
app/websocket/
```

## 🌐 CORS

La configuración de CORS se encuentra en `app/main.py`.

Los orígenes autorizados deben corresponder a los FrontEnds que utilizan la API.

En producción se recomienda mantener una lista explícita de dominios autorizados.

## 🧪 Verificación

Con la API activa:

- `GET /` comprueba el funcionamiento del backend.
- `/docs` presenta la documentación interactiva.
- `/redoc` proporciona documentación alternativa.
- Los endpoints protegidos deben probarse con un token válido.
- Los endpoints administrativos deben probarse con los permisos correspondientes.

## 🧯 Errores frecuentes

| Código | Descripción |
|---|---|
| 401 | Token ausente, inválido o vencido. |
| 403 | Usuario sin permisos suficientes. |
| 422 | Datos incompatibles con el esquema de validación. |
| 500 | Error interno del servidor. |

Otros problemas habituales:

- **MongoDB:** comprobar URI, permisos y disponibilidad.
- **CORS:** verificar protocolo, dominio y puerto del FrontEnd.
- **WebSockets:** comprobar conexiones y emisión de eventos.
- **Configuración:** verificar que todas las variables obligatorias estén definidas.

## 🔒 Buenas prácticas

- No registrar contraseñas, tokens ni claves privadas.
- Utilizar HTTPS en producción.
- Mantener las dependencias actualizadas.
- Restringir credenciales y permisos de MongoDB.
- Realizar copias de seguridad periódicas.
- Comprobar la restauración de las copias de seguridad.
- Mantener sincronizados los contratos entre Backend y FrontEnd.
- No modificar endpoints sin actualizar la documentación correspondiente.

---

## 👨‍💻 Proyecto

**Boutique de Sabores — Sistema de Gestión**

Backend desarrollado con Python, FastAPI y MongoDB.

---

[← Volver al README principal](../README.md)