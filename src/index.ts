import type { OxlintConfig } from 'oxlint';

import { base } from './modules/base.ts';
import { Context } from './lib/Context.ts';
import { typescript } from './modules/typescript.ts';

export interface Options extends OxlintConfig {
  strict?: boolean;
  typeAware?: boolean;
}

export function defineConfig(options?: Options): OxlintConfig {
  const { strict, extends: extendsConfig = [], ...rest } = options || {};
  const context = new Context(options);

  return {
    extends: [base(context), typescript(context), ...extendsConfig],
    ...rest,
  };
}

export const defineOxlintConfig = defineConfig;
