import type { Locale, Localized } from "../i18n/utils";

// Own tables instead of Intl so the output is identical on every machine.
const months: Localized<string[]> = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ca: ["gen", "febr", "març", "abr", "maig", "juny", "jul", "ag", "set", "oct", "nov", "des"],
};

const present: Localized<string> = { es: "actualidad", en: "Present", ca: "actualitat" };

function formatMonth(yearMonth: string, locale: Locale): string {
  const [year, month] = yearMonth.split("-").map(Number);
  return `${months[locale][month - 1]} ${year}`;
}

export function formatPeriod(start: string, end: string | null, locale: Locale): string {
  const to = end === null ? present[locale] : formatMonth(end, locale);
  return `${formatMonth(start, locale)} – ${to}`;
}
