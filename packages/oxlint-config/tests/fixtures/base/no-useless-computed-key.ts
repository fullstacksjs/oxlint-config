/* AUTO-GENERATED from oxc docs — rule eslint/no-useless-computed-key. Do not edit. */

const a = { ['0']: 0 };
const b = { ['0+1,234']: 0 };
const c = { [0]: 0 };
const e = { ['x']() {} };

class Foo {
    ["foo"] = "bar";
    [0]() {}
    static ["foo"] = "bar";
    get ['b']() {}
    set ['c'](value) {}
}
