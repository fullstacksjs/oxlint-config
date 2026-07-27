/* AUTO-GENERATED from oxc docs — rule react/no-did-mount-set-state. Do not edit. */

var Hello = createReactClass({
  componentDidMount: function() {
    this.setState({
      name: this.props.name.toUpperCase()
    });
  },
  render: function() {
    return <div>Hello {this.state.name}</div>;
  }
});
