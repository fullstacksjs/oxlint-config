import { defineConfig } from 'vite-plus';
import { defineOxlintConfig } from './src/index.ts';

export default defineConfig({
  pack: {
    exports: true,
  },
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    extends: [defineOxlintConfig()],
    rules: {
      'max-lines-per-function': ['warn', 200],
    },
  },
  fmt: {
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
