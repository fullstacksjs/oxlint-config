import type { OxlintConfig } from 'oxlint';
import type { Context } from '@fullstacksjs/oxlint-minimal/internal';
import { fileURLToPath } from 'node:url';
import type { TailwindOptions } from '../types/tailwind.d.ts';

const tailwindPluginPath = fileURLToPath(import.meta.resolve('eslint-plugin-better-tailwindcss'));

const callees = [
  ['^(?:class|classnames|classNames|cva|ctl|clsx|cn|cns|cx|cc|clb|cnb|dcnb|objstr|tv|twJoin|twMerge)$', [{ match: 'strings' }]],
];

export function tailwind(ctx: Context): OxlintConfig {
  const options = (ctx.modules as { tailwind?: TailwindOptions }).tailwind;

  return {
    jsPlugins: [{ name: 'better-tailwindcss', specifier: tailwindPluginPath }],
    settings: {
      'better-tailwindcss': {
        // The plugin lets legacy `callees` win over `selectors`, so drop them when the user sets selectors.
        ...(options?.selectors ? {} : { callees }),
        ...options,
      },
    },
    rules: {
      'better-tailwindcss/enforce-canonical-classes': 'warn',
      'better-tailwindcss/enforce-consistent-class-order': 'warn',
      'better-tailwindcss/enforce-consistent-important-position': 'warn',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
      'better-tailwindcss/enforce-consistent-variant-order': 'warn',
      'better-tailwindcss/enforce-logical-properties': ctx.strict('warn'),
      'better-tailwindcss/enforce-shorthand-classes': 'warn',
      'better-tailwindcss/no-concatenated-classes': 'error',
      'better-tailwindcss/no-conflicting-classes': 'error',
      'better-tailwindcss/no-deprecated-classes': 'warn',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-restricted-classes': 'warn',
      'better-tailwindcss/no-unknown-classes': ctx.strict('warn'),
      'better-tailwindcss/no-unnecessary-whitespace': 'warn',
    },
  };
}
