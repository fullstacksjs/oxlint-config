/* AUTO-GENERATED from oxc docs — rule eslint/prefer-promise-reject-errors. Do not edit. */

Promise.reject("something bad happened");

Promise.reject(5);

Promise.reject();

new Promise(function(resolve, reject) {
    reject("something bad happened")
});

new Promise(function(resolve, reject) {
    reject();
});
