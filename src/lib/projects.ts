import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/utils";
import { groupProjects, type ProjectGroup } from "./projects-core";

export type ProjectEntry = CollectionEntry<"projects">;

export async function getProjects(): Promise<ProjectGroup<ProjectEntry["data"]>[]> {
  return groupProjects(await getCollection("projects"));
}

export async function getProjectStaticPaths(locale: Locale) {
  const projects = await getProjects();
  return projects.map(({ slug, byLocale }) => ({
    params: { slug },
    props: { slug, entry: byLocale[locale] as ProjectEntry },
  }));
}
