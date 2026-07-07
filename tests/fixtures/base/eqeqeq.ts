/* AUTO-GENERATED from oxc docs — rule eslint/eqeqeq. Do not edit. */

/* eqeqeq: "error" */

if (x == 42) {}
if ("" == text) {}
if (obj.getStuff() != undefined) {}

/* eqeqeq: ["error", "smart"] */

if (x == 42) {}
if ("" == text) {}

/* eqeqeq: ["error", "always", { "null": "ignore" }] */
if (x == 42) {}
if ("" == text) {}

/* eqeqeq: ["error", "always", { "null": "always" }] */

if (foo == null) {}
if (foo != null) {}

/* eqeqeq: ["error", "always", { "null": "never" }] */

if (x == 42) {}
if ("" == text) {}
if (foo === null) {}
if (foo !== null) {}
