---
title: duartedomingos.net
summary: My personal website, rebuilt from scratch with Astro. Static, fast, accessible and in three languages.
year: 2026
stack: [Astro, TypeScript, Tailwind CSS, Playwright]
cover: ./cover.png
links:
  code: https://github.com/DuarteDV/duartedomingos.net
order: 1
---

The site you're looking at. The first version, from 2022, was a Bootstrap template with the HTML copied three times, once per language. I rebuilt it from scratch so it also shows how I work on the front-end.

## Key decisions

- **Astro, no JavaScript by default.** The whole site is generated as static HTML. There are only three small scripts: light/dark mode, the mobile menu and the 404 page.
- **Three languages without duplicated code.** Routes, interface text and content are resolved per language in a single place; components know nothing about languages.
- **Validated content.** Each project is a folder with one Markdown file per language. If a field or a language is missing, the build fails with a clear message.
- **Automated quality.** Unit tests with Vitest, end-to-end tests with Playwright, an axe accessibility audit on every page and Lighthouse with a minimum score of 95 in every category.
- **Continuous deployment.** Every change goes through GitHub Actions and is published to Firebase Hosting, with a preview URL for each pull request.
