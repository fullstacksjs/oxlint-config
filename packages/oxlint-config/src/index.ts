import type { ModuleConfig as BaseModuleConfig } from '@fullstacksjs/oxlint-minimal';
import { type Config, createPreset } from '@fullstacksjs/oxlint-minimal/internal';
import type { OxlintConfig } from 'oxlint';
import { regex } from './modules/regex.ts';

export interface ModuleConfig extends BaseModuleConfig {
  regex?: boolean;
}

export const defineConfig: (config?: Config<ModuleConfig>) => OxlintConfig = createPreset<ModuleConfig>({
  name: '@fullstacksjs/oxlint-config',
  modules: (ctx) => {
    const regexEnabled = ctx.modules.regex ?? true;
    return regexEnabled ? [regex(ctx)] : [];
  },
});

export const defineOxlintConfig = defineConfig;
