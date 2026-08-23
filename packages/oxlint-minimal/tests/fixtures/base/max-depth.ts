/* AUTO-GENERATED from oxc docs — rule eslint/max-depth. Do not edit. */

function foo() {
  for (;;) { // Nested 1 deep
    while (true) { // Nested 2 deep
      if (true) { // Nested 3 deep
        if (true) { // Nested 4 deep }
      }
    }
  }
}
