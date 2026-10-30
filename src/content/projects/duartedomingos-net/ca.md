---
title: duartedomingos.net
summary: La meva web personal, refeta des de zero amb Astro. Estàtica, ràpida, accessible i en tres idiomes.
year: 2026
stack: [Astro, TypeScript, Tailwind CSS, Playwright]
cover: ./cover.png
links:
  code: https://github.com/DuarteDV/duartedomingos.net
order: 1
---

La web que estàs veient. La primera versió, del 2022, era una plantilla de Bootstrap amb l'HTML copiat tres vegades, una per idioma. L'he refeta des de zero perquè també sigui una mostra de com treballo en el front-end.

## Decisions principals

- **Astro, sense JavaScript per defecte.** Tota la web es genera com a HTML estàtic. Només hi ha tres scripts petits: el mode clar/fosc, el menú del mòbil i la pàgina 404.
- **Tres idiomes sense duplicar codi.** Les rutes, els textos de la interfície i el contingut es resolen per idioma en un únic lloc; els components no saben res d'idiomes.
- **Contingut validat.** Cada projecte és una carpeta amb un Markdown per idioma. Si falta un camp o un idioma, la compilació falla amb un missatge clar.
- **Qualitat automàtica.** Proves unitàries amb Vitest, proves d'extrem a extrem amb Playwright, auditoria d'accessibilitat amb axe a cada pàgina i Lighthouse amb un mínim de 95 a totes les categories.
- **Desplegament continu.** Cada canvi passa per GitHub Actions i es publica a Firebase Hosting, amb una URL de previsualització per a cada pull request.
