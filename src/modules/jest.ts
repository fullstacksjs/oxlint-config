import type { OxlintConfig } from 'oxlint';
import type { Context } from '../lib/Context.ts';

export function jest(_ctx: Context): OxlintConfig {
  return {
    plugins: ['jest'],
    rules: {
      'jest/consistent-test-it': ['warn', { fn: 'it', withinDescribe: 'it' }],
      'jest/expect-expect': 'warn',
      'jest/max-nested-describe': ['error', { max: 2 }],
      'jest/no-alias-methods': 'warn',
      'jest/no-commented-out-tests': 'warn',
      'jest/no-conditional-expect': 'error',
      'jest/no-conditional-in-test': 'error',
      'jest/no-confusing-set-timeout': 'error',
      'jest/no-done-callback': 'error',
      'jest/no-export': 'error',

      // Unsupported
      // 'jest/lowercase-name': 'off',
      // 'jest/no-expect-resolves': 'off',
    },
  };
}
