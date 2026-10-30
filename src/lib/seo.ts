import { profile, spokenLanguages } from "../data/cv";
import { pathFor, pick, type Locale } from "../i18n/utils";

const site = "https://duartedomingos.net";

/** schema.org Person for the home page of each locale. */
export function personJsonLd(locale: Locale): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: new URL(pathFor(locale, { kind: "home" }), site).href,
    jobTitle: pick(profile.eyebrow, locale).split(" · ")[0],
    email: `mailto:${profile.email}`,
    sameAs: [profile.links.linkedin, profile.links.github],
    knowsLanguage: spokenLanguages.map((language) => pick(language.name, locale)),
  };
}
