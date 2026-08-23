/* AUTO-GENERATED from oxc docs — rule import/no-self-import. Do not edit. */

// foo.js
import foo from './foo.js';  // Incorrect: module imports itself
const foo = require('./foo'); // Incorrect: module imports itself
