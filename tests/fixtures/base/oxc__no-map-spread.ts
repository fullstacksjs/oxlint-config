/* AUTO-GENERATED from oxc docs — rule oxc/no-map-spread. Do not edit. */

const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
const arr2 = arr.map(obj => ({ ...obj, b: obj.a * 2 }));
