/* AUTO-GENERATED from oxc docs — rule eslint/no-useless-assignment. Do not edit. */

function fn1() {
  let v = 'used';
  doSomething(v);
  v = 'unused';              // assigned but never read
}

function fn2() {
  let v = 'used';
  if (condition) {
    v = 'unused';            // early return; this write is never observed
    return;
  }
  doSomething(v);
}

function fn3() {
  let v = 'used';
  if (condition) {
    doSomething(v);
  } else {
    v = 'unused';            // value not used later in this branch
  }
}
