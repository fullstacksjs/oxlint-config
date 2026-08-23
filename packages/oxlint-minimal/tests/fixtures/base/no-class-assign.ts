/* AUTO-GENERATED from oxc docs — rule eslint/no-class-assign. Do not edit. */

class A { }
A = 0;

A = 0;
class A { }

class A {
  b() {
    A = 0;
  }
}

let A = class A {
  b() {
    A = 0;
    // `let A` is shadowed by the class name.
  }
}
