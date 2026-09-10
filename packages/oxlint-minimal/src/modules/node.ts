import type { OxlintConfig } from 'oxlint';
import type { Context } from '../lib/Context.ts';

export function node(ctx: Context): OxlintConfig {
  return {
    plugins: ['node'],
    rules: {
      'node/callback-return': 'off',
      'node/exports-style': ctx.cjs(['error', 'module.exports', { allowBatchAssign: false }]),
      'node/global-require': 'error',
      'node/handle-callback-err': 'warn',
      'node/no-exports-assign': ctx.cjs('error'),
      'node/no-mixed-requires': ctx.cjs('warn'),
      'node/no-new-require': ctx.cjs('error'),
      'node/no-path-concat': 'error',
      'node/no-process-env': 'error',
      'node/no-sync': ctx.strict('warn'),
      'node/no-top-level-await': 'off',
    },
  };
}
