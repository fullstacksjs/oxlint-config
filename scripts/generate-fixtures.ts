/**
 * NOTE: THIS SCRIPT IS AI GENERATED
 * Generate lint fixtures from the oxc source tree.
 *
 * Each oxc rule is declared with a `declare_oxc_lint!` macro whose Rust doc
 * comment embeds "incorrect" code examples. For every rule our modules enable,
 * we extract those examples and write them to `tests/fixtures/<module>/<rule>.ts`.
 * The snapshot test then lints these fixtures with our config.
 *
 * Usage: `node scripts/generate-fixtures.ts`
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative } from 'node:path';
import { discoverModules, enabledRules, loadModuleConfig, paths } from '../tests/support.ts';

const OXC_REPO = 'https://github.com/oxc-project/oxc/';
const RULES_DIR = join(paths.oxc, 'crates/oxc_linter/src/rules');
const JS_LANGS = new Set(['js', 'jsx', 'ts', 'tsx', 'mjs', 'cjs', 'javascript', 'typescript']);

interface Example {
  lang: string;
  code: string;
}
interface RuleEntry {
  plugin: string;
  rule: string;
  incorrect: Example[];
}

/** Clone the oxc repo into `.tmp/oxc` if it is not already present. */
function ensureOxc(): void {
  if (existsSync(RULES_DIR)) return;
  console.log(`Cloning ${OXC_REPO} into ${relative(paths.root, paths.oxc)} ...`);
  mkdirSync(dirname(paths.oxc), { recursive: true });
  execFileSync('git', ['clone', '--depth', '1', OXC_REPO, paths.oxc], { stdio: 'inherit' });
}

/** Recursively collect every `.rs` file under `dir`. */
function walkRustFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walkRustFiles(full);
    return full.endsWith('.rs') ? [full] : [];
  });
}

/** Isolate the body of the `declare_oxc_lint!( ... );` macro, if present. */
function extractMacroBody(source: string): string | null {
  const start = source.indexOf('declare_oxc_lint!(');
  if (start === -1) return null;
  const end = source.indexOf('\n);', start);
  if (end === -1) return null;
  return source.slice(start, end);
}

/** Strip `///` doc-comment markers, keeping only doc lines. */
function docLines(macroBody: string): string[] {
  return macroBody
    .split('\n')
    .filter((line) => /^\s*\/\/\//.test(line))
    .map((line) => line.replace(/^\s*\/\/\/ ?/, ''));
}

/** Pull the "incorrect" JS/TS code blocks out of a rule's doc comment. */
function extractIncorrect(doc: string[]): Example[] {
  const out: Example[] = [];
  let mode: 'incorrect' | 'correct' | 'none' = 'none';
  let inFence = false;
  let lang = '';
  let buf: string[] = [];

  for (const line of doc) {
    if (inFence) {
      if (line.trim() === '```') {
        const code = buf.join('\n').trim();
        if (mode === 'incorrect' && JS_LANGS.has(lang) && code) out.push({ lang, code });
        inFence = false;
        lang = '';
        buf = [];
      } else {
        buf.push(line);
      }
      continue;
    }
    const fence = line.match(/^\s*```(\w+)?/);
    if (fence) {
      inFence = true;
      lang = (fence[1] ?? '').toLowerCase();
      buf = [];
      continue;
    }
    if (/incorrect[^`]*\bcode\b/i.test(line)) mode = 'incorrect';
    else if (/\bcorrect[^`]*\bcode\b/i.test(line)) mode = 'correct';
  }
  return out;
}

/** Parse a single Rust rule file into a rule entry, or `null` if it has no macro. */
function parseRuleFile(file: string): RuleEntry | null {
  const rel = relative(RULES_DIR, file);
  const segments = rel.split('/');
  const plugin = segments[0];
  const stem = basename(file) === 'mod.rs' ? segments.at(-2)! : basename(file, extname(file));
  const rule = stem.replaceAll('_', '-');

  const body = extractMacroBody(readFileSync(file, 'utf8'));
  if (body == null || !plugin || !rule) return null;

  return { plugin, rule, incorrect: extractIncorrect(docLines(body)) };
}

/** Index every rule in the oxc tree by rule name (a name may exist in several plugins). */
function indexRules(): Map<string, RuleEntry[]> {
  const index = new Map<string, RuleEntry[]>();
  for (const file of walkRustFiles(RULES_DIR)) {
    const entry = parseRuleFile(file);
    if (!entry) continue;
    const list = index.get(entry.rule) ?? [];
    list.push(entry);
    index.set(entry.rule, list);
  }
  return index;
}

/** Resolve a config rule key (`no-console` or `plugin/no-console`) to a rule entry. */
function resolveRule(index: Map<string, RuleEntry[]>, key: string): RuleEntry | undefined {
  const [maybePlugin, maybeRule] = key.includes('/') ? key.split('/') : [undefined, key];
  const candidates = index.get(maybeRule!);
  if (!candidates?.length) return undefined;
  if (maybePlugin) return candidates.find((c) => c.plugin === maybePlugin) ?? candidates[0];
  // Bare key: prefer the eslint core rule, else the first match.
  return candidates.find((c) => c.plugin === 'eslint') ?? candidates[0];
}

function fixtureExtension(examples: Example[]): string {
  return examples.some((e) => e.lang === 'jsx' || e.lang === 'tsx') ? 'tsx' : 'ts';
}

async function main(): Promise<void> {
  ensureOxc();

  const index = indexRules();
  console.log(`Indexed ${index.size} rules from oxc.`);

  rmSync(paths.fixtures, { recursive: true, force: true });

  const modules = discoverModules();
  const configs = await Promise.all(modules.map((mod) => loadModuleConfig(mod)));

  for (const [i, mod] of modules.entries()) {
    const config = configs[i];
    if (!config) {
      console.log(`[${mod.name}] skipped — not a config module.`);
      continue;
    }
    const outDir = join(paths.fixtures, mod.name);
    let written = 0;
    const missing: string[] = [];

    for (const key of enabledRules(config)) {
      const entry = resolveRule(index, key);
      if (!entry || entry.incorrect.length === 0) {
        missing.push(key);
        continue;
      }
      mkdirSync(outDir, { recursive: true });
      const ext = fixtureExtension(entry.incorrect);
      const header = `/* AUTO-GENERATED from oxc docs — rule ${entry.plugin}/${entry.rule}. Do not edit. */`;
      const body = entry.incorrect.map((e) => e.code).join('\n\n');
      writeFileSync(join(outDir, `${key.replaceAll('/', '__')}.${ext}`), `${header}\n\n${body}\n`);
      written += 1;
    }

    console.log(`[${mod.name}] wrote ${written} fixtures, skipped ${missing.length} rules without JS examples.`);
    if (missing.length) console.log(`  skipped: ${missing.join(', ')}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
