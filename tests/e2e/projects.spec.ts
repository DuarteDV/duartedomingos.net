import { expect, test } from "@playwright/test";

const slugs = ["duartedomingos-net", "carefit", "dont-touch-the-duck", "duarts-review"];

for (const s of slugs)
  for (const p of [`/proyectos/${s}/`, `/en/projects/${s}/`, `/ca/projectes/${s}/`])
    test(`page ${p}`, async ({ page }) => {
      expect((await page.goto(p))?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
    });

test("draft is not published", async ({ page }) => {
  expect((await page.goto("/proyectos/typing-knight/"))?.status()).toBe(404);
  await page.goto("/");
  await expect(page.getByText("Typing Knight")).toHaveCount(0);
});

// Review Focus 1
test("switcher keeps the project", async ({ page }) => {
  await page.goto("/proyectos/duarts-review/");
  await page.getByRole("link", { name: "CA", exact: true }).click();
  await expect(page).toHaveURL(/\/ca\/projectes\/duarts-review\/$/);
});

test("no empty link buttons", async ({ page }) => {
  await page.goto("/proyectos/duarts-review/");
  await expect(page.getByRole("link", { name: /demo|código/i })).toHaveCount(0);
});

test("code link shown when present", async ({ page }) => {
  await page.goto("/en/projects/duartedomingos-net/");
  await expect(page.getByRole("link", { name: "See code" })).toHaveAttribute(
    "href",
    "https://github.com/DuarteDV/duartedomingos.net",
  );
});

test("back link returns to the projects section", async ({ page }) => {
  await page.goto("/ca/projectes/dont-touch-the-duck/");
  await expect(page.getByRole("link", { name: "Tornar als projectes" })).toHaveAttribute(
    "href",
    "/ca/#projects",
  );
});

test("home lists 3 project cards linking to detail", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("#projects article")).toHaveCount(4);
  await expect(page.locator('#projects a[href="/en/projects/dont-touch-the-duck/"]')).toHaveCount(
    1,
  );
});

// Review Focus 3
test("project page fits 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/ca/projectes/dont-touch-the-duck/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("CareFit is listed right after this website (newest first)", async ({ page }) => {
  await page.goto("/");
  const titles = await page.locator("#projects article h3").allTextContents();
  expect(titles.map((t) => t.trim()).slice(0, 2)).toEqual(["duartedomingos.net", "CareFit"]);
});

for (const path of ["/proyectos/carefit/", "/en/projects/carefit/", "/ca/projectes/carefit/"])
  test(`CareFit shows a screenshot gallery ${path}`, async ({ page }) => {
    await page.goto(path);
    const shots = page.locator("[data-gallery] img");
    await expect(shots).toHaveCount(5);
    for (const shot of await shots.all()) {
      await shot.scrollIntoViewIfNeeded();
      expect((await shot.getAttribute("alt"))?.length).toBeGreaterThan(5);
      expect(await shot.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    }
  });

test("projects without a gallery render none", async ({ page }) => {
  await page.goto("/proyectos/duarts-review/");
  await expect(page.locator("[data-gallery]")).toHaveCount(0);
});
