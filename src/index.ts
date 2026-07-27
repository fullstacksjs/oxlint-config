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

export interface Options extends OxlintConfig {
  strict?: boolean;
  esm?: boolean;
  typeAware?: boolean;
  jest?: boolean;
}

export function defineConfig(options?: Options): OxlintConfig {
  const { jest: jestEnabled, extends: extendsConfig = [], ...rest } = options || {};
  const context = new Context(options);

  return {
    extends: [
      base(context),
      typescript(context),
      imports(context),
      regex(context),
      node(context),
      react(context),
      promise(context),
      vitest(context),
      jestEnabled ? jest(context) : undefined,
      next(context),
      ...extendsConfig,
    ].filter(Boolean) as OxlintConfig['extends'],
    ...rest,
  };
}

export const defineOxlintConfig = defineConfig;
