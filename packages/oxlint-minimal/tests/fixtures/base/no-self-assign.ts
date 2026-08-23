/* AUTO-GENERATED from oxc docs — rule eslint/no-self-assign. Do not edit. */

foo = foo;

[a, b] = [a, b];
[a, ...b] = [x, ...b];

({a, b} = {a, x});

foo &&= foo;
foo ||= foo;
foo ??= foo;

obj.a = obj.a;
obj.a.b = obj.a.b;
obj["a"] = obj["a"];
obj[a] = obj[a];
