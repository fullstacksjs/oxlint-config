/* AUTO-GENERATED from oxc docs — rule react/no-find-dom-node. Do not edit. */

class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView();
  }
  render() {
    return <div />;
  }
}
