# ProyectoM2_DayanaGonzales

API REST desarrollada en Node.js + Express, con persistencia en PostgreSQL, que gestiona `authors` y `posts` (modelo tipo JSONPlaceholder). Proyecto Integrador 2 — SoyHenry (contexto ficticio: DevSpark).

## Descripción del proyecto
La API permite crear, leer, actualizar y eliminar autores y publicaciones, con relación uno-a-muchos entre `authors` y `posts` (un author puede tener muchos posts). Incluye validaciones básicas, manejo de errores, tests automatizados y documentación OpenAPI.

## Requisitos

- Node.js v18 o superior
- PostgreSQL v14 o superior
- npm


# Instalación y ejecución local

1. Clonar el repositorio:

```bash
 git clone https://github.com/gonzalesa-web/api-miniblog.git
cd api-miniblog

```
2.Instalar dependencias:

```bash
npm install

```

3. Crear la base de datos en PostgreSQL:

```sql

CREATE DATABASE miniblog;

```

4. Ejecutar los scripts de setup y seed:

```bash

psql -U postgres -d miniblog -f db/setup.sql

psql -U postgres -d miniblog -f db/seed.sql

```

5.Crear el archivo `.env` en la raíz (usa `.env.example` como base):

DB\_USER=postgres

DB\_PASSWORD=tu\_contraseña

DB\_HOST=localhost

DB\_PORT=5432

DB\_NAME=miniblog

PORT=3000


6.Levantar el servidor:

```bash

npm run dev

```
La API queda disponible en `http://localhost:3000`.


*Endpoints*

| Método | Ruta | Descripción |

|--------|------|-------------|

| GET | /authors | Listar todos los authors |

| GET | /authors/:id | Detalle de un author |

| POST | /authors | Crear un author |

| PUT | /authors/:id | Actualizar un author |

| DELETE | /authors/:id | Eliminar un author |

| GET | /posts | Listar todos los posts |

| GET | /posts/:id | Detalle de un post |

| GET | /posts/author/:authorId | Posts de un author específico |

| POST | /posts | Crear un post |

| PUT | /posts/:id | Actualizar un post |

| DELETE | /posts/:id | Eliminar un post |



# Tests

El proyecto usa `jest` + `supertest` para tests automatizados sobre los endpoints principales.

Ejecutar:

```bash

npm test

```
Cobertura actual: creación de authors/posts, obtención por id, validaciones de campos obligatorios, manejo de 404 en recursos inexistentes, y el endpoint `posts/author/:authorId`.

# Documentación OpenAPI
La especificación está en \[`openapi.yaml`](./openapi.yaml). Se puede visualizar de dos formas:

**Opción 1: Swagger UI incluido en la API**

Con el servidor corriendo (local o en producción), la documentación interactiva está disponible en `/api-docs`:

- Local: http://localhost:3000/api-docs
- Producción: https://api-miniblog-production-523e.up.railway.app/api-docs

**Opción 2: Swagger Editor**

1. Copia el contenido del archivo `openapi.yaml`

2. Pégalo en \[editor.swagger.io](https://editor.swagger.io)

## Deployment en Railway

La API está desplegada en Railway y disponible públicamente en:

**URL pública:** https://api-miniblog-production-523e.up.railway.app

### Pasos seguidos para el deploy

1. Se creó un proyecto en Railway y se conectó el repositorio de GitHub para deploy automático (cada `git push` a `main` redespliega la app).
2. Se agregó un servicio de PostgreSQL dentro del mismo proyecto.
3. Se configuró la variable de entorno `DATABASE_URL` en el servicio de la API, referenciando la base de datos de Postgres (`${{Postgres.DATABASE_URL}}`).
4. Se inicializó la base de datos remota ejecutando `db/setup.sql` y `db/seed.sql` contra la URL pública de la base de datos de Railway.
5. Se generó un dominio público desde Settings → Networking → Generate Domain.
6. Se verificó que los endpoints respondan correctamente en producción (`/authors`, `/posts/author/:authorId`, etc.).

### Variables de entorno en Railway

- `DATABASE_URL`: referenciada automáticamente al servicio de PostgreSQL de Railway (incluye SSL)
- `PORT`: inyectada automáticamente por Railway (no se configura manualmente)

Ejemplo de endpoint funcionando en producción:
```
GET https://api-miniblog-production-523e.up.railway.app/authors
```


## Registro de uso de IA

Este proyecto fue desarrollado con apoyo de Claude (Anthropic) como asistente durante el desarrollo. La IA se usó para:

- Guiar la estructura del proyecto y el orden de implementación (arrays en memoria → conexión a PostgreSQL → SQL real)
- Generar el código base de los services, routes, middleware de errores y tests, revisado y probado manualmente en cada paso 
- Resolver troubleshooting de entorno local (configuración de PostgreSQL en Windows, codificación UTF-8)
- Redactar la documentación OpenAPI y este README

Todo el código fue probado manualmente (Postman, navegador, psql) antes de avanzar al siguiente paso, siguiendo la guía del proyecto.

### Prompts utilizados (sesión de revisión y corrección)

Además del desarrollo inicial, se usó Claude Code para una revisión de cumplimiento posterior. Prompts reales de esa sesión:

1. *"Actúa como un revisor e identifica si el presente proyecto cumple con todo todo lo solicitado por las consignas."* → generó un checklist de cumplimiento contra la consigna del PI2 (endpoints, validaciones, SQL, tests, OpenAPI, deployment).
2. *"Desde tu rol como revisor de manera estricta identifica y determina que cambios se deben realizar para dar fiel cumplimiento a todas las especificidades de las consignas obligatorias."* → identificó 5 incumplimientos concretos: falta de validación de email único y de campos no vacíos en los `PUT`, `.env.example` desalineado con `DATABASE_URL`, y contenido duplicado/`TODO` sin limpiar en este README.
3. *"si pero sin romper el código y luego realiza la comprobación final de que todo está correcto."* → aplicó las correcciones (`routes/authors.js`, `routes/posts.js`, `services/authorsService.js`, `.env.example`, este README) y corrió la suite de tests (`npm test`) para confirmar que nada se rompió.



