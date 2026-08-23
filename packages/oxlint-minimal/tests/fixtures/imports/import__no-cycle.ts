/* AUTO-GENERATED from oxc docs — rule import/no-cycle. Do not edit. */

// dep-b.js
import './dep-a.js'
export function b() { /* ... */ }

// dep-a.js
import { b } from './dep-b.js' // reported: Dependency cycle detected.
export function a() { /* ... */ }
