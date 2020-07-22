import React from "react";
import { useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import ReactHtmlParser from "react-html-parser";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";

export function Users() {
  const [rente, setrente] = useState(+(1.25).toFixed(2));
  return (
    <div>
      <h2>Home23Yes {rente}</h2>
      <InputGroup>
        <Form.Control
          type="number"
          value={rente}
          onChange={(e) => setrente(+e.target.value)}
          aria-describedby="inputGroupAppend"
          placeholder="0"
        />
        <InputGroup.Append>
          <InputGroup.Text id="inputGroupAppend">%</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
