import { expect, test } from "@playwright/test";

test("head has canonical, hreflang and OG", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://duartedomingos.net/en/",
  );
  for (const [l, h] of [
    ["es", "/"],
    ["en", "/en/"],
    ["ca", "/ca/"],
    ["x-default", "/"],
  ])
    await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveAttribute(
      "href",
      `https://duartedomingos.net${h}`,
    );
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
});

test("no analytics beacon without token", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('script[src*="cloudflareinsights"]')).toHaveCount(0);
});
