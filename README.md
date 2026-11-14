# SkillSwap · Intercambio de habilidades

SkillSwap es un proyecto académico para ofrecer lo que sabes enseñar y encontrar a alguien que pueda enseñarte lo que quieres aprender. El intercambio se plantea sin pagos.

Puedes buscar habilidades, filtrar por categoría, publicar una habilidad y registrar una propuesta de intercambio. El inicio de sesión es una simulación.

## Cómo ejecutar el proyecto

Necesitas Node.js 22.12 o superior y npm. Abre una terminal en la carpeta del proyecto y ejecuta `npm ci` para instalar las dependencias.

1. En la primera terminal, ejecuta `npm run api` para iniciar JSON Server en el puerto 3001.
2. En otra terminal, ejecuta `npm run dev` para iniciar la web.
3. Abre la dirección que Vite muestra como **Local**. Normalmente es [http://localhost:5173/](http://localhost:5173/).

Mantén ambas terminales abiertas. Puedes ver los datos en [http://127.0.0.1:3001/skills](http://127.0.0.1:3001/skills). Si aparece el error `EADDRINUSE` y esa dirección devuelve las habilidades, la API ya está en ejecución.

## Cómo se cargan las habilidades

JSON Server lee las 10 habilidades iniciales de [db.json](db.json) y las ofrece en `/skills`.

1. [useSkills.js](src/api/useSkills.js) usa `useEffect` para iniciar la consulta cuando se abre la aplicación o se pulsa **Reintentar**.
2. [client.js](src/api/client.js) usa `fetch` para pedir los datos. Vite dirige las solicitudes de `/api` al puerto 3001.
3. `useSkills.js` guarda los datos con `useState`. [SkillCatalog.jsx](src/components/skills/SkillCatalog.jsx) muestra las tarjetas y aplica la búsqueda y los filtros. También indica si la consulta está en curso o ha fallado.

| Petición | Qué hace |
| --- | --- |
| `GET /skills` | Carga las habilidades del catálogo. |
| `POST /skills` | Guarda una habilidad nueva. |
| `POST /proposals` | Registra una propuesta para una habilidad existente. |

Las publicaciones y propuestas se guardan en `db.json` y se conservan al recargar la web.

## Dónde está el código

- [src/App.jsx](src/App.jsx) define las rutas de Inicio, Habilidades, Cómo Funciona, Beneficios y Testimonios. También incluye una página 404.
- [src/components/layout](src/components/layout) contiene el encabezado, el menú adaptable y el pie de página.
- [src/components/home](src/components/home) contiene las secciones de Inicio.
- [src/components/skills](src/components/skills) contiene el catálogo y los formularios de publicación y propuesta.

La interfaz usa React y Tailwind CSS, y la navegación usa React Router. Para compilar el proyecto, ejecuta `npm run build`. Para revisar el código, ejecuta `npm run lint`.
