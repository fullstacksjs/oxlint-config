/* AUTO-GENERATED from oxc docs — rule import/namespace. Do not edit. */

// ./qux.js
import * as foo from './foo';
foo.notExported(); // Error: notExported is not exported

// Assignment to a member of an imported namespace
foo.bar = "new value"; // Error: bar cannot be reassigned

// Computed reference to a non-existent export
const method = "notExported";
foo[method](); // Error: notExported does not exist
