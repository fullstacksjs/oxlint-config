<div align="center">

![FullstacksJS Oxlint Config](https://raw.githubusercontent.com/fullstacksjs/oxlint-config/main/assets/banner.png)

![downloads][download-badge] ![version][version-badge] ![license][license-badge]

Shared [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) config for FullstacksJS projects.
</div>

## Packages

| Package                                                   | Contents                                                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`@fullstacksjs/oxlint-minimal`](packages/oxlint-minimal) | The baseline config. Oxlint's native rules, no jsPlugins and dependency.                              |
| [`@fullstacksjs/oxlint-config`](packages/oxlint-config)   | The baseline plus the modules that need a [jsPlugin](https://oxc.rs/docs/guide/usage/linter/plugins). |

Every shared rule lives in `oxlint-minimal`. `oxlint-config` holds only its own modules and composes them onto the baseline through
`createPreset`, so a rule change is made in exactly one place. The baseline is bundled into `oxlint-config` at build time and is not a
dependency of the published package.

`oxlint-minimal` has only one runtime dependency and deliberately excludes npm-based lint plugins. This keeps its supply-chain attack
surface small and avoids the performance cost of running JavaScript plugins.

## Installation

```sh
pnpm install --save-dev @fullstacksjs/oxlint-config oxlint
```

## Usage

Create an `oxlint.config.ts` file:

```ts
import { defineConfig } from '@fullstacksjs/oxlint-config';

export default defineConfig();
```

Then run Oxlint:

```sh
oxlint
```

Every module is a boolean in `modules`. Set it to `true` to turn the module on and `false` to turn it off:

```ts
import { defineConfig } from '@fullstacksjs/oxlint-config';

export default defineConfig({
  modules: {
    base: true,
    imports: true,
    promise: true,
    typescript: true,
    regex: true,
    nodejs: true,
    react: true,
    nextjs: true,
    vitest: true,
    jest: false,
  },
  options: {
    strict: true,
    typeAware: true,
    esm: true,
  },
});
```

`@fullstacksjs/oxlint-config` has every `@fullstacksjs/oxlint-minimal` module, plus `regex`.

| Module       | Default                         |
| ------------ | ------------------------------- |
| `base`       | `true`                          |
| `imports`    | `true`                          |
| `promise`    | `true`                          |
| `typescript` | `true`                          |
| `nodejs`     | `false`                         |
| `react`      | `true` if `react` is installed  |
| `nextjs`     | `true` if `next` is installed   |
| `vitest`     | `true` if `vitest` is installed |
| `jest`       | `true` if `jest` is installed   |
| `regex`      | `true` (`oxlint-config` only)   |

| Option      | Default                               |
| ----------- | ------------------------------------- |
| `esm`       | `true` (`false` when `nextjs` is on)  |
| `strict`    | `false`                               |
| `typeAware` | `false`                               |

## Customization

Pass any standard Oxlint config options to `defineConfig`:

```ts
export default defineConfig({
  rules: {
    'no-console': 'error',
  },
  overrides: [
    {
      files: ['**/*.spec.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
});
```

## Debug

Set `DEBUG_OXLINT_CONFIG` to print the resolved modules, options, and remaining configuration passed to `defineConfig`:

```sh
DEBUG_OXLINT_CONFIG=1 oxlint
```

## Finding missing Oxlint rules

List native rules supported by the installed Oxlint version but not mentioned
in this preset:

```sh
vp run rules:missing
```

[download-badge]: https://img.shields.io/npm/dm/@fullstacksjs/oxlint-config?color=6464E2&label=DOWNLOADS&style=flat-square
[version-badge]: https://img.shields.io/npm/v/@fullstacksjs/oxlint-config?color=6464E2&label=VERSION&style=flat-square
[license-badge]: https://img.shields.io/npm/l/@fullstacksjs/oxlint-config?color=6464E2&label=LICENSE&style=flat-square
