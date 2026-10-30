---
title: duartedomingos.net
summary: Mi web personal, rehecha desde cero con Astro. Estática, rápida, accesible y en tres idiomas.
year: 2026
stack: [Astro, TypeScript, Tailwind CSS, Playwright]
cover: ./cover.png
links:
  code: https://github.com/DuarteDV/duartedomingos.net
order: 1
---

La web que estás viendo. La primera versión, de 2022, era una plantilla de Bootstrap con el HTML copiado tres veces, una por idioma. Esta la he rehecho desde cero para que sea también una muestra de cómo trabajo en el front-end.

## Decisiones principales

- **Astro, sin JavaScript por defecto.** Toda la web se genera como HTML estático. Solo hay tres scripts pequeños: el modo claro/oscuro, el menú del móvil y la página 404.
- **Tres idiomas sin duplicar código.** Las rutas, los textos de la interfaz y el contenido se resuelven por idioma en un único sitio; los componentes no saben nada de idiomas.
- **Contenido validado.** Cada proyecto es una carpeta con un Markdown por idioma. Si falta un campo o un idioma, la compilación falla con un mensaje claro.
- **Calidad automática.** Pruebas unitarias con Vitest, pruebas de extremo a extremo con Playwright, auditoría de accesibilidad con axe en cada página y Lighthouse con un mínimo de 95 en todas las categorías.
- **Despliegue continuo.** Cada cambio pasa por GitHub Actions y se publica en Firebase Hosting, con una URL de vista previa para cada pull request.
