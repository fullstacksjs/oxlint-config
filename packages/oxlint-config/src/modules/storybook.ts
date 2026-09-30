import type { OxlintConfig } from 'oxlint';
import type { Context } from '@fullstacksjs/oxlint-minimal/internal';
import { fileURLToPath } from 'node:url';

const storybookPluginPath = fileURLToPath(import.meta.resolve('eslint-plugin-storybook'));

export function storybook(ctx: Context): OxlintConfig {
  return {
    jsPlugins: [{ name: 'storybook', specifier: storybookPluginPath }],
    overrides: [
      {
        files: ['**/*.stories.{ts,tsx,js,jsx,mjs,cjs}', '**/*.story.{ts,tsx,js,jsx,mjs,cjs}'],
        rules: {
          'storybook/await-interactions': 'error',
          'storybook/context-in-play-function': 'error',
          'storybook/csf-component': 'warn',
          'storybook/default-exports': 'error',
          'storybook/hierarchy-separator': 'warn',
          'storybook/meta-inline-properties': 'off',
          'storybook/meta-satisfies-type': 'off',
          'storybook/no-redundant-story-name': 'warn',
          'storybook/no-renderer-packages': 'error',
          'storybook/no-stories-of': 'error',
          'storybook/no-title-property-in-meta': ctx.strict('error'),
          'storybook/prefer-pascal-case': 'warn',
          'storybook/story-exports': 'error',
          'storybook/use-storybook-expect': 'error',
          'storybook/use-storybook-testing-library': 'error',
        },
      },
      {
        files: ['.storybook/main.{js,cjs,mjs,ts}'],
        rules: {
          'storybook/no-uninstalled-addons': 'error',
        },
      },
    ],
  };
}
