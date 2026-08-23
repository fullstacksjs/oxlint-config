/* AUTO-GENERATED from oxc docs — rule eslint/no-extra-bind. Do not edit. */

const x = function () {
foo();
}.bind(bar);

const z = (() => {
    this.foo();
}).bind(this);
