# Rediseño de duartedomingos.net — Especificación

- **Fecha:** 2026-10-30
- **Estado:** pendiente de revisión
- **Sustituye a:** web estática de 2022-2023 (Bootstrap 4 + jQuery, plantilla de Devcrud), carpetas `Personal/` y `Personal 1/`

## 1. Objetivo

Rehacer la web personal con tecnología actual para **buscar trabajo**. La ven reclutadores y empresas de España (remoto o híbrido en Barcelona).

El perfil actual es back-end y datos (Java, Spring, SQL, Python). El objetivo a medio plazo es front-end o móvil. Por eso la propia web también es una **muestra de trabajo front-end**: código público, cuidado, rápido y accesible.

### Criterios de éxito

- Un reclutador entiende en menos de 10 segundos quién es Duarte, qué hace, dónde quiere trabajar y cómo contactarle.
- La web funciona igual de bien en ES, EN y CA, en móvil y escritorio, en modo claro y oscuro.
- Añadir un proyecto nuevo solo requiere crear una carpeta con tres archivos Markdown y una imagen.
- Lighthouse ≥ 95 en rendimiento, accesibilidad, buenas prácticas y SEO, en todas las páginas.
- Ninguna información sensible del trabajo actual o anterior (ver §9).

## 2. Alcance

**Dentro**
- Portada de una página por idioma.
- Páginas de detalle de proyecto.
- Página 404.
- CV descargable en PDF.
- Modo claro/oscuro.
- SEO.
- Analítica sin cookies.
- Despliegue automático con vistas previas.
- Pruebas automáticas.

**Fuera**
- Blog.
- Contadores decorativos («1k+ Coffee»).
- Fecha de nacimiento.
- Instagram.
- Formulario de contacto.
- Gestor de contenidos (CMS).
- React u otros frameworks de componentes (se pueden añadir más tarde como *islands* de Astro).

## 3. Contenido y estructura

### 3.1 Rutas

| Página | ES (por defecto) | EN | CA |
|---|---|---|---|
| Portada | `/` | `/en/` | `/ca/` |
| Proyecto | `/proyectos/<slug>/` | `/en/projects/<slug>/` | `/ca/projectes/<slug>/` |
| 404 | `/404.html` (única, trilingüe por detección de prefijo de la URL) | | |

- El `<slug>` es el mismo en los tres idiomas.
- No hay redirección automática por idioma del navegador.
- El selector de idioma lleva a la página equivalente en el otro idioma.

### 3.2 Secciones de la portada (en orden)

1. **Hero:** etiqueta monoespaciada («Desarrollador de software · Andorra»), nombre, una frase de presentación, botones «Ver proyectos» y «Descargar CV».
2. **Sobre mí:** párrafo breve, más una línea de disponibilidad («Abierto a nuevas oportunidades en Barcelona (híbrido) o en remoto»).
3. **Experiencia:** línea de tiempo.
   - Tech-Value Ibérica / Var Group (nov 2023 – actualidad).
   - BDR Informàtica (jul 2022 – nov 2023).
   - Los trabajos de técnico de 2018-2019 no se incluyen.
4. **Proyectos:** tarjetas (imagen, nombre, una línea, tecnologías) que enlazan al detalle. Proyectos iniciales:
   - *duartedomingos.net*: esta web, con enlace al repositorio.
   - *Don't Touch The Duck*: juego móvil 2D en Unity, 2021.
   - *Duarts Review*: web de reseñas de videojuegos, PHP/HTML/JS, 2020.
   - *Typing Knight* existe como borrador (`draft: true`) y no se publica.
5. **Habilidades:** cuatro grupos.
   - Back-end: Java, Spring, C#/.NET.
   - Datos: SQL, Python, Snowflake, AWS S3.
   - Front-end/móvil: Astro, TypeScript, Blazor, Flutter*.
   - Herramientas: Git, SVN, Scrum.
   - Debajo, los idiomas que habla: español y portugués (nativo), catalán (C1), inglés (B2), francés (básico).
6. **Formación:** Grado en Informática (Universidad de Andorra, 2019-2023); Bachillerato Profesional en Sistemas y Redes (2018-2019); Grado Medio en Microinformática (2016-2018).
7. **Contacto:** correo, LinkedIn, GitHub y CV en PDF.

\* Pendiente de confirmar (ver §10).

### 3.3 Página de proyecto

Contiene:
- Título, año y tecnologías.
- Imagen de portada.
- Cuerpo en Markdown (descripción, capturas).
- Enlaces opcionales a demo y código.
- Enlace de vuelta a la sección de proyectos.

### 3.4 Textos

- Se redactan a partir de los CV de 2025, en los tres idiomas, con tono profesional y cercano.
- Duarte revisa todos los textos en la vista previa antes del primer despliegue a producción.

