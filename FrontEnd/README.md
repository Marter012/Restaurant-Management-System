<div align="center">

# 🖥️ Frontend — Boutique de Sabores
### Interfaz web de gestión

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/State-Redux%20Toolkit-764ABC?logo=redux&logoColor=white)

</div>

---

## 📌 Objetivo

El Frontend es la aplicación React que utilizan los usuarios para operar Boutique de Sabores. Presenta las pantallas, valida formularios, administra el estado de la interfaz y se comunica con la API mediante Axios.

## 🧰 Tecnologías

- React 19 y TypeScript.
- Vite para desarrollo y compilación.
- React Router para navegación.
- Redux Toolkit y React Redux para estado global.
- Axios para HTTP.
- Formik y Yup para formularios y validación.
- styled-components para estilos.
- React Icons para iconografía.

## 📁 Organización de `src/`

```text
src/
├── components/
│   ├── Pages/               # Inicio, login, productos, promociones, pedidos, caja
│   ├── Forms/               # Formularios de productos, promociones, usuarios, caja y stock
│   ├── NewOrder/             # Flujo de nueva comanda
│   ├── ManageOrder/          # Gestión de comandas
│   ├── ManageProducts/       # Gestión de productos
│   ├── ManagePromotions/     # Gestión de promociones
│   ├── ManageUsers/          # Gestión de usuarios
│   ├── PrintStatusModal/     # Estado del Print Agent/impresora
│   ├── Router/               # Rutas de navegación
│   └── Utils/                # Estilos globales y utilidades
├── initialization/           # Inicialización de datos y sesión
├── services/                 # Clientes Axios y llamadas a API
├── store/                    # Store Redux y slices
├── interfaces/               # Tipos TypeScript
└── main.tsx                  # Punto de entrada
```

## 🚀 Instalación y ejecución

Requisitos: Node.js y npm compatibles con las dependencias de `package.json`; Backend accesible para las operaciones de gestión.

Desde `FrontEnd/`:

```bash
npm install
```

Crear `FrontEnd/.env`:

```dotenv
VITE_API_URL=http://127.0.0.1:8000
VITE_API_PRINT_URL=http://127.0.0.1:5000
```

Estos valores son ejemplos de desarrollo. Configurá la URL y el puerto reales de tu API y Print Agent. Luego:

```bash
npm run dev
```

Vite muestra la dirección local. Para validar producción:

```bash
npm run build
npm run preview
```

Comprobaciones de calidad:

```bash
npm run lint
```

## 🔌 Integración con la API

El cliente principal se configura en `src/services/api.ts`:

- Base URL: `VITE_API_URL`.
- Encabezado `Content-Type: application/json`.
- Encabezado `X-Client-ID` persistente por navegador.
- Encabezado `Authorization: Bearer ...` cuando hay token de acceso.

Los archivos de `src/services/` agrupan las llamadas por recurso. Los tipos de datos se centralizan en `src/interfaces/`. Las rutas del Backend y los modelos de entrada/salida deben mantenerse compatibles con los servicios del Frontend.

## 🗺️ Rutas de la interfaz

Según `src/components/Router/Routes.tsx`:

| Ruta | Pantalla | Acceso |
|---|---|---|
| `/login` | Inicio de sesión | Pública |
| `/` | Inicio | Protegida |
| `/products` | Productos | Protegida |
| `/promotions` | Promociones | Protegida |
| `/orders` | Comandas | Protegida |
| `/cashRegister` | Caja | Protegida |

Las rutas privadas pasan por `ProtectedRoute` y `PrivateLayout`. El acceso final a operaciones también depende de los permisos validados por el Backend.

## 🧠 Estado e inicialización

Redux Toolkit almacena estado compartido. Los slices definen las actualizaciones del estado y `store.ts` configura el store.

`src/initialization/appInitializer.tsx` carga los datos iniciales de productos, órdenes, caja, movimientos de caja y promociones; además, inicia la conexión WebSocket cuando termina la carga principal. La consulta del Print Agent se configura de forma independiente y depende de `VITE_API_PRINT_URL` y de la disponibilidad de sus endpoints.

No se debe asumir que la salud del Print Agent equivale al estado de la impresora: son comprobaciones diferentes.

## 🖨️ Print Agent

El cliente separado se configura en `src/services/printAgentBase.ts` con `VITE_API_PRINT_URL`. Sus servicios se encuentran en `src/services/printAgentService.ts`.

Para diagnosticar:

1. Verificar que `VITE_API_PRINT_URL` apunta al host/puerto correcto.
2. Comprobar que el servicio Print Agent está iniciado y accesible desde el equipo que ejecuta el navegador.
3. Probar el endpoint de salud por separado.
4. Probar el endpoint de estado de impresora por separado.
5. Revisar la consola del navegador y los logs del servicio.

No aumentes los timeouts sin identificar antes qué endpoint se demora. Un timeout del estado de impresora no demuestra por sí solo que el agente esté completamente desconectado.

## 🎨 Estilos y componentes

El proyecto utiliza styled-components y archivos de estilos asociados a componentes. Los cambios visuales deberían mantenerse en los archivos de estilos correspondientes y respetar los tokens de color globales existentes. Evitá introducir estilos duplicados o variables de color no definidas en el sistema global.

## 📦 Scripts disponibles

| Comando | Función |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Ejecuta la comprobación TypeScript y genera la compilación de producción. |
| `npm run preview` | Previsualiza la compilación generada. |
| `npm run lint` | Ejecuta ESLint. |

## 🧯 Resolución de problemas

- **Pantalla sin datos:** revisar Network, URL de API, autenticación y respuestas del Backend.
- **401:** renovar sesión o iniciar sesión nuevamente.
- **CORS:** revisar la URL exacta del Frontend en la configuración del Backend.
- **WebSocket no sincroniza:** revisar conexión y procesamiento de eventos.
- **Error de tipos TypeScript:** comparar las interfaces del Frontend con la estructura real de la respuesta del Backend.
- **Print Agent no responde:** revisar `VITE_API_PRINT_URL`, conectividad y endpoint específico.
- **Cambios en `.env` no aplicados:** reiniciar Vite.

---

[← Volver al README principal](../README.md)
