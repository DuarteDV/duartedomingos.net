import { expect, test } from "@playwright/test";

for (const [path, lang] of [
  ["/", "es"],
  ["/en/", "en"],
  ["/ca/", "ca"],
] as const) {
  test(`home ${path} is served in ${lang}`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
  });
}
