/* AUTO-GENERATED from oxc docs — rule react/no-direct-mutation-state. Do not edit. */

var Hello = createReactClass({
  componentDidMount: function() {
    this.state.name = this.props.name.toUpperCase();
  },
  render: function() {
    return <div>Hello {this.state.name}</div>;
  }
});

class Hello extends React.Component {
  constructor(props) {
    super(props)

    doSomethingAsync(() => {
      this.state = 'bad';
    });
  }
}
