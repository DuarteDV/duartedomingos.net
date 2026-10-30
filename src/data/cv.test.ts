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
  expect(jobs.map((j) => j.company)).toEqual([
    "Tech-Value Ibérica (Var Group)",
    "BDR Informàtica",
  ]));

test("Catalan CV falls back to the Spanish PDF", () =>
  expect(profile.cvPdf.ca).toBe(profile.cvPdf.es));
