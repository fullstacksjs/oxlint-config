/* AUTO-GENERATED from oxc docs — rule eslint/grouped-accessor-pairs. Do not edit. */

const foo = {
    get a() {
        return this.val;
    },
    b: 1,
    set a(value) {
        this.val = value;
    }
};

const foo = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

const foo = {
    get a() {
        return this.val;
    },
    set a(value) {
        this.val = value;
    }
};
