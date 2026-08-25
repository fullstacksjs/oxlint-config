import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vite-plus/test';
import { discoverModules } from './support.ts';

const testsDir = path.resolve(import.meta.dirname, 'modules');

describe('module test coverage', () => {
  it.each(discoverModules())('has a test file for "%s"', (mod) => {
    const file = path.join(testsDir, `${mod.name}.test.ts`);
    expect(
      fs.existsSync(file),
      `Missing tests/modules/${mod.name}.test.ts. Add one containing:\n\nimport { defineModuleTests } from '../defineModuleTests.ts';\n\nawait defineModuleTests('${mod.name}');`,
    ).toBe(true);
  });
});
