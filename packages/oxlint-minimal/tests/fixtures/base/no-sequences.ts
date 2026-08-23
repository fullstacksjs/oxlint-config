/* AUTO-GENERATED from oxc docs — rule eslint/no-sequences. Do not edit. */

foo = doSomething(), val;

0, eval("doSomething();");

// Arrow function body needs double parentheses
const fn = () => (doSomething(), val);

// with allowInParentheses: false
foo = (doSomething(), val);
