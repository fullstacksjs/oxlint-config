import type { OxlintConfig } from 'oxlint';
import { isPackageExists } from 'local-pkg';
import {
  createPreset,
  type Config as MinimalConfig,
  type ModuleConfig as MinimalModuleConfig,
} from '@fullstacksjs/oxlint-minimal/internal';
import { regex } from './modules/regex.ts';
import { storybook } from './modules/storybook.ts';
import { tailwind } from './modules/tailwind.ts';
import type { TailwindOptions } from './types/tailwind.d.ts';

export type { TailwindOptions };

export interface ModuleConfig extends MinimalModuleConfig {
  storybook?: boolean;
  /**
   * Controls the better-tailwindcss plugin. Enabled by passing the Tailwind config paths.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md
   */
  tailwind?: false | TailwindOptions;
}

export type Config = Omit<MinimalConfig, 'modules'> & {
  modules?: ModuleConfig;
};

export const defineConfig: (config?: Config) => OxlintConfig = createPreset({
  name: '@fullstacksjs/oxlint-config',
  modules: (ctx) => {
    const modules = ctx.modules as ModuleConfig;
    const storybookEnabled = modules.storybook ?? isPackageExists('storybook');
    return [regex(ctx), ...(storybookEnabled ? [storybook(ctx)] : []), ...(modules.tailwind ? [tailwind(ctx)] : [])];
  },
});

export const defineOxlintConfig = defineConfig;
