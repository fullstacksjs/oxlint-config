import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { OxlintConfig } from 'oxlint';
import { describe, expect, it } from 'vite-plus/test';
import { defineConfig } from '../src/index.ts';

const root = path.resolve(import.meta.dirname, '../../..');
const oxlint = path.join(root, 'node_modules/.bin/oxlint');
const fixture = path.resolve(import.meta.dirname, 'fixtures/regex.ts');

/** The single `extends` layer contributed by the regexp jsPlugin module. */
function regexLayer(): OxlintConfig {
  const layers = (defineConfig().extends ?? []) as OxlintConfig[];
  const layer = layers.find((l) => l.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'regexp'));
  if (!layer) throw new Error('No layer enabling eslint-plugin-regexp.');
  return layer;
}

/**
 * Lints the fixture with one config layer and returns the `regexp` rules that
 * fired. `extends` in a real `.oxlintrc.json` only accepts paths, so layers are
 * linted on their own — the same approach as the baseline's fixture harness.
 */
function lintedRules(config: OxlintConfig): string[] {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'oxlint-config-'));
  const configPath = path.join(dir, '.oxlintrc.json');
  // Isolate the layer: keep only the rules it turns on, not oxlint's defaults.
  fs.writeFileSync(configPath, JSON.stringify({ ...config, categories: { ...config.categories, correctness: 'off' } }));

  let stdout: string;
  try {
    stdout = execFileSync(oxlint, ['--config', configPath, '--format', 'json', fixture], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    // oxlint exits non-zero when it reports findings; the JSON is still on stdout.
    stdout = (err as { stdout?: string }).stdout ?? '';
  }
  const diagnostics = (JSON.parse(stdout).diagnostics ?? []) as { code?: string }[];
  return [...new Set(diagnostics.map((d) => d.code).filter((c) => c?.startsWith('regexp(')))].sort() as string[];
}

describe('regexp jsPlugin', () => {
  it('loads the plugin and reports its rules', () => {
    expect(lintedRules(regexLayer())).toMatchInlineSnapshot(`
      [
        "regexp(no-empty-group)",
        "regexp(no-useless-escape)",
        "regexp(no-useless-quantifier)",
        "regexp(prefer-d)",
        "regexp(prefer-plus-quantifier)",
        "regexp(prefer-star-quantifier)",
        "regexp(strict)",
      ]
    `);
  });
});
