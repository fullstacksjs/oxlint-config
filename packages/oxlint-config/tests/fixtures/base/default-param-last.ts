/* AUTO-GENERATED from oxc docs — rule eslint/default-param-last. Do not edit. */

/* default-param-last: "error" */

function f(a = 0, b) {}
function f(a, b = 0, c) {}
function createUser(isAdmin = false, id) {}
createUser(undefined, "tabby")

/* default-param-last: "error" */

function greet(message: string = "Hello", name: string) {}
function combine(a: number = 1, b: number, c: number) {}
function combine(a: number, b: number = 2, c: number) {}
function combine(a: number = 1, b?: number, c: number) {}
