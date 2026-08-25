/* AUTO-GENERATED from oxc docs — rule vitest/valid-describe-callback. Do not edit. */

// Callback function parameters are not allowed
describe('myFunction()', done => {
  // ...
});

// Returning a value from a describe block is not allowed
describe('myFunction', () =>
  it('returns a truthy value', () => {
    expect(myFunction()).toBeTruthy();
}));
