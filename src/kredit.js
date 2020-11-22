import React from "react";
import { useState } from "react";
// import Toggle from "./ToggleRenderProps";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import ReactHtmlParser from "react-html-parser";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "react-bootstrap";
import "./styles.css";
import {
  // numberFormat1,
  // numberFormat2,
  numberFormat3,
  // numberFormat4,
  numberFormat5,
  // numberFormat6,
} from "./lib"; //ændrer til komma og pct + DKK
import Container from "react-bootstrap/Container";
// import ReactHtmlParser from "react-html-parser";
import { Bar } from "react-chartjs-2";
// import { Doughnut } from "react-chartjs-2";
// import DropdownButton from "react-bootstrap/DropdownButton";

// import Dropdown from "react-bootstrap/Dropdown";

// import MathJax from "react-mathjax2";

import "handsontable/dist/handsontable.full.css";
// import { HotTable } from "@handsontable/react";
// import Handsontable from "handsontable";

// import "katex/dist/katex.min.css";
// import { BlockMath } from "react-katex";
// import { InlineMath } from "react-katex";

export function kredit() {


  // const numInputs = document.querySelectorAll("input[type=number]");

  // numInputs.forEach(function (input) {
  //   input.addEventListener("change", function (e) {
  //     if (e.target.value === "") {
  //       e.target.value = 1;
  //     }
  //   });
  // });








  var [rabat, setrabat] = useState(+(2.0).toFixed(2));
  var [dage, setdage] = useState(+(60).toFixed(2));

  var effektiv = rabat / (100 - rabat)
  var åop360 = (1 + effektiv) ** (360 / dage) - 1
  var åop365 = (1 + effektiv) ** (365 / dage) - 1


  const dg = [...Array(dage + 1).keys()];
  const dg2 = dg.map((n) => "Dag: " + n);
  let nu = new Array(dage).fill(null).map(() => 0);
  nu.splice(0, 0, 100 - rabat);
  let senere = new Array(dage).fill(null).map(() => 0);
  senere.splice(dage, 0, -100);

  const databar = {
    labels: dg2,
    datasets: [
      {
        label: "Besparelse nu ved 100 DKK kredit",
        backgroundColor: "green",
        stack: "Stack 0",
        hoverBackgroundColor: "darkgreen",
        data: nu,
      },
      {
        label: "Betalingen efter " + dage + " dage bliver",
        backgroundColor: "red",
        stack: "Stack 0",
        hoverBackgroundColor: "darkred",
        data: senere,
      },


    ],
  };

  return (
    <div>
      <Container>
        <div class="p-3 mb-2 bg-secondary text-white">
          <h4>Leverandørkredit.</h4>
        </div>
      </Container>
      <Container className="p-0">
        <div class="row p-3">
          <div class="col-md-12 p-3 ">
            <div class="card h-100">
              <div class="card-body">
                <Container className="p-3">
                  <div class="p-3 mb-2 bg-white">
                    <Form.Group>

                      <InputGroup>
                        <Form.Control
                          // size="sm"
                          type="number"
                          value={rabat}
                          onChange={(e) => setrabat(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Kontantrabat %
                      </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>



                      <InputGroup input-group-sm>
                        <Form.Control
                          type="number"
                          min="1"
                          value={dage}
                          onChange={(e) =>
                            setdage(+e.target.value)
                          }
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append >
                          <InputGroup.Text id="inputGroupAppend">
                            Dage                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>









                    </Form.Group>




                  </div>
                </Container>
              </div>
            </div>
          </div>

        </div>
      </Container >









      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <h3>Benyttes leverandørkreditten er ÅOP {numberFormat3(åop365 * 100)}%</h3>

              <div>
                <Bar
                  data={databar}
                  width={100}
                  height={70}
                  options={
                    ({ maintainAspectRatio: false },
                    {
                      scales: {
                        yAxes: [
                          {
                            scaleLabel: {
                              display: true,
                              labelString: "Betalingsstrømme",
                            },
                            ticks: {
                              callback: function (value, index, values) {
                                return value + " DKK";
                              },
                            },
                          },
                        ],
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <h3>Restgælden ultimo over de {provision} provision</h3>
              <div>
                <Bar
                  data={databar2}
                  width={100}
                  height={70}
                  options={
                    ({ maintainAspectRatio: false },
                    {
                      scales: {
                        yAxes: [
                          {
                            scaleLabel: {
                              display: true,
                              labelString: "Restgælden",
                            },
                            ticks: {
                              callback: function (value, index, values) {
                                return value + " DKK";
                              },
                            },
                          },
                        ],
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Container> */}

      <Container className="p-0">
        <div class="container">
          <table class="table table-bordered table-responsive table-white table-hover table-striped ">
            <small>
              <thead>
                <span class="align-middle">
                  <tr>
                    <br />

                    <h3>&nbsp;&nbsp;&nbsp;Forklaring på variable</h3>

                    <br />
                  </tr>
                </span>
              </thead>
              <tbody>
                <span class="align-top">



                  <tr>
                    <th>Variabel</th>
                    <th>Værdi</th>
                    <th>Forklaring</th>
                  </tr>

                  <tr>
                    <th scope="row">
                      Effektiv rente pr. termin
                    </th>
                    <td>{numberFormat3(effektiv * 100)}%</td>
                    <td>
                      Terminen er her {dage} dage, dette er forskellen mellem at betale leverandøren hurtigt eller først senere.
                      Har man nogle dage før man skal betale kontant, skal disse ikke medregnes i forskellen mellen at betale hurtigt eller senere.
                       Hvis man regner med et køb på 100 DKK for nemheds skyld, betyder det
                      man kan betale 100-{rabat} = {100 - rabat} DKK nu eller 100 DKK om {dage} dage. Man låner altså {100 - rabat} DKK nu
                      og skal betale {rabat} DKK for det. Vi kan så udregne effektiv rente pr. termin som:<br></br>
                      {rabat}/{100 - rabat} = {numberFormat5(rabat / (100 - rabat))} = {numberFormat3(100 * rabat / (100 - rabat))}%
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      ÅOP
                    </th>
                    <td>{numberFormat3(åop365 * 100)}%</td>
                    <td>
                      Vi kan nu omregne terminsrenten til ÅOP ved formlen:<br></br>
                      (1+rente)^terminer pr år -1 = (1+{numberFormat5(effektiv)})^(365/{dage})-1 = {numberFormat5(åop365)} = {numberFormat3(100 * åop365)}%<br></br>
                      Eller hvis vi foretrækker at regne med 360 dage:<br></br>
                      (1+rente)^terminer pr år -1 = (1+{numberFormat5(effektiv)})^(360/{dage})-1 = {numberFormat5(åop360)} = {numberFormat3(100 * åop360)}%<br></br>
                    </td>
                  </tr>


















                </span>
              </tbody>
            </small>
          </table>
        </div>
      </Container>


    </div >
  );
}
