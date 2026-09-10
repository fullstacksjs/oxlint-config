/**
 * List native Oxlint rules that are not mentioned by this preset.
 *
 * A rule counts as covered when its module config includes it, even when its
 * severity is `off`. This makes an explicit decision different from an
 * unnoticed rule added by a newer Oxlint release.
 */

import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { allRules, discoverModules, loadModuleConfig, paths } from '../tests/support.ts';

interface OxlintRule {
  scope: string;
  value: string;
  category: string;
  type_aware: boolean;
  docs_url: string;
}

const OXLINT_BIN = path.join(paths.root, 'node_modules/.bin/oxlint');

function normalizeScope(scope: string): string {
  return scope.replaceAll('_', '-');
}

function normalizeConfiguredRule(rule: string): string {
  return rule.includes('/') ? rule : `eslint/${rule}`;
}

function loadOxlintRules(): OxlintRule[] {
  const stdout = execFileSync(OXLINT_BIN, ['--rules', '--format=json'], {
    cwd: paths.root,
    encoding: 'utf8',
  });
  return JSON.parse(stdout) as OxlintRule[];
}

async function main(): Promise<void> {
  const oxlintRules = loadOxlintRules();
  let total = 0;

  for (const mod of discoverModules()) {
    const config = await loadModuleConfig(mod);
    const scopes = new Set((config.plugins ?? []).map(normalizeScope));
    const configured = new Set(allRules(config).map(normalizeConfiguredRule));
    const missing = oxlintRules
      .filter((rule) => scopes.has(normalizeScope(rule.scope)))
      .map((rule) => ({ ...rule, key: `${normalizeScope(rule.scope)}/${rule.value}` }))
      .filter((rule) => !configured.has(rule.key))
      .sort((a, b) => a.key.localeCompare(b.key));

    if (missing.length === 0) continue;

    total += missing.length;
    console.log(`\n${mod.name} (${missing.length})`);
    for (const rule of missing) {
      const typeAware = rule.type_aware ? ', type-aware' : '';
      console.log(`  ${rule.key} [${rule.category}${typeAware}]`);
    }
  }

  console.log(`\n${total} native Oxlint rules are not represented in the preset.`);
}

await main();
