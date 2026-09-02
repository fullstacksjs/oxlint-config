import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    ignorePatterns: ['.tmp/**', '**/tests/fixtures/**'],
    rules: {
      'max-lines-per-function': ['warn', 200],
    },
  },
  fmt: {
    ignorePatterns: ['.tmp/**', '**/tests/fixtures/**', 'AGENTS.md', 'README.md'],
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
