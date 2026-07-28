/* AUTO-GENERATED from oxc docs — rule oxc/no-accumulating-spread. Do not edit. */

arr.reduce((acc, x) => ({ ...acc, [x]: fn(x) }), {})
Object.keys(obj).reduce((acc, el) => ({ ...acc, [el]: fn(el) }), {})

let foo = []; for (let i = 0; i < 10; i++) { foo = [...foo, i]; }
