import type { OxlintConfig } from 'oxlint';

import { base } from './modules/base.ts';
import { Context } from './lib/Context.ts';
import { typescript } from './modules/typescript.ts';
import { regex } from './modules/regex.ts';
import { node } from './modules/node.ts';
import { imports } from './modules/imports.ts';
import { react } from './modules/react.ts';
import { promise } from './modules/promise.ts';
import { vitest } from './modules/vitest.ts';
import { jest } from './modules/jest.ts';
import { next } from './modules/next.ts';

type OxlintOptions = NonNullable<OxlintConfig['options']>;

export interface Options extends OxlintOptions {
  strict?: boolean;
  esm?: boolean;
}

export interface Modules {
  jest?: boolean;
  nextjs?: boolean;
  nodejs?: boolean;
  react?: boolean;
  vitest?: boolean;
}

export interface Config extends OxlintConfig {
  modules?: Modules;
  options?: Options;
}

export function defineConfig(config?: Config): OxlintConfig {
  const { extends: extendsConfig = [], modules, overrides = [], options, ...rest } = config ?? {};
  const { jest: jestEnabled, nextjs: nextjsEnabled, nodejs: nodejsEnabled, react: reactEnabled, vitest: vitestEnabled } = modules ?? {};

  const context = new Context(options, modules);

  return {
    extends: [
      base(context),
      imports(context),
      regex(context),
      promise(context),
      typescript(context),
      nodejsEnabled ? node(context) : undefined,
      reactEnabled ? react(context) : undefined,
      vitestEnabled ? vitest(context) : undefined,
      jestEnabled ? jest(context) : undefined,
      nextjsEnabled ? next(context) : undefined,
      ...extendsConfig,
    ].filter(Boolean) as OxlintConfig['extends'],
    overrides: [
      {
        files: ['**/*.spec.ts'],
        rules: {
          'no-sparse-arrays': 'off',
          'no-plusplus': 'off',
          'prefer-promise-reject-errors': 'off',
          'no-throw-literal': 'off',
        },
      },
      ...overrides,
    ],

    ...rest,
  };
}

export const defineOxlintConfig = defineConfig;
