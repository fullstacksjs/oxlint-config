import type { AllowWarnDeny } from 'oxlint';
import type { Options, ModuleConfig } from './createPreset.ts';

export class Context<M extends ModuleConfig = ModuleConfig> {
  options: Options;
  modules: M;

  constructor(options?: Options, modules?: M) {
    this.options = options ?? {};
    this.modules = modules ?? ({} as M);
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

  matchModule<C, O>(module: keyof M, config: C, fallback: O): C | O {
    return this.modules[module] ? config : fallback;
  }

  esm(config: AllowWarnDeny): AllowWarnDeny {
    return this.isEsm ? config : 'off';
  }

  cjs<const T>(config: T): T | 'off' {
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
