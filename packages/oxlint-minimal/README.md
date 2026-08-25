<div align="center">

![FullstacksJS Oxlint Config](https://raw.githubusercontent.com/fullstacksjs/oxlint-config/main/assets/banner.png)

</div>

Shared [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) config for FullstacksJS projects, the baseline, using only rules built into
Oxlint.

This package has only one runtime dependency and pulls in no npm-based [jsPlugins](https://oxc.rs/docs/guide/usage/linter/plugins). That
keeps its supply-chain attack surface small and avoids the performance cost of running JavaScript plugins. If you want the regexp rules too,
use [`@fullstacksjs/oxlint-config`](https://www.npmjs.com/package/@fullstacksjs/oxlint-config) instead, which is this baseline plus the
jsPlugin-backed modules.

## Installation

```sh
pnpm install --save-dev @fullstacksjs/oxlint-minimal oxlint
```

## Usage

Create an `oxlint.config.ts` file:

```ts
import { defineConfig } from '@fullstacksjs/oxlint-minimal';

export default defineConfig();
```

See the [repository README](https://github.com/fullstacksjs/oxlint-config#readme) for modules, options, and customization.
