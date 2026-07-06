import type { Options } from '../index.ts';

export class Context {
  constructor(public options: Options = {}) {}

  get isStrict() {
    return this.options.strict ?? false;
  }

  strictOr<CS, CL>(strict: CS, lax: CL): CS | CL {
    return this.isStrict ? strict : lax;
  }
  strict<C>(config: C) {
    return this.strictOr(config, 'off');
  }
}
