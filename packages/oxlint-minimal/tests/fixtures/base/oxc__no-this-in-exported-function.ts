/* AUTO-GENERATED from oxc docs — rule oxc/no-this-in-exported-function. Do not edit. */

export function foo() {
  console.log(this);
}

export default function bar() {
  this.something();
}

function baz() {
  const self = this;
}
export { baz };
