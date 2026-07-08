/* AUTO-GENERATED from oxc docs — rule typescript/restrict-plus-operands. Do not edit. */

declare const num: number;
declare const str: string;
declare const bool: boolean;
declare const obj: object;

// Mixed types
const result1 = num + str; // number + string
const result2 = str + bool; // string + boolean
const result3 = num + bool; // number + boolean
const result4 = obj + str; // object + string

// Literals with different types
const result5 = 42 + 'hello'; // number literal + string literal
const result6 = true + 5; // boolean literal + number literal
