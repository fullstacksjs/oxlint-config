/* AUTO-GENERATED from oxc docs — rule eslint/no-unused-vars. Do not edit. */

/* no-unused-vars: "error" */
/* if you have `some_unused_var` defined as a global in .oxlintrc.json */

// It checks variables you have defined as global
some_unused_var = 42;

var x;

// Write-only variables are not considered as used.
var y = 10;
y = 5;

// A read for a modification of itself is not considered as used.
var z = 0;
z = z + 1;

// By default, unused arguments cause warnings.
(function(foo) {
    return 5;
})();

// Unused recursive functions also cause warnings.
function fact(n) {
    if (n < 2) return 1;
    return n * fact(n - 1);
}

// When a function definition destructures an array, unused entries from
// the array also cause warnings.
function getY([x, y]) {
    return y;
}

type A = Array<A>;

enum Color {
    Red,
    Green,
    Blue
}

/* exported global_var */

// Not respected, use ES modules instead.
var global_var = 42;
