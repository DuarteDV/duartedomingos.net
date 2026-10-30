// Pure grouping/validation of project entries, kept free of astro:content so it is unit-testable.
import { isLocale, locales, type Locale, type Localized } from "../i18n/utils";

export interface ProjectFields {
  title: string;
  summary: string;
  year: number;
  stack: string[];
  links?: { demo?: string; code?: string };
  order?: number;
  draft: boolean;
}

/** `id` comes from the glob loader as "<slug>/<locale>". */
export interface RawEntry<D extends ProjectFields = ProjectFields> {
  id: string;
  data: D;
}

export interface ProjectGroup<D extends ProjectFields = ProjectFields> {
  slug: string;
  byLocale: Localized<RawEntry<D>>;
}

export function parseEntryId(id: string): { slug: string; locale: Locale } {
  const parts = id.split("/");
  const [slug, locale] = parts;
  if (parts.length !== 2 || !slug || !locale || !isLocale(locale)) {
    throw new Error(`Id de proyecto inválido: "${id}"`);
  }
  return { slug, locale };
}

function compare(a: ProjectFields & { slug: string }, b: ProjectFields & { slug: string }): number {
  const orderA = a.order ?? Number.POSITIVE_INFINITY;
  const orderB = b.order ?? Number.POSITIVE_INFINITY;
  if (orderA !== orderB) return orderA - orderB;
  if (a.year !== b.year) return b.year - a.year;
  return a.slug.localeCompare(b.slug);
}

export function groupProjects<D extends ProjectFields>(entries: RawEntry<D>[]): ProjectGroup<D>[] {
  const bySlug = new Map<string, Partial<Localized<RawEntry<D>>>>();
  for (const entry of entries) {
    const { slug, locale } = parseEntryId(entry.id);
    bySlug.set(slug, { ...bySlug.get(slug), [locale]: entry });
  }

  const groups: ProjectGroup<D>[] = [];
  for (const [slug, partial] of bySlug) {
    if (Object.values(partial).some((entry) => entry?.data.draft)) continue;
    for (const locale of locales) {
      if (!partial[locale]) throw new Error(`Proyecto "${slug}" sin versión "${locale}"`);
    }
    groups.push({ slug, byLocale: partial as Localized<RawEntry<D>> });
  }

  return groups.sort((a, b) =>
    compare({ ...a.byLocale.es.data, slug: a.slug }, { ...b.byLocale.es.data, slug: b.slug }),
  );
}
