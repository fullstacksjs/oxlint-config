/* AUTO-GENERATED from oxc docs — rule eslint/func-names. Do not edit. */

/* func-names: ["error", "always"] */

Foo.prototype.bar = function() {};
const cat = { meow: function() {} };
(function() { /* ... */ }());
export default function() {}

/* func-names: ["error", "as-needed"] */

Foo.prototype.bar = function() {};
(function() { /* ... */ }());
export default function() {}

/* func-names: ["error", "never"] */

Foo.prototype.bar = function bar() {};
(function bar() { /* ... */ }());

/* func-names: ["error", "always", { "generators": "as-needed" }] */

(function*() { /* ... */ }());

/* func-names: ["error", "always", { "generators": "never" }] */

const foo = bar(function *baz() {});

/* func-names: ["error", "as-needed", { "generators": "never" }] */

const foo = bar(function *baz() {});

/* func-names: ["error", "never", { "generators": "always" }] */

const foo = bar(function *() {});
