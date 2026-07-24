import type { OxlintConfig } from 'oxlint';
import type { Context } from '../lib/Context.ts';

export function jest(_ctx: Context): OxlintConfig {
  return {
    plugins: ['jest'],
    rules: {
      'jest/consistent-test-it': 'off',
      'jest/expect-expect': 'off',
      'jest/max-nested-describe': ['error', { max: 2 }],
      'jest/no-alias-methods': 'error',
      'jest/no-commented-out-tests': 'warn',
      'jest/no-conditional-expect': 'error',
      'jest/no-conditional-in-test': 'error',
      'jest/no-confusing-set-timeout': 'warn',
      'jest/no-done-callback': 'warn',
      'jest/no-export': 'error',

      // Unsupported
      // 'jest/lowercase-name': 'off',
      // 'jest/no-expect-resolves': 'off',
    },
  };
}
