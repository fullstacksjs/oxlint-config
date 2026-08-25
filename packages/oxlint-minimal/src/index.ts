import { createPreset } from "./lib/createPreset.ts";

export type { ModuleConfig } from "./lib/createPreset.ts";

export const defineConfig = createPreset({
  name: "@fullstacksjs/oxlint-minimal",
});

export const defineOxlintConfig = defineConfig;
