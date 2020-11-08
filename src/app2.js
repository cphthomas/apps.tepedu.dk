import React from "react";
// import ReactDOM from "react-dom";
// import { HotTable, HotColumn } from "@handsontable/react";
// import Handsontable from "handsontable";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props); // props will get logged.
  }
  render() {
    return <div>Hello {this.props.message}</div>; // defined
  }
}

export default App;
