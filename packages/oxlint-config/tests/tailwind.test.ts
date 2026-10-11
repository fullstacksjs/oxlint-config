import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { OxlintConfig } from 'oxlint';
import { describe, expect, it } from 'vite-plus/test';
import { defineConfig } from '../src/index.ts';

const root = path.resolve(import.meta.dirname, '../../..');
const oxlint = path.join(root, 'node_modules/.bin/oxlint');
const fixtures = path.resolve(import.meta.dirname, 'fixtures');

/** The single `extends` layer contributed by the better-tailwindcss jsPlugin module. */
function tailwindLayer(): OxlintConfig {
  const config = defineConfig({ modules: { tailwind: { entryPoint: path.join(fixtures, 'tailwind.css') } } });
  const layers = (config.extends ?? []) as OxlintConfig[];
  const layer = layers.find((l) => l.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'better-tailwindcss'));
  if (!layer) throw new Error('No layer enabling eslint-plugin-better-tailwindcss.');
  return layer;
}

/**
 * Lints the fixture with one config layer and returns the `better-tailwindcss` diagnostics
 * as `line: code`. `extends` in a real `.oxlintrc.json` only accepts paths, so layers are
 * linted on their own — the same approach as the baseline's fixture harness.
 */
function lint(config: OxlintConfig, fixture: string): string[] {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'oxlint-config-'));
  const configPath = path.join(dir, '.oxlintrc.json');
  const fixturePath = path.join(fixtures, fixture);
  // Isolate the layer: keep only the rules it turns on, not oxlint's defaults.
  fs.writeFileSync(configPath, JSON.stringify({ ...config, categories: { ...config.categories, correctness: 'off' } }));

  let stdout: string;
  try {
    stdout = execFileSync(oxlint, ['--config', configPath, '--format', 'json', fixturePath], {
      cwd: path.resolve(import.meta.dirname, '..'),
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    // oxlint exits non-zero when it reports findings; the JSON is still on stdout.
    stdout = (err as { stdout?: string }).stdout ?? '';
  }
  const diagnostics = (JSON.parse(stdout).diagnostics ?? []) as { code?: string; labels?: { span: { line: number } }[] }[];
  return diagnostics
    .filter((d) => d.code?.startsWith('better-tailwindcss('))
    .map((d) => `${d.labels?.[0]?.span.line}: ${d.code}`)
    .sort();
}

/** The `better-tailwindcss` rules that fired on the fixture. */
function lintedRules(config: OxlintConfig, fixture: string): string[] {
  return [...new Set(lint(config, fixture).map((d) => d.slice(d.indexOf(' ') + 1)))].sort();
}

// Each run loads the Tailwind CSS theme, which is slow under a parallel test run.
describe('better-tailwindcss jsPlugin', { timeout: 30_000 }, () => {
  it('loads the plugin and reports its rules', () => {
    expect(lintedRules(tailwindLayer(), 'Tailwind.tsx')).toMatchInlineSnapshot(`
      [
        "better-tailwindcss(enforce-consistent-class-order)",
        "better-tailwindcss(no-conflicting-classes)",
        "better-tailwindcss(no-duplicate-classes)",
        "better-tailwindcss(no-unnecessary-whitespace)",
      ]
    `);
  });

  it('lints string arguments of the class-name utilities only', () => {
    expect(lint(tailwindLayer(), 'TailwindSelectors.tsx')).toEqual([
      '11: better-tailwindcss(no-duplicate-classes)',
      '13: better-tailwindcss(no-duplicate-classes)',
      '15: better-tailwindcss(no-duplicate-classes)',
      '9: better-tailwindcss(no-duplicate-classes)',
    ]);
  });
});
