import type { OxlintConfig } from 'oxlint';
import { describe, expect, it } from 'vite-plus/test';
import { Context, defineConfig, defineOxlintConfig } from '../src/index.ts';
import { defineConfig as defineMinimalConfig } from '@fullstacksjs/oxlint-minimal';
import { regex } from '../src/modules/regex.ts';

/** The module list a config layers in, identified by the modules it contributes. */
function extendsOf(config: OxlintConfig): OxlintConfig[] {
  return (config.extends ?? []) as OxlintConfig[];
}

describe('defineConfig', () => {
  it('is the minimal baseline plus the jsPlugin modules', () => {
    const modules = { jest: false, nextjs: false, nodejs: true, react: true, vitest: true };

    expect(extendsOf(defineConfig({ modules }))).toEqual([
      ...extendsOf(defineMinimalConfig({ modules })),
      regex(new Context({ esm: true }, modules)),
    ]);
  });

  it('keeps the baseline overrides and top-level config untouched', () => {
    const modules = { jest: false, nextjs: false, nodejs: true, react: true, vitest: true };
    const { extends: _config, ...config } = defineConfig({ modules });
    const { extends: _minimal, ...minimal } = defineMinimalConfig({ modules });

    expect(config).toEqual(minimal);
  });

  it('enables the regexp jsPlugin', () => {
    const layers = extendsOf(defineConfig());
    const withPlugin = layers.filter((layer) => layer.jsPlugins?.includes('eslint-plugin-regexp'));

    expect(withPlugin).toHaveLength(1);
    expect(withPlugin[0]?.settings).toEqual({ regexp: { allowedCharacterRanges: ['all'] } });
  });

  it('applies the jsPlugin modules after the built-ins but before user extends', () => {
    const userLayer: OxlintConfig = { rules: { 'regexp/strict': 'off' } };
    const layers = extendsOf(defineConfig({ extends: [userLayer] }));

    expect(layers.at(-1)).toBe(userLayer);
    expect(layers.at(-2)?.jsPlugins).toEqual(['eslint-plugin-regexp']);
  });

  it('exposes defineOxlintConfig as an alias', () => {
    expect(defineOxlintConfig).toBe(defineConfig);
  });
});
