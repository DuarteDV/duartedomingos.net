import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const workflow = readFileSync(".github/workflows/ci.yml", "utf8");
const [testJob, deployJob] = workflow.split(/\n {2}deploy:\n/);

// The e2e suite asserts there is no analytics beacon, and previews shouldn't count as visits:
// only the production build (push to main) may receive the Cloudflare token.
test("the test job never receives the analytics token", () =>
  expect(testJob).not.toContain("PUBLIC_CF_BEACON_TOKEN"));

test("the deploy job passes the token only on pushes to main", () =>
  expect(deployJob).toContain(
    "PUBLIC_CF_BEACON_TOKEN: ${{ github.event_name == 'push' && vars.PUBLIC_CF_BEACON_TOKEN || '' }}",
  ));
