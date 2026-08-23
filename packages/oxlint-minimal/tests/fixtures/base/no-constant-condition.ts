/* AUTO-GENERATED from oxc docs — rule eslint/no-constant-condition. Do not edit. */

if (false) {
  doSomethingUnfinished();
}

if (new Boolean(x)) {
  doSomethingAlways();
}
if (x ||= true) {
  doSomethingAlways();
}

do {
  doSomethingForever();
} while (x = -1);
