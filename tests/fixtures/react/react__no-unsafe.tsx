/* AUTO-GENERATED from oxc docs — rule react/no-unsafe. Do not edit. */

// By default, UNSAFE_ prefixed methods are flagged
class Foo extends React.Component {
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillReceiveProps() {}
  UNSAFE_componentWillUpdate() {}
}

// With checkAliases: true, non-prefixed versions are also flagged
class Bar extends React.Component {
  componentWillMount() {}
  componentWillReceiveProps() {}
  componentWillUpdate() {}
}
