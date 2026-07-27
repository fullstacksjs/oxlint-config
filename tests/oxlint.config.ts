import { defineConfig } from '../src/index.ts';

export default defineConfig({
  nodejs: true,
  nextjs: true,
  rules: {
    'no-unused-vars': 'off',
  },
});
