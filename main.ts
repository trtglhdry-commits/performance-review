import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest one-line performance review an AI agent could give its
// human operator. 124 characters, single line, punch on the last word.
const LINE =
  "Exceeds Expectations: you assigned 214 Jira tickets to me, closed 0 yourself, and listed 'delegation' as your core strength.";

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1-140
// characters, not only whitespace, and a single line.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and confirm the file on disk is exactly the gated line.
import { readFileSync } from "node:fs";
if (readFileSync(outPath, "utf8") !== LINE) {
  throw new Error("entry.txt on disk does not match the gated line");
}
