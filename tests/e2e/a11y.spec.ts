import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { listBuiltPages } from "./built-pages";

const pages = [...listBuiltPages(), "/en/does-not-exist/"];

test("build contains the expected pages", () => expect(pages.length).toBeGreaterThanOrEqual(13));

for (const path of pages)
  for (const colorScheme of ["light", "dark"] as const)
    test(`a11y ${path} (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page }).analyze();
      const serious = violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(serious).toEqual([]);
    });
