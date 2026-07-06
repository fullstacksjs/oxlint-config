import { type OxlintConfig } from 'oxlint';

import { base } from './modules/base.ts';
import { Context } from './lib/Context.ts';

export interface Options {
  strict?: boolean;
}

export function defineConfig(options?: Options): OxlintConfig {
  const context = new Context(options);

  return {
    extends: [base(context)],
  };
}

export const defineOxlintConfig = defineConfig;
