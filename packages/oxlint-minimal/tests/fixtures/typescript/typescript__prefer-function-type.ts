/* AUTO-GENERATED from oxc docs — rule typescript/prefer-function-type. Do not edit. */

interface Example {
  (): string;
}

function foo(example: { (): number }): number {
  return example();
}

interface ReturnsSelf {
  (arg: string): this;
}
