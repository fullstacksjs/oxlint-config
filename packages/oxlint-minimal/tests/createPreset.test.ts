import { describe, expect, it } from 'vite-plus/test';
import { defineConfig } from '../src/index.ts';

describe('defineConfig options', () => {
  it('forwards typeAware to oxlint so type-aware rules run', () => {
    expect(defineConfig({ options: { typeAware: true } }).options).toEqual({ typeAware: true });
  });

  it('forwards other oxlint options', () => {
    expect(defineConfig({ options: { typeCheck: true, maxWarnings: 0 } }).options).toEqual({ typeCheck: true, maxWarnings: 0 });
  });

  it('strips preset-only options that oxlint does not know', () => {
    expect(defineConfig({ options: { strict: true, esm: false } }).options).toEqual({});
  });

  describe('test file overrides', () => {
    const testOverride = (config?: Parameters<typeof defineConfig>[0]) => defineConfig(config).overrides?.[0];

    it('covers test, spec, stories and __tests__ files', () => {
      expect(testOverride()?.files).toEqual([
        '**/*.{test,spec,stories,story}.{ts,tsx,js,jsx,mts,cts,mjs,cjs}',
        '**/__tests__/**/*.{ts,tsx,js,jsx,mts,cts,mjs,cjs}',
      ]);
    });

    it('relaxes react/rules-of-hooks only when react is enabled', () => {
      expect(testOverride({ modules: { react: true } })?.rules).toHaveProperty('react/rules-of-hooks', 'off');
      expect(testOverride({ modules: { react: false } })?.rules).not.toHaveProperty('react/rules-of-hooks');
    });
  });
});
