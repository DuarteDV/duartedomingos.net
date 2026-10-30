import { expect, test } from "@playwright/test";

// Review Focus 4
for (const [p, lang, home] of [
  ["/nope/", "es", "/"],
  ["/en/nope/", "en", "/en/"],
  ["/ca/res/", "ca", "/ca/"],
] as const)
  test(`404 in ${lang}`, async ({ page }) => {
    expect((await page.goto(p))?.status()).toBe(404);
    const block = page.locator(`[data-404-lang="${lang}"]`);
    await expect(block).toBeVisible();
    await expect(block.getByRole("link")).toHaveAttribute("href", home);
  });

test("robots and sitemap", async ({ request }) => {
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Sitemap: https://duartedomingos.net/sitemap-index.xml",
  );
  expect((await request.get("/sitemap-index.xml")).status()).toBe(200);
});

test("og image resolves", async ({ page, request }) => {
  await page.goto("/ca/");
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  const r = await request.get(new URL(og!).pathname);
  expect(r.status()).toBe(200);
  expect(r.headers()["content-type"]).toContain("image/png");
});

test("project og image resolves", async ({ page, request }) => {
  await page.goto("/en/projects/duarts-review/");
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect((await request.get(new URL(og!).pathname)).status()).toBe(200);
});

test("home has Person structured data", async ({ page }) => {
  await page.goto("/");
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(raw!)).toMatchObject({ "@type": "Person", name: "Duarte Domingos" });
});
