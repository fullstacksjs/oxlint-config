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

  get isProjectService() {
    return this.options.typescript?.projectService ?? false;
  }

  strictOr<CS, CL>(strict: CS, lax: CL): CS | CL {
    return this.isStrict ? strict : lax;
  }
  strict<C>(config: C) {
    return this.strictOr(config, 'off');
  }
  projectService<C>(config: C) {
    return this.isProjectService ? config : 'off';
  }
  ts(): AllowWarnDeny {
    return 'off';
  }
}
