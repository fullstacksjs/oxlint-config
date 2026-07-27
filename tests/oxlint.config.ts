import { defineConfig } from '../src/index.ts';

export default defineConfig({
  nodejs: true,
  nextjs: true,
  react: true,
  esm: true,
  vitest: true,
  rules: {
    'no-unused-vars': 'off',
  },
});
