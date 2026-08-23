/* AUTO-GENERATED from oxc docs — rule eslint/no-eval. Do not edit. */

const obj = { x: "foo" },
  key = "x",
  value = eval("obj." + key);

(0, eval)("const a = 0");

const foo = eval;
foo("const a = 0");

this.eval("const a = 0");
