import type { OxlintConfig } from 'oxlint';
import type { Context } from '../lib/Context.ts';

export function promise(ctx: Context): OxlintConfig {
  return {
    plugins: ['promise'],
    rules: {
      'promise/always-return': 'off',
      'promise/avoid-new': 'off',
      'promise/catch-or-return': 'off',
      'promise/no-callback-in-promise': 'off',
      'promise/no-nesting': 'off',
      'promise/no-new-statics': 'error',
      'promise/no-promise-in-callback': 'error',
      'promise/no-return-in-finally': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'warn',
      'promise/prefer-await-to-callbacks': 'off',
      'promise/prefer-await-to-then': 'off',
      'promise/prefer-catch': ctx.strict('warn'),
      'promise/valid-params': 'warn',
      'promise/no-multiple-resolved': 'warn',
      'promise/spec-only': 'warn',

      // Unsupported
      // 'promise/no-native': 'off',
    },
  };
}
