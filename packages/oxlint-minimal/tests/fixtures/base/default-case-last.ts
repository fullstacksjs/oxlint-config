/* AUTO-GENERATED from oxc docs — rule eslint/default-case-last. Do not edit. */

/* default-case-last: "error" */

switch (foo) {
  default:
    bar();
    break;
  case "a":
    baz();
    break;
}

switch (foo) {
  case 1:
    bar();
    break;
  default:
    baz();
    break;
  case 2:
    qux();
    break;
}
