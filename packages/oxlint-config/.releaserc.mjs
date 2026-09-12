import { defineReleaseConfig } from '../../.releaserc.base.mjs';

// `dist` bundles oxlint-minimal straight from source, so a change there changes
// what this package publishes and has to cut a release here too.
export default defineReleaseConfig({ dependsOn: ['packages/oxlint-minimal'] });
