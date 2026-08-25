import type { OxlintConfig } from "oxlint";
import { isPackageExists } from "local-pkg";
import { base } from "./modules/base.ts";
import { Context } from "./lib/Context.ts";
import { typescript } from "./modules/typescript.ts";
import { node } from "./modules/node.ts";
import { imports } from "./modules/imports.ts";
import { react } from "./modules/react.ts";
import { promise } from "./modules/promise.ts";
import { vitest } from "./modules/vitest.ts";
import { jest } from "./modules/jest.ts";
import { next } from "./modules/next.ts";

export { Context };

type OxlintOptions = NonNullable<OxlintConfig["options"]>;

export interface Options extends OxlintOptions {
  strict?: boolean;
  esm?: boolean;
}

export interface ModuleConfig {
  jest?: boolean;
  nextjs?: boolean;
  nodejs?: boolean;
  react?: boolean;
  vitest?: boolean;
}

export interface Config extends OxlintConfig {
  modules?: ModuleConfig;
  options?: Options;
}

export interface Preset {
  name?: string;
  modules?: (ctx: Context) => OxlintConfig[];
}

const defaultModules: ModuleConfig = {
  jest: isPackageExists("jest"),
  vitest: isPackageExists("vitest"),
  nextjs: isPackageExists("next"),
  react: isPackageExists("react"),
};

export function createOxlintPreset(preset: Preset): (config?: Config) => OxlintConfig {
  return function defineConfig(config: Config = {}): OxlintConfig {
    const {
      extends: extendsConfig = [],
      modules: configModules,
      overrides = [],
      options: configOptions,
      ...rest
    } = config;
    const modules = { ...defaultModules, ...configModules };
    const {
      jest: jestEnabled,
      nextjs: nextjsEnabled,
      nodejs: nodejsEnabled,
      react: reactEnabled,
      vitest: vitestEnabled,
    } = modules;

    const defaultOptions: Options = {
      esm: !modules.nextjs,
    };
    const options = { ...defaultOptions, ...configOptions };

    if (process.env.DEBUG_OXLINT_CONFIG) {
      console.log(
        `[${preset.name}] Configuration:\n${JSON.stringify({ modules, options, rest }, null, 2)}`,
      );
    }

    const context = new Context(options, modules);

    return {
      extends: [
        base(context),
        imports(context),
        promise(context),
        typescript(context),
        nodejsEnabled ? node(context) : undefined,
        reactEnabled ? react(context) : undefined,
        vitestEnabled ? vitest(context) : undefined,
        jestEnabled ? jest(context) : undefined,
        nextjsEnabled ? next(context) : undefined,
        ...(preset.modules?.(context) ?? []),
        ...extendsConfig,
      ].filter(Boolean) as OxlintConfig["extends"],
      overrides: [
        {
          files: ["**/*.spec.ts"],
          rules: {
            "no-sparse-arrays": "off",
            "no-plusplus": "off",
            "prefer-promise-reject-errors": "off",
            "no-throw-literal": "off",
            "no-thenable": "off",
          },
        },
        ...overrides,
      ],

      ...rest,
    };
  };
}

export const defineConfig = createOxlintPreset({
  name: "@fullstacksjs/oxlint-minimal",
});

export const defineOxlintConfig = defineConfig;
