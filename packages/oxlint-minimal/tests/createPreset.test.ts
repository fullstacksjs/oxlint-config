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
});
