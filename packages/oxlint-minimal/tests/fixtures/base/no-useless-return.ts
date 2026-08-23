/* AUTO-GENERATED from oxc docs — rule eslint/no-useless-return. Do not edit. */

function foo() { return; }

function bar() {
    doSomething();
    return;
}

function baz() {
    if (condition) {
        doSomething();
        return;
    }
}
