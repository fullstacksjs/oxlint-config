/* AUTO-GENERATED from oxc docs — rule react/rules-of-hooks. Do not edit. */

// Don't call Hooks inside loops, conditions, or nested functions
function BadComponent() {
  if (condition) {
    const [state, setState] = useState(); // ❌ Hook in condition
  }

  for (let i = 0; i < 10; i++) {
    useEffect(() => {}); // ❌ Hook in loop
  }
}

// Don't call Hooks from regular JavaScript functions
function regularFunction() {
  const [state, setState] = useState(); // ❌ Hook in regular function
}
