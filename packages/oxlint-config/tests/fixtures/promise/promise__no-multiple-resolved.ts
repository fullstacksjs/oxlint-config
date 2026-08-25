/* AUTO-GENERATED from oxc docs — rule promise/no-multiple-resolved. Do not edit. */

new Promise((resolve, reject) => {
  fn((error, value) => {
    if (error) {
      reject(error)
    }

    resolve(value) // Both `reject` and `resolve` may be called.
  })
})
