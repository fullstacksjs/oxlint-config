/* AUTO-GENERATED from oxc docs — rule typescript/no-extra-non-null-assertion. Do not edit. */

const foo: { bar: number } | null = null;
const bar = foo!!!.bar;

function foo(bar: number | undefined) {
  const bar: number = bar!!!;
}

function foo(bar?: { n: number }) {
  return bar!?.n;
}
