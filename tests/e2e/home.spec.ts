import { expect, test } from "@playwright/test";

const sectionIds = ["about", "experience", "projects", "skills", "education", "contact"];

for (const [path, h2] of [
  ["/", "Experiencia"],
  ["/en/", "Experience"],
  ["/ca/", "Experiència"],
] as const) {
  test(`sections ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: "Duarte Domingos" })).toBeVisible();
    for (const id of sectionIds) await expect(page.locator(`section#${id}`)).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 2, name: h2 })).toBeVisible();
  });

  // Review Focus 3
  test(`no horizontal scroll at 320px ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}

test("CV link downloads", async ({ page, request }) => {
  await page.goto("/");
  const href = await page
    .getByRole("link", { name: /descargar cv/i })
    .first()
    .getAttribute("href");
  expect((await request.get(href!)).status()).toBe(200);
});

test("experience shows the current job period", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("#experience")).toContainText("Nov 2023 – Present");
});

// Review Focus 5
test("all content visible without JS", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const p = await context.newPage();
  await p.goto("/");
  for (const id of ["about", "experience", "skills", "contact"]) {
    const section = p.locator(`section#${id}`);
    await section.scrollIntoViewIfNeeded();
    await p.waitForTimeout(400);
    expect(await section.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  }
  await context.close();
});
