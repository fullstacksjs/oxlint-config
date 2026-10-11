/* Fixture for the better-tailwindcss callee selectors. Only duplicates, so one rule fires per call. */

declare function cn(...classes: string[]): string;
declare function classNames(...classes: string[]): string;
declare function twMerge(...classes: string[]): string;
declare function cnb(...classes: string[]): string;
declare function unrelated(...classes: string[]): string;

export const a = cn('flex flex');

export const b = classNames('grid grid');

export const c = twMerge('block block');

export const e = cnb('hidden hidden');

export const d = unrelated('flex flex');
