import type { OxlintConfig } from 'oxlint';
import { isPackageExists } from 'local-pkg';
import {
  createPreset,
  type Config as MinimalConfig,
  type ModuleConfig as MinimalModuleConfig,
} from '@fullstacksjs/oxlint-minimal/internal';
import { regex } from './modules/regex.ts';
import { storybook } from './modules/storybook.ts';

export interface ModuleConfig extends MinimalModuleConfig {
  storybook?: boolean;
}

export type Config = Omit<MinimalConfig, 'modules'> & {
  modules?: ModuleConfig;
};

export const defineConfig: (config?: Config) => OxlintConfig = createPreset({
  name: '@fullstacksjs/oxlint-config',
  modules: (ctx) => {
    const storybookEnabled = (ctx.modules as ModuleConfig).storybook ?? isPackageExists('storybook');
    return [regex(ctx), ...(storybookEnabled ? [storybook(ctx)] : [])];
  },
});

export const defineOxlintConfig = defineConfig;
