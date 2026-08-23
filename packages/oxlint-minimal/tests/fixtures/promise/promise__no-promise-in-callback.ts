/* AUTO-GENERATED from oxc docs — rule promise/no-promise-in-callback. Do not edit. */

doSomething((err, val) => {
  if (err) console.error(err)
  else doSomethingElse(val).then(console.log)
})
