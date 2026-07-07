/* AUTO-GENERATED from oxc docs — rule eslint/no-iterator. Do not edit. */

Foo.prototype.__iterator__ = function() {
    return new FooIterator(this);
};

foo.__iterator__ = function () {};

foo["__iterator__"] = function () {};
