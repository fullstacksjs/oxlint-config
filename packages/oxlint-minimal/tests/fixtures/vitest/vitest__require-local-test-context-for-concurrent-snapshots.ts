/* AUTO-GENERATED from oxc docs — rule vitest/require-local-test-context-for-concurrent-snapshots. Do not edit. */

test.concurrent('myLogic', () => {
    expect(true).toMatchSnapshot();
})

describe.concurrent('something', () => {
    test('myLogic', () => {
        expect(true).toMatchInlineSnapshot();
    })
})
