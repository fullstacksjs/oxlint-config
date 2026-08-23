/* AUTO-GENERATED from oxc docs — rule react/no-this-in-sfc. Do not edit. */

function Foo(props) {
  return <div>{this.props.bar}</div>;
}

function Foo(props) {
  const { bar } = this.props;
  return <div>{bar}</div>;
}

const Foo = (props) => this.props.foo ? <span>{props.bar}</span> : null;
