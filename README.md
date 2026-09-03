# FoodFlow production incident

<p align="center">
  <img src="./assets/screenshots/architecture-diagram.png" alt="Logo de mi proyecto" width="300" />
</p>

# FoodFlow — PostgreSQL + Docker

Esta variante de **FoodFlow** utiliza PostgreSQL como sistema de persistencia y Docker para ejecutar la base de datos localmente.

## Arquitectura local

<p align="center">
  <img src="./assets/screenshots/local_architecture.png" alt="arquitectura local" width="600" />
</p>

## Requisitos

Antes de ejecutar el proyecto necesitas:

- Node.js
- npm
- Docker Desktop
- Git
- Un cliente HTTP como Insomnia o Postman

Puedes verificar Docker utilizando:

```bash
docker --version
docker compose version
```

---

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <repository-url>
cd foodflow
npm install
```

El proyecto utiliza `pg` como driver de PostgreSQL para Node.js.

Las dependencias correspondientes son:

```bash
npm install pg
npm install -D @types/pg
```

Si ejecutaste `npm install` después de clonar el repositorio, no necesitas instalarlas individualmente porque ya estarán declaradas en `package.json`.

---

## Estructura relacionada con PostgreSQL

```text
foodflow/
├── database/
│   └── init.sql
│
├── src/
│   ├── database/
│   │   └── postgres.ts
│   │
│   ├── repositories/
│   │   └── restaurant.repository.ts
│   │
│   └── ...
│
├── compose.yaml
├── .env.example
├── package.json
└── README.md
```

### `compose.yaml`

Define el contenedor de PostgreSQL utilizado por FoodFlow.

### `database/init.sql`

Inicializa la base de datos y contiene:

- creación de tablas;
- relaciones;
- constraints;
- datos iniciales para pruebas.

### `src/database/postgres.ts`

Configura el pool de conexiones utilizado por Node.js para comunicarse con PostgreSQL.

---

# Base de datos

La configuración local por defecto es:

| Propiedad | Valor         |
| --------- | ------------- |
| Host      | `localhost`   |
| Puerto    | `5432`        |
| Database  | `foodflow`    |
| User      | `foodflow`    |
| Password  | `foodflow123` |

> Estas credenciales corresponden únicamente al ambiente local del laboratorio.

---

## Modelo inicial

La base de datos contiene las siguientes tablas:

```text
restaurants
customers
products
orders
order_items
payments
idempotency_keys
```

Las relaciones principales son:

<p align="center">
  <img src="./assets/screenshots/database_structure.png" alt="arquitectura local" width="600" />
</p>

# Levantar PostgreSQL

Desde la raíz del proyecto ejecuta:

```bash
docker compose up -d
```

La opción `-d` ejecuta PostgreSQL en segundo plano.

Comprueba que el contenedor esté funcionando:

```bash
docker compose ps
```

Deberías observar el contenedor:

```text
foodflow-postgres
```

con estado similar a:

```text
running
```

o:

```text
healthy
```

---

# Verificar PostgreSQL manualmente

Puedes conectarte directamente a PostgreSQL utilizando:

```bash
docker exec -it foodflow-postgres psql -U foodflow -d foodflow
```

Dentro de PostgreSQL puedes consultar las tablas:

```sql
\dt
```

Consultar restaurantes:

```sql
SELECT * FROM restaurants;
```

Consultar productos:

```sql
SELECT * FROM products;
```

Para salir de PostgreSQL:

```text
\q
```

---

# Levantar FoodFlow

PostgreSQL debe estar ejecutándose antes de iniciar el Backend.

Primero:

```bash
docker compose up -d
```

Comprueba el estado:

```bash
docker compose ps
```

Después inicia FoodFlow:

```bash
npm start
```

Si todo está configurado correctamente deberías observar algo similar a:

```text
PostgreSQL connected: 2026-09-03T18:53:59.521Z
FoodFlow API started | instance=local | port=3000
```

La API estará disponible en:

```text
http://localhost:3000
```

---

# Flujo normal de ejecución

Cada vez que quieras trabajar con FoodFlow puedes utilizar:

```bash
docker compose up -d
docker compose ps
npm start
```

Una vez iniciado:

<p align="center">
  <img src="./assets/screenshots/execution_flow.png" alt="arquitectura local" width="600" />
</p>

---

# Probar la API

## Obtener restaurantes

```http
GET http://localhost:3000/api/restaurants
```

## Obtener un restaurante

```http
GET http://localhost:3000/api/restaurants/restaurant-1
```

## Modificar disponibilidad

```http
PATCH http://localhost:3000/api/restaurants/restaurant-1/open
```

Body:

```json
{
  "open": false
}
```

Después puedes consultar nuevamente:

```http
GET http://localhost:3000/api/restaurants/restaurant-1
```

---

# Detener FoodFlow

Si Node.js está ejecutándose en la terminal:

```text
Control + C
```

En macOS utiliza:

```text
⌃ + C
```

> No es `Command + C`.

Esto detiene únicamente el servidor Node.js.

---

# Detener PostgreSQL

Para detener el contenedor:

```bash
docker compose down
```

Este comando **no elimina los datos almacenados en PostgreSQL**.

Para volver a levantarlo:

```bash
docker compose up -d
```

---

# Reiniciar completamente la base de datos

El archivo:

```text
database/init.sql
```

se ejecuta cuando PostgreSQL inicializa por primera vez su volumen.

Por lo tanto, si modificas `init.sql` y quieres reconstruir completamente la base de datos, ejecuta:

```bash
docker compose down -v
```

y después:

```bash
docker compose up -d
```

Esto:

1. detiene PostgreSQL;
2. elimina el volumen;
3. crea un volumen nuevo;
4. crea nuevamente la base de datos;
5. ejecuta `database/init.sql`;
6. carga nuevamente los datos iniciales.

> **Advertencia:** `docker compose down -v` elimina todos los datos almacenados en la base de datos local.

Utilízalo únicamente cuando quieras reconstruir el ambiente desde cero.

---

# Ver logs de PostgreSQL

Si PostgreSQL no inicia correctamente:

```bash
docker logs foodflow-postgres
```

También puedes revisar todos los contenedores:

```bash
docker ps -a
```

Esto es especialmente útil cuando el contenedor aparece con un estado como:

```text
Exited
```

---

# Variables de entorno

El proyecto incluye:

```text
.env.example
```

con la configuración esperada para el ambiente local.

Ejemplo:

```env
PORT=3000
INSTANCE_ID=local

