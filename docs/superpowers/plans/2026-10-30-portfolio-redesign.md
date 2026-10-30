# Rediseño de duartedomingos.net — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sustituir la web de 2023 por un portfolio estático en Astro, trilingüe (ES/EN/CA), con estilo minimalista editorial, desplegado en Firebase Hosting con CI.

**Architecture:**
- Astro genera HTML estático en `dist/`.
- Todo lo que depende del idioma se resuelve en `src/i18n/utils.ts` y en las páginas de `src/pages/`. Los componentes reciben textos ya traducidos.
- El CV vive en `src/data/cv.ts` (datos tipados) y los proyectos en una colección de contenido Markdown, agrupada y validada por funciones puras en `src/lib/`.

**Tech Stack:**
- Astro (última estable), TypeScript strict, Tailwind CSS v4 (`@tailwindcss/vite`), `@astrojs/sitemap`.
- Tipografía Geist / Geist Mono vía Fontsource; satori + `@resvg/resvg-js` para las imágenes OG.
- Pruebas: Vitest, Playwright + `@axe-core/playwright`, `@lhci/cli`.
- Calidad de código: ESLint (`eslint-plugin-astro`, `typescript-eslint`), Prettier (`prettier-plugin-astro`).
- Despliegue: Firebase Hosting y GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-10-30-portfolio-redesign-design.md`

## Global Constraints

- Todo el trabajo se hace en `E:\Personal\duartedomingos.net\web`. **No se modifican** `Personal/` ni `Personal 1/`; solo se copian archivos desde ellas.
- **Git:**
  - Identidad local del repo: `Duarte Domingos <duartedomingos@outlook.es>` (ya configurada). No usar la identidad global.
  - Commits sin atribución a Claude ni a IA: ni `Co-Authored-By`, ni pie «Generated with».
  - Mensajes de commit en español, estilo Conventional Commits (`feat:`, `test:`, `chore:`, `docs:`).
- **Entorno:** Node 24 (`.nvmrc` = `24`) y npm.
- **Astro:** `site: "https://duartedomingos.net"`, `trailingSlash: "always"`, `build.format: "directory"`.
- **i18n:** `defaultLocale: "es"`, `locales: ["es","en","ca"]`, `prefixDefaultLocale: false`. Rutas: `/`, `/en/`, `/ca/`, `/proyectos/<slug>/`, `/en/projects/<slug>/`, `/ca/projectes/<slug>/`.
- **JavaScript en el cliente:** solo tres scripts en línea.
  1. Tema (en el `<head>`).
  2. Menú móvil.
  3. Selección de idioma en la 404.
  - Además, el *beacon* de Cloudflare si hay token.
- **Paleta clara:**
  - fondo `#FAFAF7`, texto `#1A1A18`, secundario `#5F5E5A`, borde `#D3D1C7`, acento `#0F6E56`.
- **Paleta oscura:**
  - fondo `#121211`, texto `#ECEBE6`, secundario `#A3A29B`, borde `#2C2C2A`, acento `#5DCAA5`.
- **Tipografía:**
  - Geist (texto) y Geist Mono (etiquetas).
  - Nombre del hero: 40 px en móvil → 64 px en escritorio, peso 500, `letter-spacing: -0.02em`.
  - Cuerpo: 17 px en móvil → 18 px en escritorio, `line-height` 1.7.
- **Responsive:**
  - Margen lateral mínimo de 16 px y sin scroll horizontal a 320 px de ancho.
  - Toda animación va dentro de `@media (prefers-reduced-motion: no-preference)`.
- **Privacidad (§9 del spec):** nada de nombres de clientes o bancos, proyectos internos, valoraciones ni problemas de equipo. La autoevaluación no se copia al repo.
- **Contacto:**
  - Correo: `duartedomingos@outlook.es`.
  - LinkedIn: `https://www.linkedin.com/in/duarte-domingos`.
  - GitHub: `https://github.com/DuarteDV`.
- **Pendientes del spec §10, con valor provisional fácil de cambiar en `cv.ts`:**
  - Puesto: «Desarrollador de software» en Tech-Value Ibérica (Var Group).
  - Flutter: se incluye.
  - El CV de `/ca/` enlaza al PDF en español.
  - GitHub: `DuarteDV`.
- **No hacer push ni crear el repo remoto** sin que Duarte lo pida en el chat. Las credenciales (cuenta de servicio de Firebase, token de Cloudflare) las gestiona Duarte.

## Review Focus

1. **Cambiar de idioma desde una página de proyecto** debe llevar al mismo proyecto en el otro idioma, no a la portada. Prueba en la tarea 6.
2. **`localStorage` inaccesible** (modo privado o cookies bloqueadas que hacen lanzar excepción): la página se ve bien, el tema sigue al sistema, el botón cambia el tema en la sesión y no hay errores en consola. Prueba en la tarea 3.
3. **Pantalla de 320 px con palabras largas** (catalán, el correo, nombres de tecnologías): sin scroll horizontal en ningún idioma. Prueba en la tarea 5 (portadas) y en la 6 (proyectos).
4. **URL inexistente con prefijo de idioma** (`/en/nope/`, `/ca/res/`): la 404 se muestra en ese idioma, con enlace a la portada de ese idioma. Prueba en la tarea 7.
5. **JavaScript desactivado:** todo el contenido de la portada es visible (ninguna animación lo deja con `opacity: 0`) y el menú de escritorio funciona. Prueba en la tarea 5.

---

