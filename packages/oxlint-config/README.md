<div align="center">

![FullstacksJS Oxlint Config](https://raw.githubusercontent.com/fullstacksjs/oxlint-config/main/assets/banner.png)

</div>

Shared [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) config for FullstacksJS projects.

This is the [`@fullstacksjs/oxlint-minimal`](https://www.npmjs.com/package/@fullstacksjs/oxlint-minimal) baseline plus the modules that need
an Oxlint [jsPlugin](https://oxc.rs/docs/guide/usage/linter/plugins) (`eslint-plugin-regexp`, `eslint-plugin-storybook`).

If you would rather stay on Oxlint's native path with no jsPlugins, use `@fullstacksjs/oxlint-minimal` instead.

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

Storybook is enabled automatically when the `storybook` package is installed. Enable or disable it explicitly with `modules.storybook`:

```ts
export default defineConfig({
  modules: {
    storybook: true, // or false
  },
});
```

See the [repository README](https://github.com/fullstacksjs/oxlint-config#readme) for modules, options, and customization.
