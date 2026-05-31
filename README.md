# 📦 Sistema de Gestión de Inventario
### Prueba Técnica — EC Cargos
> Desarrollado por **Sergio Andrés Lozano Bueno**

---

## 🚀 Demo en vivo

| Servicio | URL |
|----------|-----|
| 🌐 **Frontend** | [ec-cargo-technical-test.onrender.com](https://ec-cargo-technical-test.onrender.com) |
| ⚙️ **Backend API** | [/health](https://ec-cargo-technical-test-production.up.railway.app/health) · [/products](https://ec-cargo-technical-test-production.up.railway.app/products) |

> **Nota:** El plan gratuito de Render hace que el frontend tarde ~30 segundos en cargar la primera vez si estuvo inactivo. Es comportamiento normal del tier gratuito.

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Flujo de Ramas Git](#-flujo-de-ramas-git)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Lógica de Negocio](#-lógica-de-negocio)
- [Autenticación](#-autenticación)
- [Pruebas Unitarias](#-pruebas-unitarias)
- [Despliegue](#-despliegue)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Variables de Entorno](#-variables-de-entorno)
- [Funcionalidades](#-funcionalidades)
- [Decisiones Técnicas](#-decisiones-técnicas)

---

## 📖 Descripción General

Aplicación web fullstack que permite **visualizar, agregar y filtrar productos** de un inventario. Implementada con la **Opción B** de la prueba técnica: un backend Node.js que consume [Fake Store API](https://fakestoreapi.com) como intermediario, aplicando lógica de negocio sobre los datos externos antes de servirlos al frontend.

```
Usuario → React Frontend → Node.js Backend → Fake Store API
                ↑                  ↓
           Validaciones     Transformación de datos
           en cliente       (impuesto 19%, stock, formato)
```

---

## 🛠 Tecnologías

### Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-17.x-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)
![nodemon](https://img.shields.io/badge/nodemon-3.x-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-30.x-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-7.x-009688?style=for-the-badge&logoColor=white)

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Node.js | 18.x | Runtime |
| Express | 5.x | Framework HTTP |
| Axios | 1.x | Cliente HTTP para Fake Store API |
| dotenv | 17.x | Variables de entorno |
| cors | 2.x | Cross-Origin Resource Sharing |
| nodemon | 3.x | Hot reload en desarrollo |
| Jest | 30.x | Framework de pruebas unitarias |
| Supertest | 7.x | Testing de endpoints HTTP |

### Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Pure-1572B6?style=for-the-badge&logo=css3&logoColor=white)

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| React | 18.x | UI Library |
| Vite | 5.x | Build tool |
| Axios | 1.x | Llamadas al backend |
| CSS3 | — | Estilos puros sin frameworks |

### Herramientas y Despliegue

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![VSCode](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

---

## 🏗 Arquitectura

Se eligió una **Arquitectura por Capas (Layered Architecture)** para el backend, que separa claramente las responsabilidades y facilita el mantenimiento:

```
┌─────────────────────────────────────────────────────┐
│                     CLIENT (React)                   │
└─────────────────────┬───────────────────────────────┘
                       │ HTTP Request
┌─────────────────────▼───────────────────────────────┐
│                  ROUTES LAYER                        │
│           products.routes.js                         │
│   Define los endpoints y delega al controller        │
└─────────────────────┬───────────────────────────────┘
                       │
┌─────────────────────▼───────────────────────────────┐
│               CONTROLLER LAYER                       │
│          products.controller.js                      │
│  Recibe la request, llama al service,                │
│  devuelve la response. Sin lógica de negocio.        │
└─────────────────────┬───────────────────────────────┘
                       │
┌─────────────────────▼───────────────────────────────┐
│                SERVICE LAYER                         │
│           products.service.js                        │
│  Toda la lógica de negocio vive aquí:                │
│  • Transformación de datos de Fake Store             │
│  • Cálculo de impuesto 19%                           │
│  • Validaciones de negocio                           │
│  • Detección de duplicados                           │
│  • Almacenamiento en sesión (array local)            │
└─────────────────────┬───────────────────────────────┘
                       │
┌─────────────────────▼───────────────────────────────┐
│                CONFIG LAYER                          │
│              config/axios.js                         │
│   Instancia de Axios configurada para Fake Store     │
└─────────────────────┬───────────────────────────────┘
                       │ HTTP Request
┌─────────────────────▼───────────────────────────────┐
│              FAKE STORE API (Externa)                │
│           https://fakestoreapi.com                   │
└─────────────────────────────────────────────────────┘
```

**¿Por qué Layered Architecture y no MVC?**

MVC mezcla lógica de negocio en el controller. Con Layered Architecture, el **service layer** desacopla completamente la lógica del controller. Si mañana cambiamos la fuente de datos (de Fake Store a una base de datos real), solo tocamos el service, sin tocar routes ni controllers.

---

## 📁 Estructura del Proyecto

```
📦 ec-cargos-inventory/
├── 📁 Backend/
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   └── axios.js                # Instancia Axios → Fake Store API
│   │   ├── 📁 controllers/
│   │   │   └── products.controller.js  # Maneja req/res
│   │   ├── 📁 middlewares/
│   │   │   ├── errorHandler.js         # Manejo global de errores
│   │   │   └── authMiddleware.js       # Protección por token Bearer
│   │   ├── 📁 routes/
│   │   │   └── products.routes.js      # Define los 3 endpoints
│   │   ├── 📁 services/
│   │   │   └── products.service.js     # Lógica de negocio
│   │   ├── 📁 tests/
│   │   │   └── products.test.js        # 9 pruebas unitarias
│   │   └── app.js                      # Setup de Express
│   ├── server.js                       # Entry point
│   ├── .env.example                    # Plantilla de variables
│   ├── .gitignore
│   └── package.json
│
└── 📁 frontend/
    ├── 📁 src/
    │   ├── 📁 assets/
    │   │   └── logo.png                # Logo de EC Cargo
    │   ├── 📁 components/
    │   │   ├── ProductTable.jsx        # Tabla con iconos por categoría
    │   │   ├── ProductForm.jsx         # Formulario dark con validaciones
    │   │   ├── SearchBar.jsx           # Buscador con efecto nebula
    │   │   ├── Spinner.jsx             # Loading con cambio de fuentes
    │   │   └── WelcomeScreen.jsx       # Pantalla de bienvenida 3D
    │   ├── 📁 hooks/
    │   │   └── useProducts.js          # Estado y lógica de productos
    │   ├── 📁 pages/
    │   │   └── HomePage.jsx            # Vista principal two-column
    │   ├── 📁 services/
    │   │   └── products.service.js     # Llamadas al backend
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── index.html
    └── package.json
```

---

## 🌿 Flujo de Ramas Git

Se siguió un flujo **Git Flow simplificado**:

```
main                    ← código estable, versión final entregable
 └── develop            ← rama principal de trabajo, integración
      ├── feature/backend-setup     ← Express + Axios + middlewares
      ├── feature/products-api      ← 3 endpoints + lógica de negocio
      ├── feature/frontend-ui       ← toda la UI en React
      └── feature/extras            ← auth, pruebas unitarias, despliegue
```

**Descripción de cada rama:**

| Rama | Contenido |
|------|-----------|
| `feature/backend-setup` | Inicialización de Express, configuración de Axios para Fake Store, middleware de errores, health check |
| `feature/products-api` | Implementación completa de los 3 endpoints con service layer, validaciones y lógica de negocio |
| `feature/frontend-ui` | WelcomeScreen, ProductForm, ProductTable, SearchBar, Spinner, HomePage, estilos completos, logo EC Cargos |
| `feature/extras` | Autenticación con token Bearer, 9 pruebas unitarias con Jest, configuración de despliegue |

---

## 🔌 Endpoints de la API

Base URL local: `http://localhost:3000`
Base URL producción: `https://ec-cargo-technical-test-production.up.railway.app`

### `GET /products`
Obtiene todos los productos combinando Fake Store con los productos creados en sesión.

> 🔓 No requiere autenticación

**Response `200`:**
```json
[
  {
    "id": 1,
    "name": "Fjallraven Backpack",
    "category": "men's clothing",
    "price": 130.84,
    "stock": 15
  }
]
```

---

### `POST /products`
Registra un nuevo producto. Actúa como intermediario enviando a Fake Store y guardando localmente.

> 🔒 Requiere token Bearer en el header `Authorization`

**Headers requeridos:**
```
Authorization: Bearer ec-cargos-secret-token
```

**Body:**
```json
{
  "name": "Teclado Mecánico",
  "category": "electronics",
  "price": 150,
  "stock": 10
}
```

**Validaciones del servidor:**
- Todos los campos son obligatorios
- `price` debe ser mayor a 0
- `stock` no puede ser negativo
- No se permiten productos duplicados por nombre (HTTP `409 Conflict`)

**Response `201`:**
```json
{
  "id": 21,
  "name": "Teclado Mecánico",
  "category": "electronics",
  "price": 178.50,
  "stock": 10
}
```

**Errores posibles:**
| Código | Descripción |
|--------|-------------|
| `400` | Campos faltantes o valores inválidos |
| `401` | Token no enviado |
| `403` | Token inválido |
| `409` | Producto duplicado |
| `500` | Error interno del servidor |

---

### `GET /products/search?q=nombre`
Filtra productos por coincidencia de texto en el nombre.

> 🔓 No requiere autenticación

**Ejemplo:** `GET /products/search?q=laptop`

**Response `200`:**
```json
[
  {
    "id": 13,
    "name": "Acer SB220Q bi 21.5 inches Full HD",
    "category": "electronics",
    "price": 712.81,
    "stock": 8
  }
]
```

---

## 🔐 Autenticación

Se implementó autenticación simple con **token Bearer** para proteger el endpoint de creación de productos.

### ¿Cómo funciona?

```
Cliente                    authMiddleware              Controller
   │                            │                          │
   │── POST /products ─────────>│                          │
   │   Authorization: Bearer    │                          │
   │   ec-cargos-secret-token   │                          │
   │                            │── token válido? ─────>  │
   │                            │      ✅ sí               │
   │                            │                    crea producto
   │<─────────────────────────────────────────────── 201  │
```

### Endpoints protegidos

| Endpoint | Autenticación |
|----------|--------------|
| `GET /products` | 🔓 Libre |
| `GET /products/search` | 🔓 Libre |
| `POST /products` | 🔒 Token Bearer requerido |

### Probar la autenticación

```bash
# Sin token → 401
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","category":"electronics","price":100,"stock":5}'
# → {"error":"Token requerido"}

# Token inválido → 403
curl -X POST http://localhost:3000/products \
  -H "Authorization: Bearer token-falso" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","category":"electronics","price":100,"stock":5}'
# → {"error":"Token inválido"}

# Token válido → 201
curl -X POST http://localhost:3000/products \
  -H "Authorization: Bearer ec-cargos-secret-token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","category":"electronics","price":100,"stock":5}'
# → {"id":21,"name":"Test",...}
```

> **Nota:** En el frontend el token se envía automáticamente desde `products.service.js` usando la variable de entorno `VITE_AUTH_TOKEN`. El usuario nunca lo ve ni lo toca.

---

## 🧪 Pruebas Unitarias

Se implementaron **9 pruebas unitarias** con Jest y Supertest cubriendo los 3 endpoints y los casos de autenticación.

### Correr las pruebas

```bash
cd Backend
npm test
```

### Resultado esperado

```
 PASS  src/tests/products.test.js
  GET /products
    ✓ debe retornar un array de productos con status 200
    ✓ cada producto debe tener las propiedades requeridas
  POST /products
    ✓ debe retornar 401 si no se envia token
    ✓ debe retornar 403 si el token es invalido
    ✓ debe retornar 400 si faltan campos obligatorios
    ✓ debe retornar 400 si el precio es negativo
    ✓ debe retornar 400 si el stock es negativo
  GET /products/search
    ✓ debe retornar 400 si no se envia el parametro q
    ✓ debe retornar un array al buscar con parametro valido

Tests: 9 passed, 9 total
```

### Cobertura de pruebas

| Endpoint | Casos probados |
|----------|---------------|
| `GET /products` | Respuesta 200, estructura de datos |
| `POST /products` | Auth 401, Auth 403, campos vacíos 400, precio negativo 400, stock negativo 400 |
| `GET /products/search` | Sin parámetro 400, búsqueda válida 200 |

---

## ☁️ Despliegue

### Arquitectura de producción

```
Usuario
   │
   ▼
Render (Frontend React)
https://ec-cargo-technical-test.onrender.com
   │
   │ HTTP Request
   ▼
Railway (Backend Node.js)
https://ec-cargo-technical-test-production.up.railway.app
   │
   │ HTTP Request
   ▼
Fake Store API
https://fakestoreapi.com
```

### ¿Por qué Frontend en Render y Backend en Railway?

Se intentó desplegar el backend en Render inicialmente, pero **Fake Store API bloquea con HTTP 403 las peticiones provenientes de las IPs de Render**. Se agregó un `User-Agent` personalizado como primer intento de solución (`fix: add user-agent header to bypass Fake Store API 403 on Render`), pero Fake Store bloquea por IP independientemente del header.

Railway usa un pool de IPs diferente que Fake Store no bloquea, por lo que el backend se migró a Railway sin cambiar ninguna línea de lógica. El frontend se mantuvo en Render ya que los assets estáticos no tienen esta restricción.

### Persistencia en producción

Los productos creados via `POST /products` se almacenan en un array en memoria del servidor de Railway. Al ser el plan gratuito, Railway reinicia el servidor periódicamente, por lo que los productos creados se pierden en cada reinicio. Los 20 productos originales de Fake Store siempre están disponibles ya que se obtienen en cada petición `GET /products`.

---

## ⚙️ Lógica de Negocio

### Transformación de datos (Fake Store → Nuestro formato)

```
Fake Store API          →      Nuestro Backend
─────────────────────────────────────────────
product.title           →      name
product.category        →      category
product.price * 1.19    →      price  (+ impuesto 19%)
Math.random() * 20 + 1  →      stock  (Fake Store no tiene stock)
```

### Persistencia en sesión

Fake Store API es una API de demostración que no persiste datos reales. El backend guarda los productos creados en un array en memoria durante la sesión del servidor. Al reiniciar el servidor los productos creados se pierden, pero los 20 productos originales de Fake Store siempre están disponibles.

```javascript
// Los productos conviven en el GET /products
return [...fakeStoreProducts, ...localProducts];
```

### Indicadores de stock

| Estado | Condición | Visual |
|--------|-----------|--------|
| ✅ Normal | `stock >= 5` | — |
| ⚠️ Stock bajo | `stock > 0 && stock < 5` | Badge amarillo |
| 🚫 Agotado | `stock === 0` | Badge rojo |

---

## ▶️ Instalación y Ejecución

### Prerequisitos

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-v9+-CB3837?style=flat-square&logo=npm&logoColor=white)

### 1. Clonar el repositorio

```bash
git clone https://github.com/SergiusYT/ec-cargo-technical-test.git
cd ec-cargo-technical-test
```

### 2. Configurar y ejecutar el Backend

```bash
cd Backend
npm install
cp .env.example .env
npm run dev
```

El backend corre en: `http://localhost:3000`

Verificar que funciona:
```bash
curl http://localhost:3000/health
# → { "status": "ok" }
```

### 3. Configurar y ejecutar el Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend corre en: `http://localhost:5173`

### 4. Correr las pruebas unitarias

```bash
cd Backend
npm test
```

### 5. Probar los endpoints manualmente

```bash
# Obtener todos los productos
curl http://localhost:3000/products

# Buscar productos
curl "http://localhost:3000/products/search?q=jacket"

# Crear un producto (con token)
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ec-cargos-secret-token" \
  -d '{"name":"Monitor 4K","category":"electronics","price":500,"stock":5}'
```

---

## 🔐 Variables de Entorno

### Backend (`Backend/.env`)

```env
PORT=3000
AUTH_TOKEN=ec-cargos-secret-token
```

Crear el archivo copiando el ejemplo:
```bash
cp Backend/.env.example Backend/.env
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
VITE_AUTH_TOKEN=ec-cargos-secret-token
```

---

## ✨ Funcionalidades

### Backend
- ✅ `GET /products` — listado completo con datos transformados
- ✅ `POST /products` — creación con validaciones, deduplicación y autenticación
- ✅ `GET /products/search` — búsqueda por nombre
- ✅ Impuesto del 19% aplicado automáticamente al precio
- ✅ Middleware global de manejo de errores
- ✅ Middleware de autenticación con token Bearer
- ✅ CORS habilitado para el frontend
- ✅ 9 pruebas unitarias con Jest y Supertest

### Frontend
- ✅ WelcomeScreen con animación 3D de texto fragmentado
- ✅ Transición suave fade-out al HomePage
- ✅ Precarga de productos durante la animación de bienvenida
- ✅ Header con logo de EC Cargos
- ✅ Layout two-column: formulario izquierda, tabla derecha
- ✅ Formulario dark con validaciones en cliente
- ✅ Formato de precio en moneda colombiana (COP)
- ✅ Categorías como desplegable con las 4 de Fake Store
- ✅ Tabla dark con iconos SVG por categoría
- ✅ Indicadores de stock bajo y agotado
- ✅ SearchBar con efecto de partículas nebula
- ✅ Spinner con animación de cambio de fuentes
- ✅ Mensajes de error amigables
- ✅ Responsive en móvil y tablet

---

## 🧠 Decisiones Técnicas

**¿Por qué Layered Architecture y no MVC clásico?**
MVC tiende a acumular lógica en el controller. Con capas separadas, el service es completamente independiente del transporte HTTP, lo que facilita testear y cambiar la fuente de datos sin tocar routes ni controllers.

**¿Por qué Fake Store con array en memoria y no base de datos?**
La prueba técnica (Opción B) no requiere persistencia real, sino demostrar la capacidad de actuar como intermediario y transformar datos externos. El array en memoria cumple ese objetivo con honestidad técnica, documentada explícitamente en este README.

**¿Por qué el backend está en Railway y no en Render?**
Fake Store API bloquea con HTTP 403 las peticiones provenientes de las IPs de Render. Se intentó solucionar agregando un `User-Agent` personalizado en la instancia de Axios, pero el bloqueo es por IP y no por header. Railway usa un pool de IPs diferente que Fake Store no bloquea, por lo que fue la solución más limpia sin modificar la lógica del backend.

**¿Por qué Vite 5 y no la última versión?**
Node.js v18 no es compatible con Vite 6+. Vite 5 es la última versión con soporte oficial para Node 18.

**¿Por qué `type="text"` con `inputMode="numeric"` en lugar de `type="number"` para precio?**
`type="number"` muestra flechas de incremento que no tienen sentido para precios, y no permite formatear el valor visualmente. Con `type="text"` e `inputMode="numeric"` se obtiene el teclado numérico en móvil y control total sobre el formato COP.

**¿Por qué token Bearer fijo y no JWT?**
La prueba pide una autenticación simple simulada. Un token fijo en variable de entorno cumple el objetivo de proteger el endpoint sin agregar complejidad innecesaria. En producción real se usaría JWT con expiración.

---

## 👨‍💻 Autor

**Sergio Andrés Lozano Bueno**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SergiusYT)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sergio-andres-lozano-bueno-03152925a)

---

*Prueba Técnica — EC Cargo — 2026*