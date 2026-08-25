import { defineConfig } from 'vite-plus';
import { defineOxlintConfig } from './src/index.ts';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    exclude: ['**/node_modules/**', '.tmp/**'],
  },
  pack: {
    entry: {
      index: 'src/index.ts',
      internal: 'src/lib/index.ts',
    },
    dts: {
      tsgo: true,
    },
    // Root `exports` point at source so workspace consumers (@fullstacksjs/oxlint-config)
    // resolve this package without a prior build; `publishConfig.exports` point at dist.
    exports: { devExports: true },
    workspace: true,
  },
  lint: {
    extends: [defineOxlintConfig()],
  },
  fmt: {},
});
