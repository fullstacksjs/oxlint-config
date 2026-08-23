/* AUTO-GENERATED from oxc docs — rule react/only-export-components. Do not edit. */

// 1) Mixing util exports with components in unsupported ways
export const foo = () => {};      // util, not a component
export const Bar = () => <></>;   // component

// 2) Anonymous default export (name is required)
export default function () {}

// 3) Re-exporting everything hides what’s exported
export * from "./foo";

// 4) Exporting JSX collections makes components non-discoverable
const Tab = () => null;
export const tabs = [<Tab />, <Tab />];

// 5) Bootstrapping a root within the same module that defines components
const App = () => null;
createRoot(document.getElementById("root")).render(<App />);
