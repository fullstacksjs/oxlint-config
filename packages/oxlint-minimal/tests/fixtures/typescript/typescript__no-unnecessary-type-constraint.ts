/* AUTO-GENERATED from oxc docs — rule typescript/no-unnecessary-type-constraint. Do not edit. */

interface FooAny<T extends any> {}
interface FooUnknown<T extends unknown> {}

type BarAny<T extends any> = {};
type BarUnknown<T extends unknown> = {};

const QuuxAny = <T extends any>() => {};

function QuuzAny<T extends any>() {}

class BazAny<T extends any> {
  quxAny<U extends any>() {}
}
