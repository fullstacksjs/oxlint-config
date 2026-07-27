/* AUTO-GENERATED from oxc docs — rule react/jsx-no-constructed-context-values. Do not edit. */

return (
  <SomeContext.Provider value={{foo: 'bar'}}>
    ...
  </SomeContext.Provider>
)

function Component() {
  function foo() {}
  return <MyContext.Provider value={foo} />
}
