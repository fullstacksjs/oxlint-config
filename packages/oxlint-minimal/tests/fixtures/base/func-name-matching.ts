/* AUTO-GENERATED from oxc docs — rule eslint/func-name-matching. Do not edit. */

/*eslint func-name-matching: "error"*/

let foo = function bar() {};
foo = function bar() {};
const obj = {foo: function bar() {}};
obj.foo = function bar() {};
obj['foo'] = function bar() {};

class C {
    foo = function bar() {};
}

/*eslint func-name-matching: ["error", "never"] */

let foo = function foo() {};
foo = function foo() {};
const obj = {foo: function foo() {}};
obj.foo = function foo() {};
obj['foo'] = function foo() {};

class C {
    foo = function foo() {};
}
