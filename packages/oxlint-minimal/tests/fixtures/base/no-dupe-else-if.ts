/* AUTO-GENERATED from oxc docs — rule eslint/no-dupe-else-if. Do not edit. */

if (a) {
    foo();
} else if (b) {
    bar();
} else if (b) {
    baz();
}

if (a || b) {
   foo();
} else if (a) {
   bar();
}

if (n === 1) {
    foo();
} else if (n === 2) {
    bar();
} else if (n === 3) {
    baz();
} else if (n === 2) {
    quux();
} else if (n === 5) {
    quuux();
}