### Task 1: Scaffold del proyecto y herramientas

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.nvmrc`, `.gitignore`, `.prettierrc.json`, `.prettierignore`, `eslint.config.js`, `vitest.config.ts`, `playwright.config.ts`, `src/pages/index.astro` (temporal), `tests/e2e/smoke.spec.ts`, `src/lib/sanity.test.ts`
- Keep: `docs/` (ya existe)

**Interfaces:**
- Produces: scripts de npm usados por todas las tareas: `dev`, `build`, `preview`, `check` (`astro check`), `lint` (`eslint . && prettier --check .`), `format`, `test:unit` (`vitest run`), `test:e2e` (`playwright test`).

- [ ] **Step 1: Crear el proyecto Astro.** `web/` no está vacía (`docs/`, `.git`). Generar con `npm create astro@latest` (plantilla `minimal`, TypeScript `strict`, sin git) en una carpeta temporal del scratchpad y mover su contenido a `web/`, sin sobrescribir `docs/` ni `.git`. Después, `npm install`.
- [ ] **Step 2: Añadir integraciones.** Ejecutar `npx astro add tailwind sitemap --yes`. Configurar `astro.config.mjs` con `site`, `trailingSlash` y `build.format` de las restricciones globales (el i18n llega en la tarea 2).
- [ ] **Step 3: Añadir dependencias de desarrollo.** `vitest`, `@playwright/test`, `@axe-core/playwright`, `eslint`, `eslint-plugin-astro`, `typescript-eslint`, `prettier`, `prettier-plugin-astro`. Después, `npx playwright install chromium`.
- [ ] **Step 4: Configurar las pruebas.**
  - `vitest.config.ts` usa `getViteConfig` de `astro/config` e incluye `src/**/*.test.ts`.
  - `playwright.config.ts`: `testDir: "tests/e2e"`, `use.baseURL: "http://localhost:4321"`, `webServer: { command: "npm run preview -- --port 4321", port: 4321, reuseExistingServer: !process.env.CI }`, un solo proyecto Chromium.
- [ ] **Step 5: Escribir las pruebas mínimas.**

```ts
// src/lib/sanity.test.ts
import { expect, test } from "vitest";
test("vitest runs", () => expect(1 + 1).toBe(2));

// tests/e2e/smoke.spec.ts
import { expect, test } from "@playwright/test";
test("home responds", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
});
```

- [ ] **Step 6: Verificar.** `npm run check && npm run lint && npm run test:unit && npm run build && npm run test:e2e` → todo en verde.
- [ ] **Step 7: Commit.** `chore: proyecto Astro con TypeScript, Tailwind y herramientas de pruebas`

---

### Task 2: Núcleo de idiomas

**Files:**
- Create: `src/i18n/es.json`, `src/i18n/en.json`, `src/i18n/ca.json`, `src/i18n/utils.ts`, `src/i18n/utils.test.ts`, `src/pages/en/index.astro`, `src/pages/ca/index.astro`
- Modify: `astro.config.mjs` (bloque `i18n`; `sitemap({ i18n: { defaultLocale: "es", locales: { es: "es-ES", en: "en", ca: "ca" } } })`), `src/pages/index.astro`
- Test: `src/i18n/utils.test.ts`, `tests/e2e/i18n.spec.ts`

**Interfaces:**
- Produces (en `src/i18n/utils.ts`):
  - `locales: readonly ["es","en","ca"]`
  - `type Locale`, `defaultLocale: Locale`
  - `type Localized<T> = Record<Locale, T>`
  - `type UiKey = keyof typeof es` (es.json es la referencia)
  - `isLocale(v: string): v is Locale`
  - `getLocaleFromPath(pathname: string): Locale`
  - `t(locale: Locale, key: UiKey): string`
  - `type PageRef = { kind: "home" } | { kind: "project"; slug: string }`
  - `pathFor(locale: Locale, page: PageRef): string`
  - `alternates(page: PageRef): Localized<string>`
  - `pick<T>(value: Localized<T>, locale: Locale): T`
- Claves mínimas de UI:
  - Menú: `nav.about`, `nav.experience`, `nav.projects`, `nav.skills`, `nav.education`, `nav.contact`.
  - Hero: `hero.ctaProjects`, `hero.ctaCv`.
  - Cabecera: `theme.toggle`, `menu.open`, `menu.close`, `lang.label`.
  - Proyectos: `projects.back`, `projects.demo`, `projects.code`.
  - 404: `notFound.title`, `notFound.body`, `notFound.home`.
  - Pie: `footer.rights`.
  - Las tareas siguientes pueden añadir claves; la prueba de paridad las cubre.

- [ ] **Step 1: Escribir las pruebas unitarias que fallan.**

```ts
// src/i18n/utils.test.ts
import { describe, expect, test } from "vitest";
import es from "./es.json"; import en from "./en.json"; import ca from "./ca.json";
import { alternates, getLocaleFromPath, pathFor, t } from "./utils";

