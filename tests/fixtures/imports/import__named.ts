/* AUTO-GENERATED from oxc docs — rule import/named. Do not edit. */

// ./baz.js
import { notFoo } from './foo'

// re-export
export { notFoo as defNotBar } from './foo'

// will follow 'jsnext:main', if available
import { dontCreateStore } from 'redux'
