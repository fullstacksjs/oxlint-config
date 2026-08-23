/* AUTO-GENERATED from oxc docs — rule eslint/no-throw-literal. Do not edit. */

throw "error";

throw 0;

throw undefined;

throw null;

var err = new Error();
throw "an " + err;
// err is recast to a string literal

var err = new Error();
throw `${err}`
