import type { OxlintConfig } from 'oxlint';
import { describe, expect, it } from 'vite-plus/test';
import { defineConfig } from '../src/index.ts';
import { Context } from '../src/lib/Context.ts';
import { base } from '../src/modules/base.ts';
import { imports } from '../src/modules/imports.ts';
import { promise } from '../src/modules/promise.ts';
import { typescript } from '../src/modules/typescript.ts';

const allOff = {
  base: false,
  imports: false,
  jest: false,
  nextjs: false,
  nodejs: false,
  promise: false,
  react: false,
  typescript: false,
  vitest: false,
};

function extendsOf(config: OxlintConfig): OxlintConfig[] {
  return (config.extends ?? []) as OxlintConfig[];
}

describe('defineConfig modules', () => {
  it('enables base, imports, promise, and typescript by default', () => {
    const modules = { jest: false, nextjs: false, react: false, vitest: false };
    const ctx = new Context({ esm: true }, { base: true, imports: true, promise: true, typescript: true, ...modules });

    expect(extendsOf(defineConfig({ modules }))).toEqual([base(ctx), imports(ctx), promise(ctx), typescript(ctx)]);
  });

  it('turns every module off with false', () => {
    expect(extendsOf(defineConfig({ modules: allOff }))).toEqual([]);
  });

  it('turns a single module on with true', () => {
    const ctx = new Context({ esm: true }, { ...allOff, promise: true });

    expect(extendsOf(defineConfig({ modules: { ...allOff, promise: true } }))).toEqual([promise(ctx)]);
  });
});
