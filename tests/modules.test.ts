import { describe, expect, it } from 'vite-plus/test';
import { getAllModuleCases, lintFixtureFile } from './support.ts';

const modules = await getAllModuleCases();

for (const m of modules) {
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
