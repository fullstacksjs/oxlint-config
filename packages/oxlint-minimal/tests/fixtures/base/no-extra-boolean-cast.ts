/* AUTO-GENERATED from oxc docs — rule eslint/no-extra-boolean-cast. Do not edit. */

var foo = !!!bar;
var foo = Boolean(!!bar);

if (!!foo) {}
if (Boolean(foo)) {}

// with "enforceForInnerExpressions" option enabled
if (!!foo || bar) {}
