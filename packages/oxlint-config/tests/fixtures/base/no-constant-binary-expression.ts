/* AUTO-GENERATED from oxc docs — rule eslint/no-constant-binary-expression. Do not edit. */

// One might think this would evaluate as `a + (b ?? c)`:
const x = a + b ?? c;

// But it actually evaluates as `(a + b) ?? c`. Since `a + b` can never be null,
// the `?? c` has no effect.

// Programmers coming from a language where objects are compared by value might expect this to work:
const isEmpty = x === [];

// However, this will always result in `isEmpty` being `false`.
