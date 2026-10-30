import { expect, test } from "vitest";
import { groupProjects, parseEntryId, type ProjectFields } from "./projects-core";

const e = (id: string, d: Partial<ProjectFields> = {}) => ({
  id,
  data: { title: id, summary: "s", year: 2021, stack: [], draft: false, ...d },
});
const full = (slug: string, d: Partial<ProjectFields> = {}) =>
  ["es", "en", "ca"].map((l) => e(`${slug}/${l}`, d));

test("groups by slug", () => expect(groupProjects(full("a"))[0].byLocale.en.id).toBe("a/en"));

test("missing locale throws", () =>
  expect(() => groupProjects([e("a/es"), e("a/en")])).toThrow('Proyecto "a" sin versión "ca"'));

test("drafts excluded even if incomplete", () =>
  expect(groupProjects([e("k/es", { draft: true })])).toEqual([]));

test("a draft flag in any locale hides the project", () =>
  expect(groupProjects([e("k/es"), e("k/en", { draft: true }), e("k/ca")])).toEqual([]));

test("sort: order, then year desc, then slug", () =>
  expect(
    groupProjects([
      ...full("old", { year: 2020 }),
      ...full("new", { year: 2026 }),
      ...full("pinned", { year: 2019, order: 1 }),
      ...full("also-new", { year: 2026 }),
    ]).map((p) => p.slug),
  ).toEqual(["pinned", "also-new", "new", "old"]));

test("bad id", () => expect(() => parseEntryId("a/de")).toThrow('Id de proyecto inválido: "a/de"'));

test("parses a valid id", () =>
  expect(parseEntryId("duarts-review/ca")).toEqual({ slug: "duarts-review", locale: "ca" }));
