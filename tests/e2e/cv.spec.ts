import { expect, test } from "@playwright/test";

const countPdfPages = (pdf: Buffer) =>
  (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;

for (const [locale, lang, experience] of [
  ["es", "es", "Experiencia laboral"],
  ["en", "en", "Work experience"],
  ["ca", "ca", "Experiència laboral"],
] as const) {
  test(`printable CV in ${locale}`, async ({ page }) => {
    expect((await page.goto(`/cv-print/${locale}/`))?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Duarte Domingos");
    await expect(page.getByText(experience)).toBeVisible();
    await expect(page.getByText("Vargroup Andorra").first()).toBeVisible();
    const photo = page.locator("img").first();
    expect(await photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  });

  test(`CV fits on a single A4 page in ${locale}`, async ({ page }) => {
    await page.goto(`/cv-print/${locale}/`);
    await page.emulateMedia({ media: "print" });
    const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
    expect(countPdfPages(pdf)).toBe(1);
  });
}

test("each language links its own CV PDF", async ({ page, request }) => {
  for (const [path, file] of [
    ["/", "/cv/duarte-domingos-cv-es.pdf"],
    ["/en/", "/cv/duarte-domingos-cv-en.pdf"],
    ["/ca/", "/cv/duarte-domingos-cv-ca.pdf"],
  ]) {
    await page.goto(path);
    await expect(page.locator("#contact a[download]")).toHaveAttribute("href", file);
    expect((await request.get(file)).status()).toBe(200);
  }
});

test("printable CVs stay out of the sitemap", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap-0.xml")).text();
  expect(sitemap).not.toContain("cv-print");
});

// The sheet clips overflow, so a too-long CV would silently lose text instead of adding a page.
for (const locale of ["es", "en", "ca"])
  test(`CV content isn't clipped in ${locale}`, async ({ page }) => {
    await page.goto(`/cv-print/${locale}/`);
    await page.emulateMedia({ media: "print" });
    const overflow = await page.evaluate(() =>
      [".page", "aside", "main"].map((sel) => {
        const el = document.querySelector(sel)!;
        return { sel, extra: el.scrollHeight - el.clientHeight };
      }),
    );
    expect(overflow.filter((o) => o.extra > 0)).toEqual([]);
  });