## 4. Diseño visual (estilo A: minimalista editorial)

- **Composición:** fondo cálido casi blanco (`#FAFAF7`) y texto casi negro, con mucho espacio en blanco.
- **Tipografía:** nombre muy grande (≈ 40–64 px según pantalla, peso 500, tracking ligeramente negativo). Cuerpo de 17–18 px con interlineado amplio.
- **Fuentes:** **Geist** (variable) para el texto y **Geist Mono** para etiquetas y detalles. Alojadas en la propia web vía Fontsource; nada de Google Fonts.
- **Color de acento:** uno solo, verde azulado (`#0F6E56`), en etiquetas, enlaces y estado activo.
- **Botones:** primario relleno oscuro; secundario con borde.
- **Modo oscuro:** paleta equivalente definida con variables CSS. Sigue `prefers-color-scheme`, con un botón para cambiarlo que guarda la preferencia en `localStorage` (con try/catch). Un script en línea en el `<head>` evita el parpadeo.
- **Movimiento:** solo transiciones suaves y aparición discreta de secciones. Todo se desactiva con `prefers-reduced-motion`.
- **Responsive:** primero el diseño móvil. Margen lateral mínimo de 16 px y sin desplazamiento horizontal. En móvil el menú se pliega en un botón.

## 5. Arquitectura técnica

### 5.1 Tecnología

- Última versión estable de **Astro**, en modo de salida estática.
- **TypeScript** en modo `strict`.
- **Tailwind CSS** (v4) para estilos, con tokens de color como variables CSS.
- Integraciones: `@astrojs/sitemap` y `astro:assets` para las imágenes.
- **JavaScript en el cliente:** solo el botón de tema y el menú móvil. Nada más.

### 5.2 Organización

```
web/
├─ src/
│  ├─ content/projects/<slug>/{es,en,ca}.md, cover.(png|jpg)
│  ├─ content.config.ts        # esquema zod de la colección de proyectos
│  ├─ data/cv.ts               # experiencia, formación, habilidades e idiomas (texto Localized)
│  ├─ i18n/{es,en,ca}.json     # textos de interfaz
│  ├─ i18n/utils.ts            # t(), rutas localizadas, idioma desde la URL
│  ├─ components/              # Header, LanguageSwitcher, ThemeToggle, Hero, About,
│  │                           # Experience, ProjectCard, Skills, Education, Contact, Footer
│  ├─ layouts/BaseLayout.astro # <head>, SEO, hreflang, OG, tema
│  └─ pages/                   # index, en/index, ca/index, rutas de proyecto, 404
├─ public/cv/                  # PDF del CV por idioma
├─ tests/                      # Playwright
├─ firebase.json, .firebaserc
└─ .github/workflows/
```

**Reglas de separación**
- Los componentes reciben datos ya traducidos por props y no conocen el sistema de idiomas.
- La resolución de idioma vive en `pages/` y en `i18n/utils.ts`.
- `data/cv.ts` exporta datos tipados con `type Localized<T> = { es: T; en: T; ca: T }`.

### 5.3 Colección de proyectos

Datos de cabecera (frontmatter) de cada `<lang>.md`, validados con zod:

| Campo | Tipo | Obligatorio |
|---|---|---|
| `title` | string | sí |
| `summary` | string (≤ 140 caracteres) | sí |
| `year` | number | sí |
| `stack` | string[] | sí |
| `cover` | imagen (relativa a la carpeta) | sí |
| `links.demo` / `links.code` | URL | no |
| `order` | number | no (orden por defecto: año desc.) |
| `draft` | boolean | no (por defecto `false`) |

**Reglas de compilación**
- Un proyecto que no es borrador debe tener los tres idiomas. Si falta alguno, la compilación falla con un mensaje que indica el proyecto y el idioma.
- Los borradores no generan página ni tarjeta.

### 5.4 Idiomas

- Se usa el sistema i18n integrado de Astro con `defaultLocale: "es"`, `locales: ["es","en","ca"]` y `prefixDefaultLocale: false`.
- El segmento de ruta de proyectos se traduce con un mapa en `i18n/utils.ts`.
- Cada página emite `<link rel="alternate" hreflang>` para los tres idiomas, más `x-default` apuntando a ES, y `<html lang>` correcto.

## 6. SEO y compartición

- `<title>` y `meta description` por página e idioma.
- Imagen Open Graph/Twitter de 1200×630 para la portada (nombre y puesto en el estilo A) y la portada del proyecto en sus páginas.
- `sitemap.xml` con todas las rutas e idiomas, y `robots.txt`.
- JSON-LD de tipo `Person` en la portada: nombre, puesto, `sameAs` (LinkedIn y GitHub) y `knowsLanguage`.
- URL canónicas con barra final, coherentes con `firebase.json`.

