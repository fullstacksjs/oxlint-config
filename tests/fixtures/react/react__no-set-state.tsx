/* AUTO-GENERATED from oxc docs — rule react/no-set-state. Do not edit. */

var Hello = createReactClass({
  getInitialState: function() {
    return {
      name: this.props.name
    };
  },
  handleClick: function() {
    this.setState({
      name: this.props.name.toUpperCase()
    });
  },
  render: function() {
    return <div onClick={this.handleClick.bind(this)}>Hello {this.state.name}</div>;
  }
});
