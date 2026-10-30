import { expect, test } from "vitest";
import { findVettedWords } from "../testing/vetted-words";
import { jobs, profile, skills, spokenLanguages, studies } from "./cv";

function isLocalized(value: object): boolean {
  return "es" in value || "en" in value || "ca" in value;
}

function collectLocalizedStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectLocalizedStrings(v, out));
  else if (value && typeof value === "object") {
    if (isLocalized(value)) expect(Object.keys(value).sort()).toEqual(["ca", "en", "es"]);
    Object.values(value).forEach((v) => collectLocalizedStrings(v, out));
  }
  return out;
}

test("every localized string is filled and clean", () => {
  const all = collectLocalizedStrings({ profile, jobs, studies, skills, spokenLanguages });
  expect(all.length).toBeGreaterThan(0);
  for (const s of all) {
    expect(s.trim()).not.toBe("");
    expect(findVettedWords(s)).toEqual([]);
  }
});

test("jobs ordered newest first", () =>
  expect(jobs.map((j) => [j.company, j.start])).toEqual([
    ["Vargroup Andorra", "2026-01"],
    ["Vargroup Andorra", "2023-11"],
    ["BDR Informàtica", "2022-07"],
  ]));

test("consecutive jobs don't leave gaps", () => {
  for (let i = 0; i + 1 < jobs.length; i++) expect(jobs[i + 1].end).toBe(jobs[i].start);
});

// The SWIFT conversion was a short task: it must not lead the banking role.
test("banking role leads with data work, not financial messaging", () => {
  const banking = jobs[1].bullets;
  for (const locale of ["es", "en", "ca"] as const) {
    expect(banking[locale][0]).toMatch(/Python|Snowflake/);
    expect(banking[locale].at(-1)).toMatch(/SWIFT/);
  }
});

test("each language has its own CV PDF", () =>
  expect(profile.cvPdf).toEqual({
    es: "/cv/duarte-domingos-cv-es.pdf",
    en: "/cv/duarte-domingos-cv-en.pdf",
    ca: "/cv/duarte-domingos-cv-ca.pdf",
  }));
