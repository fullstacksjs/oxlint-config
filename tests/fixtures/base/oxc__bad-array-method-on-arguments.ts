/* AUTO-GENERATED from oxc docs — rule oxc/bad-array-method-on-arguments. Do not edit. */

function add(x, y) {
  return x + y;
}
function sum() {
  return arguments.reduce(add, 0);
}
