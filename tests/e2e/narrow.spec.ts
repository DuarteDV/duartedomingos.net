import { expect, test } from "@playwright/test";
import { listBuiltPages } from "./built-pages";

// Review Focus 3: no page may scroll sideways on a 320 px screen, in any language.
// Printable CVs are fixed A4 documents, not responsive pages.
for (const path of [
  ...listBuiltPages().filter((p) => !p.startsWith("/cv-print/")),
  "/nope/",
  "/en/nope/",
  "/ca/res/",
])
  test(`fits 320px ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      320,
    );
  });
