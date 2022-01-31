import React, { Component } from "react";

export class States extends Component {
  constructor() {
    super();
    // this.count = 0;
    this.state = {
      count: 0,
    };
  }

  add = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  subtract = () => {
    if (this.state.count !== 0) {
      this.setState({
        count: this.state.count - 1,
      });
    }
  };
  render() {
    return (
      <div>
        <div style={{ fontSize: "150px" }}> {this.state.count}</div>

        <button
          style={{
            fontSize: "30px",
            width: "50px",
            marginRight: "20px",
            color: "red",
          }}
          onClick={() => this.add()}
        >
          +
        </button>
        <button
          style={{ fontSize: "30px", width: "50px", color: "green" }}
          onClick={() => this.subtract()}
        >
          -
        </button>
      </div>
    );
  }
}
