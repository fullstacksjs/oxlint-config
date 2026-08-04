<div align="center">

![FullstacksJS Oxlint Config](https://raw.githubusercontent.com/fullstacksjs/oxlint-config/main/assets/banner.png)

![downloads][download-badge] ![version][version-badge] ![license][license-badge]

</div>

Shared [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) config for FullstacksJS projects.

## Installation

```sh
npm install --save-dev @fullstacksjs/oxlint-config oxlint
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

Base, TypeScript, import, promise, and regexp rules are enabled by default. Enable project-specific modules as needed:

```ts
import { defineConfig } from '@fullstacksjs/oxlint-config';

export default defineConfig({
  modules: {
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

`esm` defaults to `true`. `strict` and `typeAware` default to `false`.

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

## Development

```sh
vp install
vp check
vp test
vp pack
```

[download-badge]: https://img.shields.io/npm/dm/@fullstacksjs/oxlint-config?color=6464E2&label=DOWNLOADS&style=flat-square
[version-badge]: https://img.shields.io/npm/v/@fullstacksjs/oxlint-config?color=6464E2&label=VERSION&style=flat-square
[license-badge]: https://img.shields.io/npm/l/@fullstacksjs/oxlint-config?color=6464E2&label=LICENSE&style=flat-square
