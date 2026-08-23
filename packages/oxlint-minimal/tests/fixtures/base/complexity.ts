/* AUTO-GENERATED from oxc docs — rule eslint/complexity. Do not edit. */

function foo() {
  if (foo1) {
    return x1; // 1st path
  } else if (foo2) {
    return x2; // 2nd path
  } else {
    return x3; // 3rd path
  }
}

function bar() {
  // there are 2 paths - when bar1 is falsy, and when bar1 is truthy, in which bar1 = bar1 && bar2;
  bar1 &&= bar2;
  // there are 2 paths - when bar3 is truthy, and when bar3 is falsy, in which bar3 = 4;
  bar3 ||= 4;
}

// there are 2 paths - when baz1 is defined, and when baz1 is undefined and is assigned 'a'
function baz(baz1 = 'a') {
  const { baz2 = 'b' } = baz3; // there are 2 additional paths - when baz2 is defined and when baz2 is not
}

function d() {
  d1 = d2?.d3?.(); // optional chaining creates 2 paths each - when object is defined and when it is not
}
