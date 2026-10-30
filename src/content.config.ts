import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One folder per project: <slug>/{es,en,ca}.md plus its cover image (spec §5.3).
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(140),
      year: z.number().int(),
      stack: z.array(z.string()),
      cover: image(),
      links: z
        .object({
          demo: z.url().optional(),
          code: z.url().optional(),
        })
        .optional(),
      order: z.number().int().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
