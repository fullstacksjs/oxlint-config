/* AUTO-GENERATED from oxc docs — rule eslint/no-useless-backreference. Do not edit. */

/\1(a)/;                     // backreference appears before group
/(a|\1b)/;                   // group and reference are in different alternatives
/(?<=\1(a))b/;               // backreference used before group in lookbehind
/\1(?!(a))/;                 // group is inside negative lookahead
/(a\1)/;                     // backreference is inside its own group
