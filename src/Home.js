import React from "react";
// import Toggle from "./ToggleRenderProps";
// import { Button } from "react-bootstrap";

// import { setButtonText } from "react";

// var buttonText = ["test", "testing"];

export const Home = () => (
  <div>
    <h2>Apps til beregning</h2>
    <p>
      Du kan se de forskellige apps ved at klikke ovenfor, siden er under
      opbygning, derfor vil der løbende ske ændringer.
    </p>
    {/* <Toggle
      render={({ on, toggle }) => (
        <div>
          <Button onClick={toggle}>showtoggle 1</Button>
          {on && <p>Show me 1</p>}
        </div>
      )}
    />
    <Toggle
      render={({ on, toggle }) => (
        <div>
          <Button onClick={toggle}>showtoggle 2</Button>
          {on && <p>Show me 2</p>}
          {!on && <p>Show me 23</p>}
        </div>
      )}
    />
    <Toggle
      render={({ on, toggle }) => (
        <div>
          <Button onClick={toggle}>showtoggle 2</Button>
          {on && <p>Show me 2</p>}
        </div>
      )}
    /> */}
    {/* return (
    <Button onClick={() => setButtonText("newText")}>{buttonText}</Button>) */}
  </div>
);
