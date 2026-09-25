import type { OxlintConfig } from 'oxlint';
import { isPackageExists } from 'local-pkg';
import { base } from '../modules/base.ts';
import { Context } from './Context.ts';
import { typescript } from '../modules/typescript.ts';
import { node } from '../modules/node.ts';
import { imports } from '../modules/imports.ts';
import { react } from '../modules/react.ts';
import { promise } from '../modules/promise.ts';
import { vitest } from '../modules/vitest.ts';
import { jest } from '../modules/jest.ts';
import { next } from '../modules/next.ts';

type OxlintOptions = NonNullable<OxlintConfig['options']>;

export interface Options extends OxlintOptions {
  strict?: boolean;
  esm?: boolean;
}

export interface ModuleConfig {
  base?: boolean;
  imports?: boolean;
  jest?: boolean;
  nextjs?: boolean;
  nodejs?: boolean;
  promise?: boolean;
  react?: boolean;
  typescript?: boolean;
  vitest?: boolean;
}

const defaultModules: ModuleConfig = {
  base: true,
  imports: true,
  promise: true,
  typescript: true,
  jest: isPackageExists('jest'),
  vitest: isPackageExists('vitest'),
  nextjs: isPackageExists('next'),
  react: isPackageExists('react'),
};

export interface Preset<M extends ModuleConfig = ModuleConfig> {
  name?: string;
  modules?: (ctx: Context<M>) => OxlintConfig[];
}

export interface Config<M extends ModuleConfig = ModuleConfig> extends OxlintConfig {
  modules?: M;
  options?: Options;
}

export function createPreset<M extends ModuleConfig = ModuleConfig>(preset: Preset<M>): (config?: Config<M>) => OxlintConfig {
  return function defineConfig(config: Config<M> = {}): OxlintConfig {
    const { extends: extendsConfig = [], modules: configModules, overrides = [], options: configOptions, ...rest } = config;
    const modules = { ...defaultModules, ...configModules } as M;

    const defaultOptions: Options = {
      esm: !modules.nextjs,
    };
    const options = { ...defaultOptions, ...configOptions };

    if (process.env.DEBUG_OXLINT_CONFIG) {
      console.log(`[${preset.name}] Configuration:\n${JSON.stringify({ modules, options, rest }, null, 2)}`);
    }

    const context = new Context<M>(options, modules);

    return {
      extends: [
        modules.base ? base(context) : undefined,
        modules.imports ? imports(context) : undefined,
        modules.promise ? promise(context) : undefined,
        modules.typescript ? typescript(context) : undefined,
        modules.nodejs ? node(context) : undefined,
        modules.react ? react(context) : undefined,
        modules.vitest ? vitest(context) : undefined,
        modules.jest ? jest(context) : undefined,
        modules.nextjs ? next(context) : undefined,
        ...(preset.modules?.(context) ?? []),
        ...extendsConfig,
      ].filter(Boolean) as OxlintConfig['extends'],
      overrides: [
        {
          files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.stories.tsx'],
          rules: {
            'no-sparse-arrays': 'off',
            'no-plusplus': 'off',
            'prefer-promise-reject-errors': 'off',
            'no-throw-literal': 'off',
            'no-thenable': 'off',
            'max-lines-per-function': 'off',
            'react-hooks/rules-of-hooks': 'off',
          },
        },
        ...overrides,
      ],

      ...rest,
    };
  };
}
