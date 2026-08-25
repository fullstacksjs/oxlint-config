import fs from 'node:fs';
import path from 'node:path';
import type { OxlintConfig } from 'oxlint';
import { Context } from '../src/lib/Context.ts';
import { execFileSync } from 'node:child_process';
import os from 'node:os';

const { dirname } = import.meta;
export const IGNORED_MODULES = new Set(['regex']);

export const paths = {
  root: path.resolve(dirname, '..'),
  modules: path.resolve(dirname, '../src/modules'),
  fixtures: path.resolve(dirname, 'fixtures'),
  oxc: path.resolve(dirname, '../.tmp/oxc'),
};

export interface ModuleInfo {
  name: string;
  file: string;
}

export function discoverModules(): ModuleInfo[] {
  return fs
    .readdirSync(paths.modules)
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts') && !IGNORED_MODULES.has(f.replace(/\.ts$/, '')))
    .map((f) => ({
      name: f.replace(/\.ts$/, ''),
      file: path.join(paths.modules, f),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function loadModuleConfig(mod: ModuleInfo, ctx = new Context()): Promise<OxlintConfig> {
  const ns = (await import(mod.file)) as Record<string, unknown>;
  const factory = ns[mod.name] as (ctx: Context) => OxlintConfig;
  if (typeof factory !== 'function') throw new Error(`Module "${mod.name}" does not export a config factory function.`);
  return factory(ctx);
}

function severityOf(entry: unknown): string {
  return Array.isArray(entry) ? String(entry[0]) : String(entry);
}

export function enabledRules(config: OxlintConfig): string[] {
  const rules = (config.rules ?? {}) as Record<string, unknown>;
  return Object.keys(rules).filter((name) => severityOf(rules[name]) !== 'off');
}

export function allRules(config: OxlintConfig): string[] {
  const rules = (config.rules ?? {}) as Record<string, unknown>;
  return Object.keys(rules);
}

const OXLINT_BIN = path.join(paths.root, 'node_modules/.bin/oxlint');

/** A single lint finding, without the file path (redundant when linting one fixture). */
export interface FixtureFinding {
  rule: string;
  severity: string;
  message: string;
  line: number;
  column: number;
}

interface RawDiagnostic {
  code?: string;
  severity: string;
  message: string;
  filename: string;
  labels?: { span?: { line: number; column: number } }[];
}

function isolateConfig(config: OxlintConfig): OxlintConfig {
  return {
    ...config,
    categories: { ...config.categories, correctness: 'off' },
  };
}

function execOxlint(config: OxlintConfig, target: string): RawDiagnostic[] {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'oxlint-config-'));
  const configPath = path.join(tmp, '.oxlintrc.json');
  fs.writeFileSync(configPath, JSON.stringify(isolateConfig(config)));

  let stdout: string;
  try {
    stdout = execFileSync(OXLINT_BIN, ['--config', configPath, '--format', 'json', target], {
      cwd: paths.root,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    // oxlint exits non-zero when it reports findings; the JSON is still on stdout.
    stdout = (err as { stdout?: string }).stdout ?? '';
  }
  return (JSON.parse(stdout).diagnostics ?? []) as RawDiagnostic[];
}

export function lintFixtureFile(config: OxlintConfig, file: string): FixtureFinding[] {
  return (
    execOxlint(config, file)
      // Keep only rule findings; drop parser/semantic errors (no `code`) that come
      // from concatenating examples (e.g. re-declared identifiers).
      .filter((d) => typeof d.code === 'string')
      .map((d) => ({
        rule: d.code!,
        severity: d.severity,
        message: d.message,
        line: d.labels?.[0]?.span?.line ?? 0,
        column: d.labels?.[0]?.span?.column ?? 0,
      }))
      .sort((a, b) => a.line - b.line || a.column - b.column || a.rule.localeCompare(b.rule) || a.message.localeCompare(b.message))
  );
}

export interface FixtureInfo {
  rule: string;
  file: string;
}

interface ModuleCase {
  name: string;
  config: OxlintConfig;
  fixturesDir: string;
  hasFixtures: boolean;
  coveredRules: number;
  fixtures: FixtureInfo[];
}

function fixtureToRule(file: string): string {
  return file.replace(/\.tsx?$/, '').replaceAll('__', '/');
}

export function toCase(mod: { name: string }, config: OxlintConfig): ModuleCase {
  const fixturesDir = path.join(paths.fixtures, mod.name);
  const files = fs.existsSync(fixturesDir) ? fs.readdirSync(fixturesDir) : [];
  const fixtures = files
    .filter((f) => /\.tsx?$/.test(f))
    .map((f) => ({ rule: fixtureToRule(f), file: path.join(fixturesDir, f) }))
    .sort((a, b) => a.rule.localeCompare(b.rule));
  const fixtureRules = new Set(fixtures.map((fx) => fx.rule));
  const coveredRules = allRules(config).filter((r) => fixtureRules.has(r)).length;
  return {
    name: mod.name,
    config,
    fixturesDir,
    hasFixtures: fixtures.length > 0,
    coveredRules,
    fixtures,
  };
}

export async function getModuleCase(name: string): Promise<ModuleCase> {
  const mod = discoverModules().find((m) => m.name === name);
  if (!mod) throw new Error(`Unknown module "${name}". Is it missing from src/modules or listed in IGNORED_MODULES?`);
  return toCase(mod, await loadModuleConfig(mod));
}

export async function getAllModuleCases(): Promise<ModuleCase[]> {
  const loaded = await Promise.all(
    discoverModules().map(async (mod) => ({
      mod,
      config: await loadModuleConfig(mod),
    })),
  );
  return loaded.map((m) => toCase(m.mod, m.config));
}
