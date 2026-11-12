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
    expect(defineConfig({ options: { strict: true, esm: false, extensions: false } }).options).toEqual({});
  });

  it('keeps esm on and drops import extensions for Next.js', () => {
    const imports = (defineConfig({ modules: { nextjs: true } }).extends as { rules?: Record<string, unknown> }[]).find(
      (l) => l.rules && 'import/extensions' in l.rules,
    );
    expect(imports?.rules?.['import/extensions']).toEqual(['off', 'always', { ignorePackages: true }]);
    expect(imports?.rules?.['import/no-commonjs']).toBe('error');
  });

  it('requires import extensions by default', () => {
    const imports = (defineConfig().extends as { rules?: Record<string, unknown> }[]).find(
      (l) => l.rules && 'import/extensions' in l.rules,
    );
    expect(imports?.rules?.['import/extensions']).toEqual(['error', 'always', { ignorePackages: true }]);
  });
});
