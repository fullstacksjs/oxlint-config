/* AUTO-GENERATED from oxc docs — rule eslint/vars-on-top. Do not edit. */

function doSomething() {
    if (true) {
        var first = true;
    }
    var second;
}

function doSomethingElse() {
    for (var i = 0; i < 10; i++) {}
}

f();
var a;

class C {
    static {
        if (something) {
            var a = true;
        }
    }
    static {
        f();
        var a;
    }
}
