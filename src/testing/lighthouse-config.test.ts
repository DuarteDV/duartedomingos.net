import { createRequire } from "node:module";
import { expect, test } from "vitest";

const config = createRequire(import.meta.url)("../../lighthouserc.cjs");

// One Lighthouse run on a shared CI runner can dip below the threshold by chance and block a
// deploy (it happened on the first production push): measure each URL several times.
test("Lighthouse measures each URL at least 3 times", () =>
  expect(config.ci.collect.numberOfRuns).toBeGreaterThanOrEqual(3));
