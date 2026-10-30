import { expect, test } from "vitest";
import { personJsonLd } from "./seo";

test("person json-ld", () => {
  const j = personJsonLd("en");
  expect(j).toMatchObject({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Duarte Domingos",
    url: "https://duartedomingos.net/en/",
    jobTitle: "Software developer",
  });
  expect(j.sameAs).toEqual([
    "https://www.linkedin.com/in/duarte-domingos",
    "https://github.com/DuarteDV",
  ]);
  expect(j.knowsLanguage).toHaveLength(5);
});
