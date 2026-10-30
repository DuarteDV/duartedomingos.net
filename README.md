# duartedomingos.net

My personal website and portfolio, available in Spanish, English and Catalan. Built with [Astro](https://astro.build), TypeScript and Tailwind CSS, deployed to Firebase Hosting.

## Running it locally

```bash
npm install
npm run dev
```

| Command             | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Development server at `http://localhost:4321`      |
| `npm run build`     | Static build into `dist/`                          |
| `npm run check`     | Type and template checks (`astro check`)           |
| `npm run lint`      | ESLint and Prettier                                |
| `npm run test:unit` | Unit tests (Vitest)                                |
| `npm run test:e2e`  | End-to-end and accessibility tests (Playwright); run `npm run build` first |
| `npm run lhci`      | Lighthouse CI over `dist/` (minimum 95 everywhere) |

## Adding a project

Create a folder in `src/content/projects/<slug>/` with a cover image and one Markdown file per language: `es.md`, `en.md` and `ca.md`. The build fails if a language is missing.

```markdown
---
title: My project
summary: One line, 140 characters at most.
year: 2026
stack: [Flutter, Dart]
cover: ./cover.png
links:
  demo: https://example.com
  code: https://github.com/DuarteDV/my-project
order: 2 # optional, lower comes first
draft: false # true hides it from the site
---

Project description in Markdown.
```

The project appears on the home page and gets its own page at `/proyectos/<slug>/`, `/en/projects/<slug>/` and `/ca/projectes/<slug>/`.

## Editing the CV

Experience, education, skills and languages live in `src/data/cv.ts`, with every text in the three languages. Interface text is in `src/i18n/{es,en,ca}.json`.

The downloadable PDFs in `public/cv/` are generated from that same data: `src/pages/cv-print/` lays out an A4 page per language and `npm run cv` builds the site and prints the three PDFs. Run it after changing the CV data and commit the PDFs.

## Deployment

GitHub Actions (`.github/workflows/ci.yml`) runs every check on each pull request and push to `main`:

- **Pull requests** are published to a temporary Firebase preview channel, and the URL is posted on the PR.
- **Pushes to `main`** are published to the live site.

The workflow needs the `FIREBASE_SERVICE_ACCOUNT_PLUCKY_LANE_362615` secret and, for analytics, the `PUBLIC_CF_BEACON_TOKEN` variable (Cloudflare Web Analytics, no cookies).
