# SkillSwap · Intercambio de habilidades

SkillSwap es un proyecto académico para ofrecer lo que sabes enseñar y encontrar a alguien que pueda enseñarte lo que quieres aprender. El intercambio se plantea sin pagos.

Puedes buscar habilidades, filtrar por categoría, publicar una habilidad y registrar una propuesta de intercambio. La demostración de propuestas usa dos cuentas preconfiguradas.

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
| `GET /proposals` | Consulta las propuestas enviadas y recibidas en Netlify. |
| `POST /proposals` | Registra una propuesta para una habilidad de la otra cuenta. |
| `PATCH /proposals` | Acepta o rechaza una propuesta recibida. |

Con JSON Server, las habilidades publicadas en local se guardan en `db.json`. Las cuentas y sus propuestas se prueban con Netlify Dev o en el sitio publicado.

## Dónde está el código

- [src/App.jsx](src/App.jsx) define las rutas de Inicio, Habilidades, Cómo Funciona, Beneficios y Testimonios. También incluye una página 404.
- [src/components/layout](src/components/layout) contiene el encabezado, el menú adaptable y el pie de página.
- [src/components/home](src/components/home) contiene las secciones de Inicio.
- [src/components/skills](src/components/skills) contiene el catálogo y los formularios de publicación y propuesta.

La interfaz usa React y Tailwind CSS, y la navegación usa React Router. Para compilar el proyecto, ejecuta `npm run build`. Para revisar el código, ejecuta `npm run lint`.

## Publicar en Netlify

1. Importa el repositorio de GitHub en Netlify y elige la rama `main`. [netlify.toml](netlify.toml) configura la compilación, las rutas de React y las rutas de la API.
2. Si ya configuraste `VITE_API_URL` para otra API, quita esa variable para que la aplicación use las funciones del mismo sitio en `/api`.
3. Después del primer deploy, abre `/habilidades` y recarga la página. Publica una habilidad de prueba, vuelve a recargar y comprueba que siga en el catálogo.

En local, `npm run api` sigue iniciando JSON Server y los datos se guardan en `db.json`. En Netlify, la API usa ese archivo para leer las habilidades iniciales y guarda cada nueva habilidad o propuesta en Netlify Blobs. Las publicaciones locales y las del sitio publicado se guardan por separado.

## Demostración con dos cuentas

1. Inicia sesión con la primera cuenta y publica una habilidad nueva.
2. En otro navegador o una ventana privada, entra con la segunda cuenta, encuentra esa habilidad y pulsa **Proponer Swap**.
3. En la primera cuenta, abre **Propuestas → Recibidas**. Acepta o rechaza la propuesta y escribe una respuesta si lo deseas.
4. En la segunda cuenta, abre **Propuestas → Enviadas** y pulsa **Actualizar** para consultar el resultado.

Las credenciales de demostración se entregan por separado. Las habilidades iniciales y las publicaciones hechas sin sesión pueden aparecer en el catálogo, pero solo las habilidades publicadas desde una de las dos cuentas reciben propuestas en la bandeja.

Para probar el flujo completo en local, ejecuta `npx netlify-cli dev` desde el repositorio y abre la dirección que indique. Usa el almacenamiento local de Netlify Dev. Con `npm run api` y `npm run dev` puedes seguir probando el catálogo con JSON Server.
