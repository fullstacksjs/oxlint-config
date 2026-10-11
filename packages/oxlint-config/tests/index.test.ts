import type { OxlintConfig } from 'oxlint';
import { describe, expect, it } from 'vite-plus/test';
import { defineConfig, defineOxlintConfig } from '../src/index.ts';
import { defineConfig as defineMinimalConfig } from '@fullstacksjs/oxlint-minimal';
import { regex } from '../src/modules/regex.ts';
import { storybook } from '../src/modules/storybook.ts';
import { tailwind } from '../src/modules/tailwind.ts';
import { SelectorKind } from 'eslint-plugin-better-tailwindcss/api/types';
import { Context } from '@fullstacksjs/oxlint-minimal/internal';

/** The module list a config layers in, identified by the modules it contributes. */
function extendsOf(config: OxlintConfig): OxlintConfig[] {
  return (config.extends ?? []) as OxlintConfig[];
}

/** The `better-tailwindcss` settings of the tailwind module layer. */
function tailwindSettings(config: Parameters<typeof defineConfig>[0]): Record<string, unknown> {
  const layer = extendsOf(defineConfig(config)).find((l) =>
    l.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'better-tailwindcss'),
  );
  return layer?.settings?.['better-tailwindcss'] as Record<string, unknown>;
}

describe('defineConfig', () => {
  it('is the minimal baseline plus the jsPlugin modules', () => {
    const modules = {
      jest: false,
      nextjs: false,
      nodejs: true,
      react: true,
      storybook: true,
      tailwind: { entryPoint: 'src/global.css' },
      vitest: true,
    };
    const ctx = new Context({ esm: true }, modules);

    expect(extendsOf(defineConfig({ modules }))).toEqual([
      ...extendsOf(defineMinimalConfig({ modules })),
      regex(ctx),
      storybook(ctx),
      tailwind(ctx),
    ]);
  });

  it('keeps the baseline overrides and top-level config untouched', () => {
    const modules = { jest: false, nextjs: false, nodejs: true, react: true, storybook: false, tailwind: false as const, vitest: true };
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

  it('enables the better-tailwindcss jsPlugin with its rules when modules.tailwind is set', () => {
    const layers = extendsOf(defineConfig({ modules: { tailwind: { entryPoint: 'src/global.css' } } }));
    const withPlugin = layers.filter((layer) => layer.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'better-tailwindcss'));

    expect(withPlugin).toHaveLength(1);
    expect(withPlugin[0]?.rules).toEqual(
      expect.objectContaining({
        'better-tailwindcss/enforce-canonical-classes': 'warn',
        'better-tailwindcss/enforce-consistent-class-order': 'warn',
        'better-tailwindcss/enforce-consistent-important-position': 'warn',
        'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
        'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
        'better-tailwindcss/enforce-consistent-variant-order': 'warn',
        'better-tailwindcss/enforce-shorthand-classes': 'warn',
        'better-tailwindcss/no-concatenated-classes': 'error',
        'better-tailwindcss/no-conflicting-classes': 'error',
        'better-tailwindcss/no-deprecated-classes': 'warn',
        'better-tailwindcss/no-duplicate-classes': 'error',
        'better-tailwindcss/no-restricted-classes': 'warn',
        'better-tailwindcss/no-unnecessary-whitespace': 'warn',
      }),
    );
  });

  it('sets the better-tailwindcss callees', () => {
    const settings = tailwindSettings({ modules: { tailwind: { entryPoint: 'src/global.css' } } });

    expect(settings.callees).toEqual([
      ['^(?:class|classnames|classNames|cva|ctl|clsx|cn|cns|cx|cc|clb|cnb|dcnb|objstr|tv|twJoin|twMerge)$', [{ match: 'strings' }]],
    ]);
  });

  it('sets the Tailwind config paths from modules.tailwind', () => {
    const settings = tailwindSettings({
      modules: { tailwind: { entryPoint: 'src/global.css', tailwindConfig: 'tailwind.config.js' } },
    });

    expect(settings).toEqual(expect.objectContaining({ entryPoint: 'src/global.css', tailwindConfig: 'tailwind.config.js' }));
  });

  it('enables the strict better-tailwindcss rules only in strict mode', () => {
    const rulesOf = (strict: boolean) =>
      extendsOf(defineConfig({ modules: { tailwind: { entryPoint: 'src/global.css' } }, options: { strict } })).find((layer) =>
        layer.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'better-tailwindcss'),
      )?.rules;

    expect(rulesOf(false)).toEqual(
      expect.objectContaining({
        'better-tailwindcss/enforce-logical-properties': 'off',
        'better-tailwindcss/no-unknown-classes': 'off',
      }),
    );
    expect(rulesOf(true)).toEqual(
      expect.objectContaining({
        'better-tailwindcss/enforce-logical-properties': 'warn',
        'better-tailwindcss/no-unknown-classes': 'warn',
      }),
    );
  });

  it('passes the other better-tailwindcss options through', () => {
    const settings = tailwindSettings({
      modules: { tailwind: { entryPoint: 'src/global.css', rootFontSize: 16, detectComponentClasses: true } },
    });

    expect(settings).toEqual(expect.objectContaining({ entryPoint: 'src/global.css', rootFontSize: 16, detectComponentClasses: true }));
  });

  it('replaces the default callees when selectors are set', () => {
    const selectors = [{ kind: SelectorKind.Callee, name: '^tw$' }];
    const settings = tailwindSettings({ modules: { tailwind: { entryPoint: 'src/global.css', selectors } } });

    expect(settings).toEqual({ entryPoint: 'src/global.css', selectors });
  });

  it('requires entryPoint or tailwindConfig and type-checks the options', () => {
    // @ts-expect-error -- entryPoint or tailwindConfig is required.
    defineConfig({ modules: { tailwind: { rootFontSize: 16 } } });
    // @ts-expect-error -- rootFontSize is a number.
    defineConfig({ modules: { tailwind: { entryPoint: 'src/global.css', rootFontSize: '16' } } });
  });

  it('disables the better-tailwindcss jsPlugin by default, even when tailwindcss is installed', () => {
    const layers = extendsOf(defineConfig());
    const withPlugin = layers.filter((layer) => layer.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'better-tailwindcss'));

    expect(withPlugin).toHaveLength(0);
  });

  it('disables the better-tailwindcss jsPlugin when modules.tailwind is false', () => {
    const layers = extendsOf(defineConfig({ modules: { tailwind: false } }));
    const withPlugin = layers.filter((layer) => layer.jsPlugins?.find((p) => typeof p === 'object' && p.name === 'better-tailwindcss'));

    expect(withPlugin).toHaveLength(0);
  });

  it('applies the jsPlugin modules after the built-ins but before user extends', () => {
    const userLayer: OxlintConfig = { rules: { 'regexp/strict': 'off' } };
    const layers = extendsOf(
      defineConfig({ modules: { storybook: true, tailwind: { entryPoint: 'src/global.css' } }, extends: [userLayer] }),
    );

    expect(layers.at(-1)).toBe(userLayer);
    expect(layers.at(-2)?.jsPlugins).toContainEqual(expect.objectContaining({ name: 'better-tailwindcss' }));
    expect(layers.at(-3)?.jsPlugins).toContainEqual(expect.objectContaining({ name: 'storybook' }));
    expect(layers.at(-4)?.jsPlugins).toContainEqual(expect.objectContaining({ name: 'regexp' }));
  });

  it('exposes defineOxlintConfig as an alias', () => {
    expect(defineOxlintConfig).toBe(defineConfig);
  });
});
