/* AUTO-GENERATED from oxc docs — rule promise/no-return-wrap. Do not edit. */

myPromise().then(() => Promise.resolve(4))
myPromise().then(function() { return Promise.resolve(4) })

myPromise().then(() => Promise.reject("err"))
myPromise().then(function() { return Promise.reject("err") })

myPromise().catch(
  function() {
    return Promise.reject("err")
})

myPromise().finally(
  function() {
    return Promise.reject("err")
})

myPromise().finally(() => Promise.resolve(4))