describe("paths", () => {
  test("home", () => expect([pathFor("es",{kind:"home"}), pathFor("en",{kind:"home"}), pathFor("ca",{kind:"home"})]).toEqual(["/","/en/","/ca/"]));
  test("project", () => expect(alternates({kind:"project", slug:"duarts-review"})).toEqual({
    es: "/proyectos/duarts-review/", en: "/en/projects/duarts-review/", ca: "/ca/projectes/duarts-review/" }));
});
describe("getLocaleFromPath", () => {
  test.each([["/","es"],["/en/","en"],["/ca","ca"],["/en/projects/x/","en"],["/enfoque/","es"],["/proyectos/x/","es"]])(
    "%s → %s", (p, l) => expect(getLocaleFromPath(p)).toBe(l));
});
test("dictionaries share keys and have no empty values", () => {
  const keys = Object.keys(es).sort();
  for (const d of [en, ca]) expect(Object.keys(d).sort()).toEqual(keys);
  for (const d of [es, en, ca]) for (const v of Object.values(d)) expect(String(v).trim()).not.toBe("");
});
test("t translates", () => expect(t("en", "nav.projects")).toBe("Projects"));
```

- [ ] **Step 2: Ejecutar `npm run test:unit`.** Debe fallar porque el módulo `./utils` no existe.
- [ ] **Step 3: Implementar `utils.ts` y los tres JSON.** El segmento de proyectos se traduce con un mapa (`proyectos` / `projects` / `projectes`). Las tres páginas de portada son, por ahora, un `<h1>` con `t(locale, "nav.about")` dentro de `<html lang={locale}>`.
- [ ] **Step 4: Escribir `tests/e2e/i18n.spec.ts`.** Para cada `[path, lang]` en `[["/","es"],["/en/","en"],["/ca/","ca"]]`: estado 200 y `html[lang]` igual a `lang`.
- [ ] **Step 5: Verificar.** `npm run test:unit && npm run build && npm run test:e2e` → PASS.
- [ ] **Step 6: Commit.** `feat: rutas y textos de interfaz en español, inglés y catalán`

---

### Task 3: Tokens de diseño, layout base y tema claro/oscuro

**Files:**
- Create: `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/ThemeScript.astro`
- Modify: las tres portadas para que usen `BaseLayout`
- Test: `tests/e2e/layout.spec.ts`, `tests/e2e/theme.spec.ts`

**Interfaces:**
- Consumes: `Locale`, `Localized`, `alternates` (tarea 2).
- Produces: componente `BaseLayout` con estas props:
  - `locale: Locale`, `title: string`, `description: string`
  - `alternates: Localized<string>`
  - `ogImage?: string` (ruta absoluta o relativa al sitio)
  - `jsonLd?: Record<string, unknown>`
  - y un `<slot />`.
- Produces: atributo `data-theme="light"|"dark"` en `<html>` y clave `theme` en `localStorage`.

- [ ] **Step 1: Escribir las pruebas e2e que fallan.**

```ts
// tests/e2e/layout.spec.ts
test("head has canonical, hreflang and OG", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://duartedomingos.net/en/");
  for (const [l, h] of [["es","/"],["en","/en/"],["ca","/ca/"],["x-default","/"]])
    await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveAttribute("href", `https://duartedomingos.net${h}`);
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
});
test("no analytics beacon without token", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('script[src*="cloudflareinsights"]')).toHaveCount(0);
});

// tests/e2e/theme.spec.ts
test("follows system dark", async ({ browser }) => {
  const p = await (await browser.newContext({ colorScheme: "dark" })).newPage();
  await p.goto("/"); await expect(p.locator("html")).toHaveAttribute("data-theme", "dark");
});
test("toggle persists across reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" }); await page.goto("/");
  await page.getByRole("button", { name: /tema|theme/i }).click();
  await page.reload(); await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
test("works when localStorage throws", async ({ page }) => {   // Review Focus 2
  const errors: string[] = []; page.on("pageerror", e => errors.push(e.message));
  await page.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } }));
  await page.goto("/"); await page.getByRole("button", { name: /tema|theme/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(errors).toEqual([]);
});
```

- [ ] **Step 2: Ejecutar `npm run build && npm run test:e2e`.** Debe fallar (no hay canonical ni botón de tema).
- [ ] **Step 3: Implementar `global.css`.**
  - `@import "tailwindcss"`.
  - Fuentes Fontsource importadas: `@fontsource-variable/geist` y `@fontsource-variable/geist-mono`; antes de instalarlas, confirmar los nombres exactos con `npm view`.
  - `@theme` con `--font-sans` y `--font-mono`.
  - Variables `--color-bg`, `--color-fg`, `--color-muted`, `--color-border`, `--color-accent` en `:root` (claro) y `[data-theme="dark"]` (oscuro), con los valores de las restricciones globales.
  - `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`
- [ ] **Step 4: Implementar `ThemeScript.astro`.** Script `is:inline` en el `<head>`:
  1. Lee `localStorage.theme` dentro de try/catch.
  2. Si no hay valor, usa `matchMedia("(prefers-color-scheme: dark)")`.
  3. Fija `data-theme` en `<html>`.
  4. Expone `window.__setTheme(next)`, que guarda el valor también con try/catch.
- [ ] **Step 5: Implementar `BaseLayout.astro`.**
  - `<html lang>`, `<title>`, `meta description`.
  - `link rel=canonical` con `new URL(Astro.url.pathname, Astro.site)`.
  - `alternate` para cada idioma, más `x-default` → ES.
  - Etiquetas OG y Twitter.
  - `<script type="application/ld+json">` si llega `jsonLd`.
  - *Beacon* de Cloudflare solo si existe `import.meta.env.PUBLIC_CF_BEACON_TOKEN`: `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token })}>`.
  - Botón de tema provisional en el body (la tarea 4 lo mueve a la cabecera), con `aria-label={t(locale,"theme.toggle")}`.
- [ ] **Step 6: Verificar.** `npm run check && npm run build && npm run test:e2e` → PASS.
- [ ] **Step 7: Commit.** `feat: layout base con SEO, hreflang y modo claro/oscuro`

---

### Task 4: Cabecera, selector de idioma, menú móvil y pie

**Files:**
- Create: `src/components/Header.astro`, `src/components/LanguageSwitcher.astro`, `src/components/ThemeToggle.astro`, `src/components/Footer.astro`
- Modify: `src/layouts/BaseLayout.astro` (incluye Header y Footer; quita el botón provisional)
- Test: `tests/e2e/header.spec.ts`

**Interfaces:**
- Consumes: `BaseLayout` props, `t`, `alternates` (tareas 2 y 3).
- Produces:
  - `Header` con props `{ locale: Locale; alternates: Localized<string>; homeHref: string }`. Los enlaces del menú apuntan a `${homeHref}#about|#experience|#projects|#skills|#education|#contact`.
  - `LanguageSwitcher` con props `{ locale; alternates }`: enlaces `ES · EN · CA`, cada uno con `hreflang`, `lang`, y `aria-current="true"` en el idioma actual.
  - `Footer` con props `{ locale }`: © con el año de compilación, correo, LinkedIn y GitHub.