## 7. Despliegue y alojamiento

- **Firebase Hosting**, proyecto `plucky-lane-362615`, mismo dominio. El DNS no se toca.
- `firebase.json`:
  - `public: "dist"`, `cleanUrls: true`, `trailingSlash: true`.
  - Página 404 propia.
  - Cabecera `Cache-Control: public, max-age=31536000, immutable` para `/_astro/**`.
  - Cabeceras de seguridad básicas: `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`.
- **GitHub Actions** con la acción oficial `FirebaseExtended/action-hosting-deploy`:
  - *Pull request:* compilar, comprobar, probar y publicar en un canal de vista previa (URL temporal comentada en la PR).
  - *Push a `main`:* lo mismo y, si todo pasa, publicar en producción (canal `live`).
- **Credenciales:** una cuenta de servicio de Firebase guardada como secreto de GitHub. Duarte la crea y la guarda siguiendo instrucciones; Claude no maneja la clave.
- **Vuelta atrás:** desde el historial de versiones de Firebase Hosting.
- **Repositorio:** nuevo y público en GitHub, en la cuenta `DuarteDV`.
  - Los commits y PR no llevan atribución a Claude ni a ninguna IA.
  - Las carpetas antiguas `Personal/` y `Personal 1/` no se modifican.

## 8. Analítica

- **Cloudflare Web Analytics** con su script (*beacon*): sin cookies y sin pasar el DNS por Cloudflare.
- Sin cookies, no hace falta aviso de cookies.
- Se elimina Google Analytics (`G-F6FTHN72BG`).
- El token del *beacon* lo obtiene Duarte desde su cuenta de Cloudflare. Se configura como variable pública de compilación.

## 9. Privacidad y contenido sensible

- Solo se publica información que ya aparece en los CV públicos de 2025, o que Duarte apruebe expresamente.
- La experiencia se describe por sector y tecnología, por ejemplo: «conversión de mensajería financiera ISO 20022 → SWIFT MT940/MT950 con Java», «automatización y validación de procesos de datos en el sector bancario», «clasificación de correos con IA en Python».
- **Nunca** se publican:
  - nombres de clientes o bancos;
  - nombres de proyectos internos;
  - valoraciones, porcentajes de objetivos o problemas internos de equipos.
  - La autoevaluación FY 25-26 es solo contexto: no se copia al repositorio ni a la web.
- Correo de contacto: `duartedomingos@outlook.es`, como en la web actual. Sin teléfono ni dirección.

## 10. Pendientes de decidir (antes de redactar textos, no bloquean la implementación)

1. **Puesto que se muestra:** «Desarrollador · Tech-Value Ibérica» (como en el CV) o «Junior Solution Consultant · Var Group».
2. **Flutter:** confirmar si se incluye en habilidades (figura en el CV en inglés, no en el español).
3. **CV en catalán:** no existe versión 2025. Opciones: crearla o enlazar la española desde `/ca/`.
4. **Usuario de GitHub en el pie y en `sameAs`:** confirmar `DuarteDV`.

## 11. Calidad y pruebas

Se ejecutan en CI en cada PR y en cada push a `main`. Si algo falla, no se despliega.

| Comprobación | Herramienta | Criterio |
|---|---|---|
| Tipos y plantillas | `astro check` | 0 errores |
| Formato y estilo | Prettier + ESLint | 0 errores |
| Compilación | `astro build` | correcta; validación de proyectos (§5.3) incluida |
| Extremo a extremo | Playwright (Chromium) | ver lista abajo |
| Accesibilidad | `@axe-core/playwright` en cada página | 0 violaciones *serious* o *critical* |
| Rendimiento/SEO | Lighthouse CI sobre `dist/` | ≥ 95 en las cuatro categorías |

Casos de Playwright:
- Las tres portadas responden 200 y tienen `<html lang>` correcto.
- El selector de idioma lleva de cada página a su equivalente.
- Cada proyecto publicado tiene página en los tres idiomas y los borradores dan 404.
- Los enlaces internos no están rotos y los PDF del CV responden 200.
- El modo oscuro se activa, persiste tras recargar y respeta `prefers-color-scheme`.
- El menú móvil abre y cierra con teclado y ratón.
- Una URL inexistente muestra la 404 propia.

## 12. Lanzamiento

1. Implementación en `web/` con revisiones por PR.
2. Duarte revisa textos e imágenes en la URL de vista previa.
3. Primer merge a `main` y despliegue a producción, que sustituye la web de 2023.
4. Comprobación en producción: dominio con HTTPS, tres idiomas, vista previa al compartir en LinkedIn, datos llegando a Cloudflare Analytics.
