import type { AllowWarnDeny } from 'oxlint';
import type { ModuleConfig, Options } from '../index.ts';

export class Context {
  options: Options;
  modules: ModuleConfig;

  constructor(options?: Options, modules?: ModuleConfig) {
    this.options = options ?? {};
    this.modules = modules ?? {};
  }

  get isEsm() {
    return this.options.esm ?? true;
  }

  get isStrict() {
    return this.options.strict ?? false;
  }

  get isTypeAware() {
    return this.options.typeAware ?? false;
  }

  strictOr<CS, CL>(strict: CS, lax: CL): CS | CL {
    return this.isStrict ? strict : lax;
  }

  strict<C>(config: C) {
    return this.strictOr(config, 'off');
  }

  matchModule<C, O>(module: keyof ModuleConfig, config: C, fallback: O): C | O {
    return this.modules[module] ? config : fallback;
  }

  esm(config: AllowWarnDeny): AllowWarnDeny {
    return this.isEsm ? config : 'off';
  }

  cjs(config: AllowWarnDeny): AllowWarnDeny {
    return this.isEsm ? 'off' : config;
  }

  typeAware<C>(config: C) {
    return this.isTypeAware ? config : 'off';
  }

  ts(): AllowWarnDeny {
    return 'off';
  }

  regex(): AllowWarnDeny {
    return 'off';
  }
}
