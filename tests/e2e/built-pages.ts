import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const dist = join(process.cwd(), "dist");

/** Every page in the build as a site path with trailing slash ("/", "/en/projects/x/"…). */
export function listBuiltPages(): string[] {
  const pages: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "og" && entry.name !== "_astro") walk(full);
      } else if (entry.name === "index.html") {
        const rel = relative(dist, dir).split(sep).join("/");
        pages.push(rel ? `/${rel}/` : "/");
      }
    }
  };
  walk(dist);
  return pages.sort();
}
