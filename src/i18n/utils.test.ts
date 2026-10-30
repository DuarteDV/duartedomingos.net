import { describe, expect, test } from "vitest";
import ca from "./ca.json";
import en from "./en.json";
import es from "./es.json";
import { alternates, getLocaleFromPath, pathFor, t } from "./utils";

describe("paths", () => {
  test("home", () =>
    expect([
      pathFor("es", { kind: "home" }),
      pathFor("en", { kind: "home" }),
      pathFor("ca", { kind: "home" }),
    ]).toEqual(["/", "/en/", "/ca/"]));

  test("project", () =>
    expect(alternates({ kind: "project", slug: "duarts-review" })).toEqual({
      es: "/proyectos/duarts-review/",
      en: "/en/projects/duarts-review/",
      ca: "/ca/projectes/duarts-review/",
    }));
});

describe("getLocaleFromPath", () => {
  test.each([
    ["/", "es"],
    ["/en/", "en"],
    ["/ca", "ca"],
    ["/en/projects/x/", "en"],
    ["/enfoque/", "es"],
    ["/proyectos/x/", "es"],
  ])("%s → %s", (p, l) => expect(getLocaleFromPath(p)).toBe(l));
});

test("dictionaries share keys and have no empty values", () => {
  const keys = Object.keys(es).sort();
  for (const d of [en, ca]) expect(Object.keys(d).sort()).toEqual(keys);
  for (const d of [es, en, ca])
    for (const v of Object.values(d)) expect(String(v).trim()).not.toBe("");
});

test("t translates", () => expect(t("en", "nav.projects")).toBe("Projects"));
