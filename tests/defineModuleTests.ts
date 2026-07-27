import { describe, expect, it } from 'vite-plus/test';
import { getModuleCase, lintFixtureFile } from './support.ts';

/**
 * Registers the snapshot tests for a single module. Keeping each module in its
 * own test file makes Vitest write a separate snapshot file per module under
 * `tests/modules/__snapshots__/<module>.test.ts.snap`.
 */
export async function defineModuleTests(name: string): Promise<void> {
  const m = await getModuleCase(name);

  describe(m.name, () => {
    it('has fixtures generated', () => {
      expect(m.hasFixtures, `No fixtures for "${m.name}". Run \`pnpm generate:fixtures\`.`).toBe(true);
    });

    for (const fx of m.fixtures) {
      it(fx.rule, () => {
        expect(lintFixtureFile(m.config, fx.file)).toMatchSnapshot();
      });
    }
  });
}
