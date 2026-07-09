import type { OxlintConfig } from 'oxlint';
import type { Context } from '../lib/Context.ts';

export function node(ctx: Context): OxlintConfig {
  return {
    plugins: ['node'],
    rules: {
      'node/callback-return': 'off',
      'node/global-require': 'warn',
      'node/handle-callback-err': 'warn',
      'node/no-exports-assign': 'error',
      'node/no-mixed-requires': 'warn',
      'node/no-new-require': 'error',
      'node/no-path-concat': 'error',
      'node/no-process-env': 'error',
      'node/no-sync': ctx.strict('warn'),

      /* Unsupported */
      // 'node/exports-style': ['error', 'module.exports', { allowBatchAssign: false }],
      // 'node/hashbang': 'off',
      // 'node/no-callback-literal': 'off',
      // 'node/no-deprecated-api': 'error',
      // 'node/no-process-exit': 'off',
      // 'node/no-restricted-import': 'off',
      // 'node/no-restricted-require': 'off',
      // 'node/no-top-level-await': 'off',
      // 'node/no-unpublished-bin': 'warn',
      // 'node/no-unpublished-import': 'off',
      // 'node/no-unpublished-require': 'warn',
      // 'node/no-unsupported-features/es-builtins': 'off',
      // 'node/no-unsupported-features/es-syntax': 'off',
      // 'node/no-unsupported-features/node-builtins': 'off',
      // 'node/prefer-global/buffer': 'warn',
      // 'node/prefer-global/console': 'warn',
      // 'node/prefer-global/crypto': 'warn',
      // 'node/prefer-global/text-decoder': 'warn',
      // 'node/prefer-global/text-encoder': 'warn',
      // 'node/prefer-global/timers': 'warn',
      // 'node/prefer-global/url-search-params': 'warn',
      // 'node/prefer-global/url': 'warn',
      // 'node/prefer-node-protocol': 'warn',
      // 'node/prefer-promises/dns': 'warn',
      // 'node/prefer-promises/fs': 'warn',
      // 'node/process-exit-as-throw': 'error',
    },
  };
}
