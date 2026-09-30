import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { OxlintConfig } from 'oxlint';
import { describe, expect, it } from 'vite-plus/test';
import { defineConfig } from '../src/index.ts';

const root = path.resolve(import.meta.dirname, '../../..');
const oxlint = path.join(root, 'node_modules/.bin/oxlint');
const fixture = path.resolve(import.meta.dirname, 'fixtures/Button.stories.tsx');

/** The single `extends` layer contributed by the storybook jsPlugin module. */
function storybookLayer(): OxlintConfig {
  const layers = (defineConfig({ modules: { storybook: true } }).extends ?? []) as OxlintConfig[];
  const layer = layers.find((l) => l.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'storybook'));
  if (!layer) throw new Error('No layer enabling eslint-plugin-storybook.');
  return layer;
}

/**
 * Lints the fixture with one config layer and returns the `storybook` rules that
 * fired. `extends` in a real `.oxlintrc.json` only accepts paths, so layers are
 * linted on their own — the same approach as the baseline's fixture harness.
 *
 * The fixture is copied into the temp dir so override `files` globs match.
 */
function lintedRules(config: OxlintConfig): string[] {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'oxlint-config-'));
  const configPath = path.join(dir, '.oxlintrc.json');
  const fixturePath = path.join(dir, 'Button.stories.tsx');
  fs.copyFileSync(fixture, fixturePath);
  // Isolate the layer: keep only the rules it turns on, not oxlint's defaults.
  fs.writeFileSync(configPath, JSON.stringify({ ...config, categories: { ...config.categories, correctness: 'off' } }));

  let stdout: string;
  try {
    stdout = execFileSync(oxlint, ['--config', configPath, '--format', 'json', fixturePath], {
      cwd: dir,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    // oxlint exits non-zero when it reports findings; the JSON is still on stdout.
    stdout = (err as { stdout?: string }).stdout ?? '';
  }
  const diagnostics = (JSON.parse(stdout).diagnostics ?? []) as { code?: string }[];
  return [...new Set(diagnostics.map((d) => d.code).filter((c) => c?.startsWith('storybook(')))].sort() as string[];
}

describe('storybook jsPlugin', () => {
  it('loads the plugin and reports its rules', () => {
    expect(lintedRules(storybookLayer())).toMatchInlineSnapshot(`
      [
        "storybook(default-exports)",
        "storybook(no-redundant-story-name)",
        "storybook(prefer-pascal-case)",
      ]
    `);
  });
});
