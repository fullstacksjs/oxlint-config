/* AUTO-GENERATED from oxc docs — rule react/state-in-constructor. Do not edit. */

class Foo extends React.Component {
  state = { bar: 0 }
  render() {
    return <div>Foo</div>
  }
}

class Foo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { bar: 0 }
  }
  render() {
    return <div>Foo</div>
  }
}