DB_HOST=localhost
DB_PORT=5432
DB_USER=foodflow
DB_PASSWORD=foodflow123
DB_NAME=foodflow
```

El archivo `.env` real no debe subirse al repositorio.

---

# Git

El `.gitignore` debe contener al menos:

```gitignore
# Dependencies
node_modules/

# Build
dist/

# Environment
.env
.env.local

# Logs
*.log
npm-debug.log*

# macOS
.DS_Store

# VS Code
.vscode/

# TypeScript
*.tsbuildinfo
```

Los siguientes archivos **sí deben almacenarse en Git**:

```text
compose.yaml
database/init.sql
.env.example
package.json
package-lock.json
```

Esto permite que cualquier estudiante pueda clonar el repositorio y reconstruir el mismo ambiente.

---

# Resumen rápido

## Primera ejecución

```bash
git clone <repository-url>
cd foodflow

npm install

docker compose up -d
docker compose ps

npm start
```

---

## Ejecuciones posteriores

```bash
docker compose up -d
npm start
```

---

## Detener el proyecto

Detener Node.js:

```text
Control + C
```

Detener PostgreSQL:

```bash
docker compose down
```

---

## Reconstruir completamente PostgreSQL

```bash
docker compose down -v
docker compose up -d
```

---

## Diagnóstico

Estado:

```bash
docker compose ps
```

Logs:

```bash
docker logs foodflow-postgres
```

Entrar a PostgreSQL:

```bash
docker exec -it foodflow-postgres psql -U foodflow -d foodflow
```

---

# Flujo completo

<p align="center">
  <img src="./assets/screenshots/complete_execution_flow.png" alt="arquitectura local" width="600" />
</p>
