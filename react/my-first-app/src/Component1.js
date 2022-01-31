import React, { Component } from "react";

export class Component1 extends Component {
  constructor(props) {
    super(props);
    console.log("props", this.props);
  }
  render() {
    return <div> {this.props.text}</div>;
  }
}

export default Component1;