- [ ] **Step 1: Escribir las pruebas que fallan.**

```ts
test("language switcher on home", async ({ page }) => {
  await page.goto("/"); await page.getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en\/$/);
});
test("mobile menu by keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 }); await page.goto("/");
  const btn = page.getByRole("button", { name: /menú|menu/i });
  await expect(btn).toHaveAttribute("aria-expanded", "false");
  await btn.focus(); await page.keyboard.press("Enter");
  await expect(btn).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation").getByRole("link", { name: /proyectos/i })).toBeVisible();
  await page.keyboard.press("Escape"); await expect(btn).toHaveAttribute("aria-expanded", "false");
});
test("desktop nav visible without JS", async ({ browser }) => {   // Review Focus 5 (parte cabecera)
  const p = await (await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } })).newPage();
  await p.goto("/"); await expect(p.getByRole("navigation").getByRole("link", { name: /proyectos/i })).toBeVisible();
});
```

- [ ] **Step 2: Ejecutar `npm run build && npm run test:e2e`.** Debe fallar.
- [ ] **Step 3: Implementar los cuatro componentes.**
  - Hay un único `<nav>` que sirve para móvil y escritorio, para que `getByRole("navigation")` sea inequívoco.
  - Menú móvil: `<button aria-expanded aria-controls>` más un script en línea que alterna el panel y lo cierra con Escape o al pulsar un enlace.
  - Por encima de `md` el menú es visible siempre, sin JavaScript.
- [ ] **Step 4: Verificar.** `npm run check && npm run build && npm run test:e2e` → PASS.
- [ ] **Step 5: Commit.** `feat: cabecera con selector de idioma, menú móvil y pie`

---

### Task 5: Datos del CV y secciones de la portada

**Files:**
- Create: `src/data/cv.ts`, `src/data/cv.test.ts`, `src/lib/dates.ts`, `src/lib/dates.test.ts`, `src/components/{Hero,About,Experience,Skills,Education,Contact,Section}.astro`, `src/views/HomeView.astro`, `public/cv/duarte-domingos-cv-es.pdf`, `public/cv/duarte-domingos-cv-en.pdf`
- Modify: `src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/ca/index.astro` (cada una solo renderiza `<HomeView locale="…" />`)
- Test: `src/data/cv.test.ts`, `src/lib/dates.test.ts`, `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: `Locale`, `Localized`, `pick`, `t` (tarea 2) y `BaseLayout` (tarea 3).
- Produces (en `src/data/cv.ts`):
  - `interface Job { company: string; role: Localized<string>; start: string /* "YYYY-MM" */; end: string | null; bullets: Localized<string[]>; stack: string[] }`
  - `interface Study { center: string; title: Localized<string>; start: number; end: number }`
  - `interface SkillGroup { name: Localized<string>; items: string[] }`
  - `interface SpokenLanguage { name: Localized<string>; level: Localized<string> }`
  - `profile: { name: string; email: string; eyebrow: Localized<string>; tagline: Localized<string>; about: Localized<string>; availability: Localized<string>; links: { linkedin: string; github: string }; cvPdf: Localized<string> }`
  - `jobs: Job[]`, `studies: Study[]`, `skills: SkillGroup[]`, `spokenLanguages: SpokenLanguage[]`
- Produces (en `src/lib/dates.ts`): `formatPeriod(start: string, end: string | null, locale: Locale): string`. Usa tablas propias de meses, no `Intl`, para que el resultado sea predecible:
  - es: `ene feb mar abr may jun jul ago sep oct nov dic`; presente: «actualidad»
  - en: `Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec`; presente: «Present»
  - ca: `gen febr març abr maig juny jul ag set oct nov des`; presente: «actualitat»
- Componentes: `Section` con props `{ id: string; title: string }` y slot. El resto recibe datos ya resueltos con `pick` (strings y arrays planos, sin `Localized`).

- [ ] **Step 1: Escribir las pruebas unitarias que fallan.**

```ts
// src/lib/dates.test.ts
test.each([
  ["2023-11", null, "es", "nov 2023 – actualidad"],
  ["2022-07", "2023-11", "en", "Jul 2022 – Nov 2023"],
  ["2023-11", null, "ca", "nov 2023 – actualitat"],
])("formatPeriod(%s,%s,%s)", (s, e, l, out) => expect(formatPeriod(s, e, l as Locale)).toBe(out));

