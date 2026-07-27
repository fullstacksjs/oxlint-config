/* AUTO-GENERATED from oxc docs — rule react/no-will-update-set-state. Do not edit. */

var Hello = createReactClass({
  componentWillUpdate: function() {
    this.setState({
      name: this.props.name.toUpperCase()
    });
  },
  render: function() {
    return <div>Hello {this.state.name}</div>;
  }
});
