import type { OxlintConfig } from 'oxlint';
import type { Context } from '../lib/Context.ts';

export function imports(ctx: Context): OxlintConfig {
  return {
    plugins: ['import'],
    rules: {
      'import/consistent-type-specifier-style': ['warn', 'prefer-top-level-if-only-type-imports'],
      'import/extensions': [ctx.esm('error'), 'always', { ignorePackages: true }],
      'import/first': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-absolute-path': 'error',
      'import/no-amd': 'error',
      'import/no-duplicates': 'error',
      'import/no-empty-named-blocks': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-as-default': 'error', // Not sure if this is a good idea.
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/no-webpack-loader-syntax': 'off',
      'import/default': ctx.ts(),
      'import/export': 'error',
      'import/named': ctx.ts(),
      'import/namespace': ctx.ts(),
      'import/no-cycle': ['error', { maxDepth: 8 }],
      'import/no-named-as-default-member': 'error', // this can break old libs.
      'import/exports-last': 'off',
      'import/group-exports': 'off',
      'import/max-dependencies': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/no-commonjs': ctx.esm('error'),
      'import/no-default-export': 'off',
      'import/no-dynamic-require': ctx.strict(['error', { esmodule: ctx.isEsm }]),
      'import/no-named-export': 'off',
      'import/no-namespace': 'off',
      'import/no-nodejs-modules': 'off',
      'import/no-relative-parent-imports': 'off',
      'import/no-unassigned-import': 'off',
      'import/prefer-default-export': 'off',
      'import/unambiguous': 'off',

      /* Unsupported */
      // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      // 'import/no-relative-packages': 'error',
      // 'import/no-unresolved': ['error', { caseSensitiveStrict: true }],
      // 'import/no-useless-path-segments': 'warn',
      // 'import/order': 'off',
      // 'import/no-deprecated': 'warn',
      // 'import/dynamic-import-chunkname': 'off',
      // 'import/no-import-module-exports': 'off',
      // 'import/no-internal-modules': 'off',
      // 'import/no-restricted-paths': 'off',
      // 'import/no-unused-modules': 'off',
    },
  };
}
