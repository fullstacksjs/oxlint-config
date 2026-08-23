/* AUTO-GENERATED from oxc docs — rule vitest/prefer-called-once. Do not edit. */

test('foo', () => {
  const mock = vi.fn()
  mock('foo')
  expect(mock).toBeCalledTimes(1)
  expect(mock).toHaveBeenCalledTimes(1)
})
