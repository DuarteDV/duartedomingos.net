// Prints the CV pages (src/pages/cv-print/) to public/cv/*.pdf. Run with `npm run cv`,
// which builds the site first; commit the resulting PDFs.
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

// Same port as Playwright: Astro allows one preview server per project, so reuse it if running.
const port = 4321;
const base = `http://localhost:${port}`;
const astro = fileURLToPath(new URL("../node_modules/astro/bin/astro.mjs", import.meta.url));
const outDir = fileURLToPath(new URL("../public/cv/", import.meta.url));

async function isUp() {
  try {
    return (await fetch(`${base}/cv-print/es/`)).ok;
  } catch {
    return false;
  }
}

const server = (await isUp())
  ? null
  : spawn(process.execPath, [astro, "preview", "--port", String(port)], { stdio: "ignore" });

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    if (await isUp()) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Preview server didn't start on ${base}`);
}

try {
  await waitForServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });
  for (const locale of ["es", "en", "ca"]) {
    await page.goto(`${base}/cv-print/${locale}/`, { waitUntil: "networkidle" });
    const path = `${outDir}duarte-domingos-cv-${locale}.pdf`;
    await page.pdf({ path, preferCSSPageSize: true, printBackground: true });
    console.log(`CV written: public/cv/duarte-domingos-cv-${locale}.pdf`);
  }
  await browser.close();
} finally {
  server?.kill();
}
