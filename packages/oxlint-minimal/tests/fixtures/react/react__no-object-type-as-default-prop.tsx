/* AUTO-GENERATED from oxc docs — rule react/no-object-type-as-default-prop. Do not edit. */

function Foo({ items = [] }) {
  return <List items={items} />;
}

const Bar = ({ config = {} }) => <div data-config={config} />;

function Baz({ onClick = () => {} }) {
  return <button onClick={onClick} />;
}
