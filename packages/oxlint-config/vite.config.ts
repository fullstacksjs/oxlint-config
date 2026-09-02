import path from 'node:path';
import { defineConfig } from 'vite-plus';
import { defineOxlintConfig } from '../oxlint-minimal/src/index.ts';

const minimalAliases = {
  '@fullstacksjs/oxlint-minimal/internal': path.resolve(import.meta.dirname, '../oxlint-minimal/src/lib/index.ts'),
  '@fullstacksjs/oxlint-minimal': path.resolve(import.meta.dirname, '../oxlint-minimal/src/index.ts'),
};

export default defineConfig({
  resolve: {
    alias: minimalAliases,
  },
  test: {
    include: ['tests/**/*.test.ts'],
    exclude: ['**/node_modules/**', '.tmp/**'],
  },
  pack: {
    dts: {
      tsgo: true,
    },
    // The minimal baseline is bundled from source, so declaration emit has to span both packages.
    tsconfig: '../tsconfig.dts.json',
    alias: minimalAliases,
    exports: true,
    workspace: true,
  },
  lint: {
    extends: [defineOxlintConfig()],
  },
  fmt: {},
});