// src/data/cv.test.ts — todo Localized tiene los 3 idiomas no vacíos; ningún texto menciona datos vetados
// Los nombres vetados se guardan solo como hashes SHA-256 en src/testing/vetted-words.ts (nunca en claro).
test("every localized string is filled and clean", () => {
  const all = collectLocalizedStrings({ profile, jobs, studies, skills, spokenLanguages }); // helper del propio test
  expect(all.length).toBeGreaterThan(0);
  for (const s of all) { expect(s.trim()).not.toBe(""); expect(findVettedWords(s)).toEqual([]); }
});
test("jobs ordered newest first", () => expect(jobs.map(j => j.company)).toEqual(["Tech-Value Ibérica (Var Group)", "BDR Informàtica"]));
```

`collectLocalizedStrings` recorre el objeto en profundidad, recoge las hojas de tipo string y comprueba que todo objeto con claves `es/en/ca` tenga las tres.

- [ ] **Step 2: Ejecutar `npm run test:unit`.** Debe fallar.
- [ ] **Step 3: Implementar `dates.ts` y `cv.ts`.** Los textos en ES/EN/CA salen de los CV de 2025 y del spec §3.2:
  - **Trabajo actual:** «Desarrollador de software», nov 2023 – actualidad, con estos puntos:
    - Conversión de mensajería financiera ISO 20022 → SWIFT MT940/MT950 con Java.
    - Automatización y validación de procesos de datos a partir de ficheros diarios en el sector bancario.
    - Clasificación de correos con IA en Python.
    - Desarrollo con Java y Spring en proyectos del grupo.
    - Stack: `Java, Spring, SQL, Python, SAS`.
  - **BDR Informàtica:** «Programador junior full-stack», jul 2022 – nov 2023.
    - Desarrollo full-stack con C#, Blazor, .NET y SQL.
    - Mantenimiento de sitios WordPress.
  - **Habilidades y formación:** las del spec §3.2.
  - `cvPdf`: es → `/cv/duarte-domingos-cv-es.pdf`, en → `/cv/duarte-domingos-cv-en.pdf`, ca → el de español.
- [ ] **Step 4: Ejecutar `npm run test:unit`.** Debe pasar.
- [ ] **Step 5: Copiar los PDF del CV, solo con confirmación de Duarte.** Los PDF de 2025 mencionan a un cliente por su nombre. Antes de copiarlos, preguntar a Duarte si acepta publicarlos tal cual o si prefiere entregar una versión sin ese nombre. Origen: los PDF del CV de 2025 que entregó Duarte (es y en).
- [ ] **Step 6: Escribir `tests/e2e/home.spec.ts`.**

```ts
for (const [path, h2] of [["/", "Experiencia"], ["/en/", "Experience"], ["/ca/", "Experiència"]] as const) {
  test(`sections ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: "Duarte Domingos" })).toBeVisible();
    for (const id of ["about","experience","projects","skills","education","contact"]) await expect(page.locator(`section#${id}`)).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 2, name: h2 })).toBeVisible();
  });
  test(`no horizontal scroll at 320px ${path}`, async ({ page }) => {   // Review Focus 3
    await page.setViewportSize({ width: 320, height: 700 }); await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
test("CV link downloads", async ({ page, request }) => {
  await page.goto("/"); const href = await page.getByRole("link", { name: /descargar cv/i }).first().getAttribute("href");
  expect((await request.get(href!)).status()).toBe(200);
});
test("all content visible without JS", async ({ browser }) => {   // Review Focus 5
  const p = await (await browser.newContext({ javaScriptEnabled: false })).newPage(); await p.goto("/");
  for (const id of ["about","experience","skills","contact"]) {
    await p.locator(`section#${id}`).scrollIntoViewIfNeeded();
    expect(await p.locator(`section#${id}`).evaluate(el => getComputedStyle(el).opacity)).toBe("1");
  }
});
```

- [ ] **Step 7: Implementar componentes y `HomeView`.**
  - El hero sigue la maqueta A: etiqueta en mono y color de acento, nombre en `h1`, tagline, botón primario «Ver proyectos» (`#projects`) y secundario «Descargar CV».
  - La aparición de secciones se hace solo con CSS (`animation-timeline: view()` dentro de `@supports` y `prefers-reduced-motion: no-preference`). El estado final siempre es `opacity: 1`.
  - Los textos de `Experience` usan `formatPeriod`.
  - La sección `#projects` queda vacía con su título; la tarea 6 la rellena.
- [ ] **Step 8: Verificar.** `npm run check && npm run lint && npm run test:unit && npm run build && npm run test:e2e` → PASS.
- [ ] **Step 9: Commit.** `feat: portada con experiencia, habilidades, formación y contacto`

---

### Task 6: Colección de proyectos y páginas de proyecto

**Files:**
- Create: `src/content.config.ts`, `src/lib/projects-core.ts`, `src/lib/projects-core.test.ts`, `src/lib/projects.ts`, `src/components/ProjectCard.astro`, `src/views/ProjectView.astro`, `src/pages/proyectos/[slug].astro`, `src/pages/en/projects/[slug].astro`, `src/pages/ca/projectes/[slug].astro`
- Create (contenido): `src/content/projects/{duartedomingos-net,dont-touch-the-duck,duarts-review}/{es,en,ca}.md` con `cover.png`, y `src/content/projects/typing-knight/es.md` (`draft: true`) con `cover.png`
- Create: `public/media/dont-touch-the-duck-demo.mp4`
- Modify: `src/views/HomeView.astro` (rejilla de `ProjectCard` en `#projects`)
- Test: `src/lib/projects-core.test.ts`, `tests/e2e/projects.spec.ts`

**Interfaces:**
- Consumes: `Locale`, `Localized`, `pathFor`, `alternates`, `t` (tarea 2); `BaseLayout` (tarea 3); `HomeView` (tarea 5).
- Produces (en `src/lib/projects-core.ts`, sin importar `astro:content`):
  - `interface ProjectFields { title: string; summary: string; year: number; stack: string[]; links?: { demo?: string; code?: string }; order?: number; draft: boolean }`
  - `interface RawEntry<D extends ProjectFields = ProjectFields> { id: string; data: D }`. El `id` del glob loader tiene la forma `"<slug>/<locale>"`.
  - `parseEntryId(id: string): { slug: string; locale: Locale }`. Si el id no es válido lanza `Error('Id de proyecto inválido: "<id>"')`.
  - `groupProjects<D extends ProjectFields>(entries: RawEntry<D>[]): { slug: string; byLocale: Localized<RawEntry<D>> }[]`
    - Excluye los slugs que tengan alguna versión con `draft: true`.
    - Si a un proyecto no borrador le falta un idioma, lanza `Error('Proyecto "<slug>" sin versión "<locale>"')`.
    - Orden: `order` ascendente (sin `order` al final), luego `year` descendente, luego `slug` alfabético.
- Produces (en `src/lib/projects.ts`):
  - `getProjects()`: `getCollection("projects")` → `groupProjects`.
  - `getProjectStaticPaths(locale: Locale)`: devuelve `{ params: { slug }, props: { slug, entry } }[]`.
- Esquema (`src/content.config.ts`): loader `glob({ pattern: "**/*.md", base: "./src/content/projects" })`. Campos zod como en el spec §5.3: `summary` con `max(140)`, `cover: image()`, `draft` con `default(false)`.

- [ ] **Step 1: Escribir las pruebas unitarias que fallan.**

```ts
const e = (id: string, d: Partial<ProjectFields> = {}) => ({ id, data: { title: id, summary: "s", year: 2021, stack: [], draft: false, ...d } });
const full = (slug: string, d: Partial<ProjectFields> = {}) => ["es","en","ca"].map(l => e(`${slug}/${l}`, d));
test("groups by slug", () => expect(groupProjects(full("a"))[0].byLocale.en.id).toBe("a/en"));
test("missing locale throws", () => expect(() => groupProjects([e("a/es"), e("a/en")])).toThrow('Proyecto "a" sin versión "ca"'));
test("drafts excluded even if incomplete", () => expect(groupProjects([e("k/es", { draft: true })])).toEqual([]));
test("sort: order, then year desc, then slug", () => expect(groupProjects([
  ...full("old", { year: 2020 }), ...full("new", { year: 2026 }), ...full("pinned", { year: 2019, order: 1 })]).map(p => p.slug)).toEqual(["pinned","new","old"]));
test("bad id", () => expect(() => parseEntryId("a/de")).toThrow('Id de proyecto inválido: "a/de"'));
```

- [ ] **Step 2: Ejecutar `npm run test:unit`.** Debe fallar.
- [ ] **Step 3: Implementar `projects-core.ts`.** Ejecutar `npm run test:unit`: debe pasar.
- [ ] **Step 4: Escribir el contenido.**
  - **duartedomingos-net:** año 2026, `order: 1`, stack `Astro, TypeScript, Tailwind CSS`, `links.code: https://github.com/DuarteDV/duartedomingos.net`. Su `cover.png` se crea en el paso 7.
  - **dont-touch-the-duck:** año 2021, stack `Unity, C#`, texto basado en `Personal 1/public/pages/DTTD.html`.
    - Portada: `Personal 1/assets/imgs/PatoMenu.png`.
    - Vídeo: copiar `Personal 1/assets/vids/Don't-Touch-The-Duck-DEMO.mp4` a `public/media/dont-touch-the-duck-demo.mp4` e incrustarlo en el cuerpo con `<video controls preload="none" poster>`.
  - **duarts-review:** año 2020, stack `PHP, HTML, CSS, JavaScript`. Portada: `Personal 1/assets/imgs/duartsreview_main.png`. Sin `links`. En el texto, aclarar que era un proyecto universitario centrado en el diseño.
  - **typing-knight:** solo `es.md`, con `draft: true`. La portada es un PNG neutro de 1200×750 generado con `sharp`.
  - No usar los GIF antiguos (hasta 55 MB).
- [ ] **Step 5: Escribir `tests/e2e/projects.spec.ts`.**

```ts
const slugs = ["duartedomingos-net", "dont-touch-the-duck", "duarts-review"];
for (const s of slugs) for (const p of [`/proyectos/${s}/`, `/en/projects/${s}/`, `/ca/projectes/${s}/`])
  test(`page ${p}`, async ({ page }) => { expect((await page.goto(p))?.status()).toBe(200); await expect(page.locator("h1")).toBeVisible(); });
test("draft is not published", async ({ page }) => {
  expect((await page.goto("/proyectos/typing-knight/"))?.status()).toBe(404);
  await page.goto("/"); await expect(page.getByText("Typing Knight")).toHaveCount(0);
});
test("switcher keeps the project", async ({ page }) => {   // Review Focus 1
  await page.goto("/proyectos/duarts-review/"); await page.getByRole("link", { name: "CA" }).click();
  await expect(page).toHaveURL(/\/ca\/projectes\/duarts-review\/$/);
});
test("no empty link buttons", async ({ page }) => {
  await page.goto("/proyectos/duarts-review/");
  await expect(page.getByRole("link", { name: /demo|código/i })).toHaveCount(0);
});
test("home lists 3 project cards linking to detail", async ({ page }) => {
  await page.goto("/en/"); await expect(page.locator("#projects article")).toHaveCount(3);
  await expect(page.locator('#projects a[href="/en/projects/dont-touch-the-duck/"]')).toHaveCount(1);
});
test("project page fits 320px", async ({ page }) => {   // Review Focus 3
  await page.setViewportSize({ width: 320, height: 700 }); await page.goto("/ca/projectes/dont-touch-the-duck/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
```

- [ ] **Step 6: Implementar el resto.**
  - `ProjectCard`: un `article` con la imagen (`<Image>` de `astro:assets`, `widths` 400/800), título, resumen y stack, enlazando a `pathFor(locale, {kind:"project", slug})`.
  - `ProjectView`: título, año, stack, portada, cuerpo renderizado con `render(entry)`, enlaces solo si existen y enlace «volver» a `${homePath}#projects`.
  - Las tres páginas `[slug].astro` pasan a `BaseLayout` estas `alternates`: `alternates({kind:"project", slug})`.
- [ ] **Step 7: Crear la portada del proyecto de esta web.** Compilar, levantar `preview` y hacer con Playwright una captura de `/` a 1200×750 en modo claro. Guardarla como `src/content/projects/duartedomingos-net/cover.png` con un script de un solo uso en el scratchpad, no en el repo.
- [ ] **Step 8: Verificar.** `npm run check && npm run lint && npm run test:unit && npm run build && npm run test:e2e` → PASS.
- [ ] **Step 9: Commit.** `feat: proyectos en Markdown con páginas de detalle en tres idiomas`

---

### Task 7: Página 404, sitemap, robots, datos estructurados e imágenes OG

**Files:**
- Create: `src/pages/404.astro`, `public/robots.txt`, `src/lib/seo.ts`, `src/lib/seo.test.ts`, `src/pages/og/[locale].png.ts`
- Modify: `src/views/HomeView.astro` (pasa `jsonLd={personJsonLd(locale)}` y `ogImage={`/og/${locale}.png`}`), `src/views/ProjectView.astro` (`ogImage` = URL de la portada optimizada a 1200 px de ancho)
- Test: `src/lib/seo.test.ts`, `tests/e2e/seo.spec.ts`

**Interfaces:**
- Consumes: `profile`, `spokenLanguages`, `pick` (tarea 5); `t`, `getLocaleFromPath`, `pathFor` (tarea 2).
- Produces: `personJsonLd(locale: Locale): Record<string, unknown>` en `src/lib/seo.ts`.

- [ ] **Step 1: Escribir las pruebas que fallan.**

```ts
// src/lib/seo.test.ts
test("person json-ld", () => {
  const j = personJsonLd("en");
  expect(j).toMatchObject({ "@context": "https://schema.org", "@type": "Person", name: "Duarte Domingos", url: "https://duartedomingos.net/en/" });
  expect(j.sameAs).toEqual(["https://www.linkedin.com/in/duarte-domingos", "https://github.com/DuarteDV"]);
  expect(j.knowsLanguage).toHaveLength(5);
});

// tests/e2e/seo.spec.ts
for (const [p, lang, home] of [["/nope/","es","/"],["/en/nope/","en","/en/"],["/ca/res/","ca","/ca/"]] as const)
  test(`404 in ${lang}`, async ({ page }) => {   // Review Focus 4
    expect((await page.goto(p))?.status()).toBe(404);
    const block = page.locator(`[data-404-lang="${lang}"]`);
    await expect(block).toBeVisible(); await expect(block.getByRole("link")).toHaveAttribute("href", home);
  });
test("robots and sitemap", async ({ request }) => {
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap: https://duartedomingos.net/sitemap-index.xml");
  expect((await request.get("/sitemap-index.xml")).status()).toBe(200);
});
test("og image resolves", async ({ page, request }) => {
  await page.goto("/ca/"); const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  const r = await request.get(new URL(og!).pathname); expect(r.status()).toBe(200); expect(r.headers()["content-type"]).toContain("image/png");
});
```

- [ ] **Step 2: Ejecutar `npm run test:unit && npm run build && npm run test:e2e`.** Debe fallar.
- [ ] **Step 3: Implementar `seo.ts` y `404.astro`.**
  - La 404 renderiza tres bloques `[data-404-lang]`. Solo el de `es` es visible sin JavaScript.
  - Un script en línea muestra el bloque de `getLocaleFromPath(location.pathname)`; la lógica de prefijos se replica inline con los mismos casos que en la tarea 2.
  - Usa `BaseLayout` con `locale="es"` y `<meta name="robots" content="noindex">`.
- [ ] **Step 4: Implementar `og/[locale].png.ts`.**
  - `getStaticPaths` para los tres idiomas.
  - satori genera un SVG de 1200×630 con el estilo A: fondo `#FAFAF7`, etiqueta en mono `#0F6E56`, nombre a 88 px y tagline.
  - `@resvg/resvg-js` lo convierte a PNG.
  - Fuente: el archivo `.woff` de Geist peso 500 de Fontsource, porque satori no lee woff2.
- [ ] **Step 5: Crear `robots.txt`.** `User-agent: *`, `Allow: /` y la línea `Sitemap`.
- [ ] **Step 6: Verificar.** `npm run check && npm run test:unit && npm run build && npm run test:e2e` → PASS.
- [ ] **Step 7: Commit.** `feat: 404 trilingüe, sitemap, datos estructurados e imágenes para compartir`

---

### Task 8: Controles de calidad (accesibilidad, enlaces, Lighthouse)

**Files:**
- Create: `tests/e2e/built-pages.ts`, `tests/e2e/a11y.spec.ts`, `tests/e2e/links.spec.ts`, `lighthouserc.cjs`
- Modify: `package.json` (añade `@lhci/cli` y el script `"lhci": "lhci autorun"`)

**Interfaces:**
- Produces: `listBuiltPages(): string[]` en `tests/e2e/built-pages.ts`. Recorre `dist/**/index.html` y devuelve rutas con barra final (`/`, `/en/`, `/proyectos/duarts-review/`…), excluyendo `/og/`.

- [ ] **Step 1: Escribir las pruebas.**
  - `a11y.spec.ts`: para cada ruta de `listBuiltPages()`, en modo claro y oscuro, `new AxeBuilder({ page }).analyze()` y `expect(violations.filter(v => ["serious","critical"].includes(v.impact!))).toEqual([])`.
  - `links.spec.ts`: para cada ruta, todos los `a[href^="/"]` y `img[src^="/"]` responden 200 con `request.get` (sin fragmento). Se deduplican antes de pedir.
- [ ] **Step 2: Ejecutar `npm run build && npm run test:e2e`.** Corregir lo que salga (contraste del acento en oscuro, `alt`, nombres accesibles) hasta tener 0 fallos.
- [ ] **Step 3: Crear `lighthouserc.cjs`.**
  - `collect: { staticDistDir: "./dist", url: ["/", "/en/", "/ca/", "/proyectos/dont-touch-the-duck/"] }`
  - `assert: { assertions: { "categories:performance": ["error",{minScore:0.95}], "categories:accessibility": ["error",{minScore:0.95}], "categories:best-practices": ["error",{minScore:0.95}], "categories:seo": ["error",{minScore:0.95}] } }`
  - `upload: { target: "filesystem", outputDir: ".lighthouseci" }`, para no publicar informes. Añadir `.lighthouseci/` a `.gitignore`.
- [ ] **Step 4: Ejecutar `npm run lhci`.** Las cuatro categorías deben quedar ≥ 0.95 en las cuatro URL. Si no, corregir las causas (tamaños de imagen, fuentes con `font-display: swap`, etc.).
- [ ] **Step 5: Commit.** `test: accesibilidad, enlaces internos y Lighthouse sobre todas las páginas`

---

### Task 9: Firebase Hosting y GitHub Actions

**Files:**
- Create: `firebase.json`, `.firebaserc`, `.github/workflows/ci.yml`, `README.md`

**Interfaces:**
- Consumes: scripts de npm (tarea 1) y `npm run lhci` (tarea 8).
- Produces:
  - Secreto de GitHub `FIREBASE_SERVICE_ACCOUNT_PLUCKY_LANE_362615`.
  - Variable de GitHub `PUBLIC_CF_BEACON_TOKEN`, que se expone en el paso de build como variable de entorno.

- [ ] **Step 1: Crear `.firebaserc`** con `{ "projects": { "default": "plucky-lane-362615" } }`.
- [ ] **Step 2: Crear `firebase.json`.**
  - `hosting.public: "dist"`, `cleanUrls: true`, `trailingSlash: true`.
  - `ignore` por defecto.
  - `headers`:
    - `/_astro/**` → `Cache-Control: public, max-age=31536000, immutable`.
    - `**` → `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- [ ] **Step 3: Verificar en local con el emulador.** `npm run build && npx firebase-tools emulators:start --only hosting` y comprobar con `curl -sI`:
  - `/en` redirige a `/en/`.
  - `/_astro/<archivo>.css` lleva la cabecera `immutable`.
  - `/en/nope/` devuelve 404 con la página propia.
- [ ] **Step 4: Crear `.github/workflows/ci.yml`.**
  - Disparadores: `pull_request` y `push` a `main`.
  - **Job `test`:**
    1. `actions/checkout`, `actions/setup-node` (Node 24, caché npm), `npm ci`, `npx playwright install --with-deps chromium`.
    2. `npm run check`, `npm run lint`, `npm run test:unit`.
    3. `npm run build` con `env: PUBLIC_CF_BEACON_TOKEN: ${{ vars.PUBLIC_CF_BEACON_TOKEN }}`.
    4. `npm run test:e2e`, `npm run lhci`.
    5. Subir `dist` como artefacto.
  - **Job `deploy`** (`needs: test`): descargar `dist` y usar `FirebaseExtended/action-hosting-deploy@v0` con `repoToken: ${{ secrets.GITHUB_TOKEN }}`, `firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_PLUCKY_LANE_362615 }}` y `projectId: plucky-lane-362615`.
    - En `push` a `main`, `channelId: live`.
    - En PR, sin `channelId` (canal de vista previa).
- [ ] **Step 5: Escribir `README.md`.** Breve: qué es, cómo ejecutarlo (`npm i`, `npm run dev`), cómo añadir un proyecto (carpeta con `es.md`, `en.md`, `ca.md` y `cover.png`, más el ejemplo del frontmatter) y cómo se despliega.
- [ ] **Step 6: Commit.** `ci: despliegue en Firebase Hosting con vistas previas por PR`
- [ ] **Step 7: Pasos manuales de Duarte, guiados en el chat, sin que Claude toque credenciales.**
  1. Crear el repo público `DuarteDV/duartedomingos.net` en GitHub (sin README).
  2. Verificar `duartedomingos@outlook.es` en GitHub → Settings → Emails.
  3. En `web/`, ejecutar `npx firebase-tools login`, después `npx firebase-tools init hosting:github`: crea la cuenta de servicio y sube el secreto. **No** sobrescribir `ci.yml` ni `firebase.json`.
  4. En Cloudflare → Web Analytics, añadir `duartedomingos.net` con la opción «sin DNS»/JS snippet, copiar el token y crearlo como *variable* (no secreto) `PUBLIC_CF_BEACON_TOKEN` en el repo de GitHub.
  5. Con el OK explícito de Duarte en el chat, Claude añade el `remote` y hace push de `main`.

---

### Task 10: Revisión y lanzamiento

- [ ] **Step 1: Crear la rama `revision-textos` y abrir una PR.** El CI publica la URL de vista previa.
- [ ] **Step 2: Duarte revisa** textos, imágenes y PDF en los tres idiomas, y decide los pendientes del spec §10. Claude aplica los cambios en la misma rama.
- [ ] **Step 3: Con el OK de Duarte, merge a `main`.** El CI publica en `live`.
- [ ] **Step 4: Comprobar en producción.**
  - `curl -sI https://duartedomingos.net/` → 200 por HTTPS, sin la cabecera `last-modified` de 2023.
  - `/en/` y `/ca/` responden.
  - El inspector de publicaciones de LinkedIn muestra la imagen OG.
  - Las visitas aparecen en Cloudflare Web Analytics en menos de 24 h.
- [ ] **Step 5: Avisar a Duarte de la clave de Google Maps de la web antigua.** Está publicada en `Personal 1/public/index.html` (`maps.googleapis.com/maps/api/js?key=…`). Debería restringirla o revocarla en Google Cloud, porque sigue en el historial de GitHub del repo `Personal`.
