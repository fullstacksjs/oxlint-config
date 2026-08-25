import { defineConfig } from '../src';

export default defineConfig({
  modules: {
    nodejs: true,
    nextjs: true,
    react: true,
    vitest: true,
  },
  options: {
    esm: true,
  },
  rules: {
    'no-unused-vars': 'off',
  },
});
