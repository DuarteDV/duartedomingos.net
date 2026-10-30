import { expect, test } from "@playwright/test";
import { listBuiltPages } from "./built-pages";

test("internal links and images resolve", async ({ page, request }) => {
  const targets = new Set<string>();
  for (const path of listBuiltPages()) {
    await page.goto(path);
    const found = await page.$$eval('a[href^="/"], img[src^="/"], video[src^="/"]', (els) =>
      els.map((el) => el.getAttribute("href") ?? el.getAttribute("src") ?? ""),
    );
    for (const url of found) targets.add(url.split("#")[0] || "/");
  }

  const broken: string[] = [];
  for (const url of targets) {
    const res = await request.get(url);
    if (res.status() !== 200) broken.push(`${url} → ${res.status()}`);
  }
  expect(broken).toEqual([]);
  expect(targets.size).toBeGreaterThan(10);
});
