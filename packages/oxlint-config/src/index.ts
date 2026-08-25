import { createPreset } from '@fullstacksjs/oxlint-minimal/internal';
import { regex } from './modules/regex.ts';

export type { ModuleConfig } from '@fullstacksjs/oxlint-minimal';

export const defineConfig = createPreset({
  name: '@fullstacksjs/oxlint-config',
  modules: (ctx) => [regex(ctx)],
});

export const defineOxlintConfig = defineConfig;
