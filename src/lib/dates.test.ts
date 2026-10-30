import { expect, test } from "vitest";
import type { Locale } from "../i18n/utils";
import { formatPeriod } from "./dates";

test.each([
  ["2023-11", null, "es", "nov 2023 – actualidad"],
  ["2022-07", "2023-11", "en", "Jul 2022 – Nov 2023"],
  ["2023-11", null, "ca", "nov 2023 – actualitat"],
  ["2022-03", "2022-03", "ca", "març 2022 – març 2022"],
])("formatPeriod(%s, %s, %s)", (start, end, locale, expected) =>
  expect(formatPeriod(start, end, locale as Locale)).toBe(expected),
);
