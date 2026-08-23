/* AUTO-GENERATED from oxc docs — rule eslint/no-unsafe-finally. Do not edit. */

// We expect this function to return 1;
(() => {
    try {
        return 1; // 1 is returned but suspended until finally block ends
    } catch(err) {
        return 2;
    } finally {
        return 3; // 3 is returned before 1, which we did not expect
    }
})();

// > 3
