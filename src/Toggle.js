import React, { Component } from "react";
// import { Button } from "react-bootstrap";

export default class Toggle extends Component {
  state = {
    on: false,
  };
  toogle = () => {
    this.setState({
      on: !this.state.on,
    });
  };
  render() {
    return (
      <div>
        {this.state.on && this.props.children}
        <button onClick={this.toggle}>toggleknap</button>
      </div>
    );
  }
}
