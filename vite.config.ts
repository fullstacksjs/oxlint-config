import { defineConfig } from 'vite-plus';
import { defineOxlintConfig } from './src/index.ts';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    exclude: ['**/node_modules/**', '.tmp/**'],
  },
  pack: {
    exports: true,
  },
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    ignorePatterns: ['.tmp/**', 'tests/fixtures/**'],
    extends: [defineOxlintConfig()],
    rules: {
      'max-lines-per-function': ['warn', 200],
    },
  },
  fmt: {
    ignorePatterns: ['.tmp/**', 'tests/fixtures/**'],
    arrowParens: 'always',
    bracketSpacing: true,
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'css',
    bracketSameLine: false,
    jsxSingleQuote: false,
    printWidth: 140,
    proseWrap: 'always',
    quoteProps: 'consistent',
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
  },
});
