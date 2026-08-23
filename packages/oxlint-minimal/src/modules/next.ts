import type { OxlintConfig } from 'oxlint';
import type { Context } from '../lib/Context.ts';

export function next(_ctx: Context): OxlintConfig {
  return {
    plugins: ['nextjs'],
    rules: {
      'nextjs/google-font-display': 'error',
      'nextjs/google-font-preconnect': 'error',
      'nextjs/inline-script-id': 'warn',
      'nextjs/next-script-for-ga': 'error',
      'nextjs/no-assign-module-variable': 'error',
      'nextjs/no-async-client-component': 'error',
      'nextjs/no-before-interactive-script-outside-document': 'error',
      'nextjs/no-css-tags': 'error',
      'nextjs/no-document-import-in-page': 'error',
      'nextjs/no-duplicate-head': 'error',
      'nextjs/no-head-element': 'error',
      'nextjs/no-head-import-in-document': 'error',
      'nextjs/no-html-link-for-pages': 'warn',
      'nextjs/no-img-element': 'off',
      'nextjs/no-page-custom-font': 'warn',
      'nextjs/no-script-component-in-head': 'error',
      'nextjs/no-styled-jsx-in-document': 'error',
      'nextjs/no-sync-scripts': 'warn',
      'nextjs/no-title-in-document-head': 'error',
      'nextjs/no-typos': 'warn',
      'nextjs/no-unwanted-polyfillio': 'warn',
    },
  };
}
