import { expect, test } from "@playwright/test";

test("language switcher on home", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/$/);
});

test("mobile menu by keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  const btn = page.getByRole("button", { name: /menú|menu/i });
  await expect(btn).toHaveAttribute("aria-expanded", "false");
  await btn.focus();
  await page.keyboard.press("Enter");
  await expect(btn).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("navigation").getByRole("link", { name: /proyectos/i }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(btn).toHaveAttribute("aria-expanded", "false");
});

// Review Focus 5 (header part)
test("desktop nav visible without JS", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1280, height: 800 },
  });
  const p = await context.newPage();
  await p.goto("/");
  await expect(p.getByRole("navigation").getByRole("link", { name: /proyectos/i })).toBeVisible();
  await context.close();
});

test("footer shows contact links", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/duarte-domingos",
  );
  await expect(footer.getByRole("link", { name: /github/i })).toHaveAttribute(
    "href",
    "https://github.com/DuarteDV",
  );
});
