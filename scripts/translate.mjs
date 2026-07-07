#!/usr/bin/env node
/* ───────────────────────────────────────────────────────────────────────────
 * Katha Studio — translation generator.
 *
 * Reads the English source of truth (lib/i18n/en.json) and machine-translates
 * every string into each non-English language listed in lib/languages.ts,
 * writing one static file per language to public/i18n/<code>.json (the same
 * files the LanguageProvider fetches at runtime).
 *
 * Engine: Google Cloud Translation API v2 (REST).
 *   Set GOOGLE_TRANSLATE_API_KEY in the environment or in .env.local.
 *
 * Idempotent: existing translations are preserved; only missing strings are
 * sent to the API, so re-running after editing en.json is cheap. Identical
 * source strings are translated once and reused.
 *
 * Usage:
 *   node scripts/translate.mjs                 # all non-English languages
 *   node scripts/translate.mjs hi kn ta        # only the given language codes
 * ───────────────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const EN_PATH = resolve(ROOT, "lib/i18n/en.json");
const OUT_DIR = resolve(ROOT, "public/i18n");
const LANGS_PATH = resolve(ROOT, "lib/languages.ts");

const ENDPOINT = "https://translation.googleapis.com/language/translate/v2";
const BATCH = 100; // Google allows up to 128 q params per request.

/* ── env ─────────────────────────────────────────────────────────────────── */

function loadEnvLocal() {
  const p = resolve(ROOT, ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

loadEnvLocal();
const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

if (!API_KEY) {
  console.error(
    "\n  Missing GOOGLE_TRANSLATE_API_KEY.\n" +
      "  Add it to .env.local (GOOGLE_TRANSLATE_API_KEY=...) or export it, then re-run.\n"
  );
  process.exit(1);
}

/* ── language list (parsed from lib/languages.ts) ──────────────────────────── */

function readLanguageCodes() {
  const src = readFileSync(LANGS_PATH, "utf8");
  const codes = [];
  const re = /code:\s*"([a-z-]+)"/g;
  let m;
  while ((m = re.exec(src))) codes.push(m[1]);
  return codes.filter((c) => c !== "en");
}

/* ── flatten / unflatten the dictionary tree ───────────────────────────────── */

function flatten(node, prefix, out) {
  if (typeof node === "string") {
    out[prefix] = node;
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => flatten(v, `${prefix}.${i}`, out));
    return out;
  }
  if (node && typeof node === "object") {
    for (const k of Object.keys(node)) {
      flatten(node[k], prefix ? `${prefix}.${k}` : k, out);
    }
  }
  return out;
}

function setPath(root, path, value) {
  const parts = path.split(".");
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const nextIsIndex = /^\d+$/.test(parts[i + 1]);
    if (cur[key] === undefined) cur[key] = nextIsIndex ? [] : {};
    cur = cur[key];
  }
  cur[parts[parts.length - 1]] = value;
}

/* ── Google Translate v2 ───────────────────────────────────────────────────── */

const HTML_ENTITIES = {
  "&amp;": "&",
  "&#39;": "'",
  "&quot;": '"',
  "&gt;": ">",
  "&lt;": "<",
  "&#160;": " ",
  "&nbsp;": " ",
};

function decodeEntities(s) {
  return s.replace(/&[#a-z0-9]+;/gi, (e) => HTML_ENTITIES[e] ?? e);
}

async function translateBatch(texts, target) {
  const params = new URLSearchParams();
  params.set("key", API_KEY);
  params.set("source", "en");
  params.set("target", target);
  params.set("format", "text");
  for (const t of texts) params.append("q", t);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google Translate ${target} HTTP ${res.status}: ${body.slice(0, 300)}`);
  }
  const json = await res.json();
  return json.data.translations.map((t) => decodeEntities(t.translatedText));
}

/* ── main ──────────────────────────────────────────────────────────────────── */

async function run() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const en = JSON.parse(readFileSync(EN_PATH, "utf8"));
  const flatEn = flatten(en, "", {});
  const paths = Object.keys(flatEn);

  const requested = process.argv.slice(2);
  const targets = requested.length ? requested : readLanguageCodes();

  console.log(`Source strings: ${paths.length} · Languages: ${targets.join(", ")}\n`);

  for (const lang of targets) {
    const outPath = resolve(OUT_DIR, `${lang}.json`);
    const existing = existsSync(outPath)
      ? JSON.parse(readFileSync(outPath, "utf8"))
      : {};
    const flatExisting = flatten(existing, "", {});

    /* Only translate paths we don't already have. Reuse one translation for
       any source string that repeats verbatim. */
    const missingPaths = paths.filter((p) => !flatExisting[p]);
    if (missingPaths.length === 0) {
      console.log(`✓ ${lang}: already complete (${paths.length} strings)`);
      continue;
    }

    const uniqueSources = [...new Set(missingPaths.map((p) => flatEn[p]))];
    const translationBySource = new Map();

    for (let i = 0; i < uniqueSources.length; i += BATCH) {
      const slice = uniqueSources.slice(i, i + BATCH);
      const translated = await translateBatch(slice, lang);
      slice.forEach((src, j) => translationBySource.set(src, translated[j]));
      process.stdout.write(
        `\r  ${lang}: ${Math.min(i + BATCH, uniqueSources.length)}/${uniqueSources.length} unique strings`
      );
    }

    const result = JSON.parse(JSON.stringify(existing));
    for (const p of missingPaths) {
      setPath(result, p, translationBySource.get(flatEn[p]) ?? flatEn[p]);
    }

    writeFileSync(outPath, JSON.stringify(result, null, 2) + "\n", "utf8");
    console.log(`\r✓ ${lang}: wrote ${missingPaths.length} new strings → public/i18n/${lang}.json`);
  }

  console.log("\nDone.");
}

run().catch((err) => {
  console.error("\nTranslation failed:", err.message);
  process.exit(1);
});
