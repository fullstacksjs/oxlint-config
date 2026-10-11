import type { Selectors } from 'eslint-plugin-better-tailwindcss/api/types';

/**
 * The better-tailwindcss settings.
 * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md
 */
interface TailwindSettings {
  /** Tailwind CSS 4: the CSS entry file (eg: `src/global.css`). */
  entryPoint?: string;
  /** Tailwind CSS 3: the `tailwind.config.js` file. */
  tailwindConfig?: string;
  /** The `tsconfig.json` file, used to resolve path aliases. */
  tsconfig?: string;
  /** The directory to resolve `tailwindcss` and the config from. Useful in monorepos. */
  cwd?: string;
  /** Allow custom component classes (eg: `btn`, `card`) defined in the Tailwind config. */
  detectComponentClasses?: boolean;
  /** The root font size in pixels. */
  rootFontSize?: number;
  /** How lint messages are displayed. */
  messageStyle?: 'compact' | 'raw' | 'visual';
  /** Where to lint Tailwind classes. Replaces the default class-name utilities. */
  selectors?: Selectors;
}

/** Requires `entryPoint` (Tailwind CSS 4) or `tailwindConfig` (Tailwind CSS 3). */
export type TailwindOptions = TailwindSettings & ({ entryPoint: string } | { tailwindConfig: string });
