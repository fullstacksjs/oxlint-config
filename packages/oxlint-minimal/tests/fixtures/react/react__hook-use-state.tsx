/* AUTO-GENERATED from oxc docs — rule react/hook-use-state. Do not edit. */

import React from 'react';
export default function useColor() {
 // useState call is not destructured into value + setter pair
 const useStateResult = React.useState();
 return useStateResult;
}

import React from 'react';
export default function useColor() {
 // useState call is destructured into value + setter pair, but identifier
 // names do not follow the [thing, setThing] naming convention
 const [color, updateColor] = React.useState();
 return [color, updateColor];
}
