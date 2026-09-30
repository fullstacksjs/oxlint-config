import type { OxlintConfig } from 'oxlint';
import { describe, expect, it } from 'vite-plus/test';
import { defineConfig, defineOxlintConfig } from '../src/index.ts';
import { defineConfig as defineMinimalConfig } from '@fullstacksjs/oxlint-minimal';
import { regex } from '../src/modules/regex.ts';
import { storybook } from '../src/modules/storybook.ts';
import { Context } from '@fullstacksjs/oxlint-minimal/internal';

/** The module list a config layers in, identified by the modules it contributes. */
function extendsOf(config: OxlintConfig): OxlintConfig[] {
  return (config.extends ?? []) as OxlintConfig[];
}

describe('defineConfig', () => {
  it('is the minimal baseline plus the jsPlugin modules', () => {
    const modules = { jest: false, nextjs: false, nodejs: true, react: true, storybook: true, vitest: true };
    const ctx = new Context({ esm: true }, modules);

    expect(extendsOf(defineConfig({ modules }))).toEqual([...extendsOf(defineMinimalConfig({ modules })), regex(ctx), storybook(ctx)]);
  });

  it('keeps the baseline overrides and top-level config untouched', () => {
    const modules = { jest: false, nextjs: false, nodejs: true, react: true, storybook: false, vitest: true };
    const { extends: _config, ...config } = defineConfig({ modules });
    const { extends: _minimal, ...minimal } = defineMinimalConfig({ modules });

    expect(config).toEqual(minimal);
  });

  it('enables the regexp jsPlugin', () => {
    const layers = extendsOf(defineConfig());
    const withPlugin = layers.filter((layer) => layer.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'regexp'));

    expect(withPlugin).toHaveLength(1);
    expect(withPlugin[0]?.settings).toEqual({ regexp: { allowedCharacterRanges: ['all'] } });
  });

  it('enables the storybook jsPlugin when modules.storybook is true', () => {
    const layers = extendsOf(defineConfig({ modules: { storybook: true } }));
    const withPlugin = layers.filter((layer) => layer.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'storybook'));

    expect(withPlugin).toHaveLength(1);
    expect(withPlugin[0]?.overrides).toEqual([
      {
        files: ['**/*.stories.{ts,tsx,js,jsx,mjs,cjs}', '**/*.story.{ts,tsx,js,jsx,mjs,cjs}'],
        rules: expect.objectContaining({
          'storybook/csf-component': 'warn',
          'storybook/default-exports': 'error',
          'storybook/no-stories-of': 'error',
          'storybook/story-exports': 'error',
        }),
      },
      {
        files: ['.storybook/main.{js,cjs,mjs,ts}'],
        rules: {
          'storybook/no-uninstalled-addons': 'error',
        },
      },
    ]);
  });

  it('disables the storybook jsPlugin when modules.storybook is false', () => {
    const layers = extendsOf(defineConfig({ modules: { storybook: false } }));
    const withPlugin = layers.filter((layer) => layer.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'storybook'));

    expect(withPlugin).toHaveLength(0);
  });

  it('applies the jsPlugin modules after the built-ins but before user extends', () => {
    const userLayer: OxlintConfig = { rules: { 'regexp/strict': 'off' } };
    const layers = extendsOf(defineConfig({ modules: { storybook: true }, extends: [userLayer] }));

    expect(layers.at(-1)).toBe(userLayer);
    expect(layers.at(-2)?.jsPlugins).toContainEqual(expect.objectContaining({ name: 'storybook' }));
    expect(layers.at(-3)?.jsPlugins).toContainEqual(expect.objectContaining({ name: 'regexp' }));
  });

  it('exposes defineOxlintConfig as an alias', () => {
    expect(defineOxlintConfig).toBe(defineConfig);
  });
});
