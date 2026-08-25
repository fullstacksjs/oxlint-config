import { createOxlintPreset } from "@fullstacksjs/oxlint-minimal";
import { regex } from "./modules/regex.ts";

export { Context } from "@fullstacksjs/oxlint-minimal";
export type { Config, ModuleConfig, Options, Preset } from "@fullstacksjs/oxlint-minimal";

export const defineConfig = createOxlintPreset({
  name: "@fullstacksjs/oxlint-config",
  modules: (ctx) => [regex(ctx)],
});

export const defineOxlintConfig = defineConfig;
