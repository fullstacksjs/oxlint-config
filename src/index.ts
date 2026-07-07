import { type OxlintConfig } from 'oxlint';

import { base } from './modules/base.ts';
import { Context } from './lib/Context.ts';

export interface Options extends OxlintConfig {
  strict?: boolean;
}

export function defineConfig(options?: Options): OxlintConfig {
  const { strict, extends: extendsConfig = [], ...rest } = options || {};
  const context = new Context(options);

  return {
    extends: [base(context), ...extendsConfig],
    ...rest,
  };
}

export const defineOxlintConfig = defineConfig;
