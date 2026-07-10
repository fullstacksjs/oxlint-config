import type { Options } from '../index.ts';
import type { AllowWarnDeny } from 'oxlint';

export class Context {
  options: Options;

  constructor(options?: Options) {
    this.options = options ?? {};
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
