import ca from "./ca.json";
import en from "./en.json";
import es from "./es.json";

export const locales = ["es", "en", "ca"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export type Localized<T> = Record<Locale, T>;
export type UiKey = keyof typeof es;

const dictionaries: Localized<Record<UiKey, string>> = { es, en, ca };

// URL segment for project pages, translated per locale.
const projectSegment: Localized<string> = { es: "proyectos", en: "projects", ca: "projectes" };

export type PageRef = { kind: "home" } | { kind: "project"; slug: string };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocaleFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  return isLocale(first) && first !== defaultLocale ? first : defaultLocale;
}

export function t(locale: Locale, key: UiKey): string {
  return dictionaries[locale][key];
}

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

export function pathFor(locale: Locale, page: PageRef): string {
  const prefix = localePrefix(locale);
  if (page.kind === "home") return prefix;
  return `${prefix}${projectSegment[locale]}/${page.slug}/`;
}

export function alternates(page: PageRef): Localized<string> {
  return { es: pathFor("es", page), en: pathFor("en", page), ca: pathFor("ca", page) };
}
