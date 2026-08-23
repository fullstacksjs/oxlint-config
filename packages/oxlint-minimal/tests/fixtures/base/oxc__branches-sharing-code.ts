/* AUTO-GENERATED from oxc docs — rule oxc/branches-sharing-code. Do not edit. */

if (condition) {
    console.log("Hello");
    return 13;
} else {
    console.log("Hello");
    return 42;
};

if (condition) {
    doSomething();
    cleanup();
} else {
    doSomethingElse();
    cleanup();
}
