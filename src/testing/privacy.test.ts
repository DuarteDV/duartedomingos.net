import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { findVettedWords } from "./vetted-words";

const binary = /\.(png|jpe?g|gif|webp|ico|pdf|mp4|woff2?)$/i;

test("detects a vetted name by hash", () => {
  // Built at runtime so this file doesn't contain the name it tests for.
  const name = "ERUTNECCA".split("").reverse().join("");
  expect(findVettedWords(`Proyecto para ${name} en Andorra`)).toEqual([2]);
  expect(findVettedWords("Java, Spring y SQL")).toEqual([]);
});

test("no tracked text file contains a vetted name", () => {
  const files = execSync("git ls-files", { encoding: "utf8" })
    .split("\n")
    .filter((f) => f && !binary.test(f));
  const offenders = files.filter((f) => findVettedWords(readFileSync(f, "utf8")).length > 0);
  expect(offenders).toEqual([]);
});
