/* AUTO-GENERATED from oxc docs — rule react/exhaustive-deps. Do not edit. */

function MyComponent(props) {
    useEffect(() => {
        console.log(props.foo);
    }, []);
    // `props` is missing from the dependencies array
    return <div />;
}
