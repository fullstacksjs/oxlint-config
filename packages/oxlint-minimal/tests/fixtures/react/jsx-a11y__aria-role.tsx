/* AUTO-GENERATED from oxc docs — rule jsx_a11y/aria-role. Do not edit. */

<div role="datepicker"></div> <!-- Bad: "datepicker" is not an ARIA role -->
<div role="range"></div>      <!-- Bad: "range" is an _abstract_ ARIA role -->
<div role=""></div>           <!-- Bad: An empty ARIA role is not allowed -->
<Foo role={role}></Foo>       <!-- Bad: ignoreNonDOM is set to false or not set -->
