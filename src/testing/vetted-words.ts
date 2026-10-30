// Test helper: detects names from internal work documents that must never be published (spec §9).
// Only SHA-256 hashes are stored so the names themselves never appear in this public repo,
// and matches are reported by position, never by word, so CI logs don't leak them either.
import { createHash } from "node:crypto";

const vettedHashes = new Set([
  "7aaaaf80f28df9b959b8ff561f1eeb84e172a335a7e01986a61b1df0f44384ca",
  "484f4c1577130fdb27d8c586d3033e777695750da8bbd3d4f9c592e60152a426",
  "78e730640282378bb99bd1a3a910e3a5db65a5c82e28bd202333f7170d528da6",
  "bf3238458308a2fccdb9743242a2133efd05e39090f4a45405d35aae630e354a",
  "c07225e51aff20a78a58d3368735717a2c3323039440d91b91a6a14d4ea2577f",
  "0fea31de8afe11555df2e84e568f67fa9a3bad8f521b373537002e4f89f4c0ec",
  "0c666b93d76cb23d5b8d90a6406c01153f159f3e01b2b2b64749d8f26691a029",
  "4d748ebd71af03a7c325a5ecef86e3768b71597ba3c08dc26624bfdbd84a0a34",
  "7338ea94c07e29252a1cd830e8509216a1b5d93ee86315154539b8d602ea7600",
]);

const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");

/** Positions (word index) of vetted names in `text`; checks single words and word pairs. */
export function findVettedWords(text: string): number[] {
  const words = text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  const hits: number[] = [];
  words.forEach((word, i) => {
    const pair = i + 1 < words.length ? `${word} ${words[i + 1]}` : "";
    if (vettedHashes.has(sha256(word)) || (pair && vettedHashes.has(sha256(pair)))) hits.push(i);
  });
  return hits;
}
