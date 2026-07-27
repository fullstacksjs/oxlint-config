/* AUTO-GENERATED from oxc docs — rule react/no-string-refs. Do not edit. */

var Hello = createReactClass({
  render: function() {
    return <div ref="hello">Hello, world.</div>;
  }
});

var Hello = createReactClass({
  componentDidMount: function() {
    var component = this.refs.hello;
    // ...do something with component
  },
  render: function() {
    return <div ref="hello">Hello, world.</div>;
  }
});
