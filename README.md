# api-miniblog

API REST para MiniBlog // Proyecto Integrador 2



\# API MiniBlog



API REST desarrollada en Node.js + Express, con persistencia en PostgreSQL, que gestiona `authors` y `posts` (modelo tipo JSONPlaceholder). Proyecto Integrador 2 — SoyHenry (contexto ficticio: DevSpark).



\## Descripción del proyecto



La API permite crear, leer, actualizar y eliminar autores y publicaciones, con relación uno-a-muchos entre `authors` y `posts` (un author puede tener muchos posts). Incluye validaciones básicas, manejo de errores, tests automatizados y documentación OpenAPI.



\## Requisitos



\- Node.js v18 o superior

\- PostgreSQL v14 o superior

\- npm



\## Instalación y ejecución local



1\. Clonar el repositorio:

```bash

&#x20;  git clone https://github.com/gonzalesa-web/api-miniblog.git

&#x20;  cd api-miniblog

```



2\. Instalar dependencias:

```bash

&#x20;  npm install

```



3\. Crear la base de datos en PostgreSQL:

```sql

&#x20;  CREATE DATABASE miniblog;

```



4\. Ejecutar los scripts de setup y seed:

```bash

&#x20;  psql -U postgres -d miniblog -f db/setup.sql

&#x20;  psql -U postgres -d miniblog -f db/seed.sql

```



5\. Crear el archivo `.env` en la raíz (usa `.env.example` como base):

DB\_USER=postgres

DB\_PASSWORD=tu\_contraseña

DB\_HOST=localhost

DB\_PORT=5432

DB\_NAME=miniblog

PORT=3000







6\. Levantar el servidor:

```bash

&#x20;  npm run dev

```



&#x20;  La API queda disponible en `http://localhost:3000`.



\## Endpoints



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



\## Tests



El proyecto usa `jest` + `supertest` para tests automatizados sobre los endpoints principales.



Ejecutar:

```bash

npm test

```



Cobertura actual: creación de authors/posts, obtención por id, validaciones de campos obligatorios, manejo de 404 en recursos inexistentes, y el endpoint `posts/author/:authorId`.



\## Documentación OpenAPI



La especificación está en \[`openapi.yaml`](./openapi.yaml). Para visualizarla de forma interactiva:



1\. Copia el contenido del archivo `openapi.yaml`

2\. Pégalo en \[editor.swagger.io](https://editor.swagger.io)



\## Deployment en Railway



\*(pendiente — se completa después del deploy)\*



\- URL pública: `TODO`

\- Variables de entorno configuradas en Railway: `DB\_USER`, `DB\_PASSWORD`, `DB\_HOST`, `DB\_PORT`, `DB\_NAME`, `PORT`

\- Evidencia del deploy: `TODO`



\## Registro de uso de IA



Este proyecto fue desarrollado con apoyo de Claude (Anthropic) como asistente durante el desarrollo. La IA se usó para:



\- Guiar la estructura del proyecto y el orden de implementación (arrays en memoria → conexión a PostgreSQL → SQL real)

\- Generar el código base de los services, routes, middleware de errores y tests, revisado y probado manualmente en cada paso

\- Resolver troubleshooting de entorno local (configuración de PostgreSQL en Windows, codificación UTF-8)

\- Redactar la documentación OpenAPI y este README



Todo el código fue probado manualmente (Postman, navegador, psql) antes de avanzar al siguiente paso, siguiendo la guía del proyecto.

