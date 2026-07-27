/* AUTO-GENERATED from oxc docs — rule react/no-is-mounted. Do not edit. */

class Hello extends React.Component {
  someMethod() {
    if (!this.isMounted()) {
      return;
    }
  }
  render() {
    return <div onClick={this.someMethod.bind(this)}>Hello</div>;
  }
};
