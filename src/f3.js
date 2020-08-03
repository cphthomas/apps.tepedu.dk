import React, { useState } from "react";
import Toggle from "./ToggleRenderProps";

// import { FormCheckbox } from "shards-react";

import { Row, Col, FormControl, Button } from "react-bootstrap";

// import { MDBInput, MDBFormInline, MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./styles.css";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

import {
  // numberFormat1,
  // numberFormat2,
  // numberFormat3,
  numberFormat4,
  //numberFormat5,
  //numberFormat6,
} from "./lib"; //ændrer til komma og pct + DKK
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import "bootstrap/dist/css/bootstrap.min.css";

import "katex/dist/katex.min.css";
// import { BlockMath } from "react-katex";
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/annotations")(Highcharts);

require("highcharts/highcharts-more")(Highcharts);

export function f3() {
  const [a, seta] = useState(+(-1.25).toFixed(2));
  const [b, setb] = useState(+(100).toFixed(2));
  const [p, setp] = useState(+(60).toFixed(2));

  // var x;
  // var dataoms = [];
  // for (var i = 0; i < 10; i += 0.1) {
  //   dataoms.push([x, fun(x)]);
  // }

  // function fun(x) {
  //   return a * x * x + b * x; // or other function
  // }
  var xomsmax = (-0.5 * b) / a;
  var omsmax = a * xomsmax ** 2 + b * xomsmax;
  var afsmax = b / -a;
  return (
    <div>
      <Container>
        <div class="p-3 mb-2 bg-secondary text-white">
          {/* <div class="card">
            <div class="p-4"> */}
          <h3>Pris- afsætningsfunktionen</h3>
          <h5>Hvilke afsætninger og priser passer sammen</h5>

          {/* {(() => {
            if (p > 70) {
              return <Button size="sm">Logout</Button>;
            }
          })()} */}
          {/* <Toggle
            render={({ on, toggle }) => (
              <div>
                <Button color="red" size="sm" onClick={toggle}>
                  {on && "Tændt"}
                  {!on && "Slukket"}
                </Button>
                {on && <h6>Tændt</h6>}
                {!on && <h6>Slukket</h6>}
              </div>
            )}
          />
          <Toggle
            render={({ on, toggle }) => (
              <div>
                <Button size="sm" onClick={toggle}>
                  t2
                </Button>
                {on && <p>Show me 3</p>}
              </div>
            )}
          /> */}
        </div>
      </Container>

      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body"></div>

            <Container>
              <div class="p-3 mb-2 mt-0 bg-white">
                <h5>
                  Prisafsætningsfunktionen P = aX+b = {numberFormat4(a)}X + {b}
                </h5>

                <Form>
                  <Row>
                    <Col>
                      <InputGroup size="sm">
                        {/* <InputGroup.Prepend>
                          <InputGroup.Text size="sm">i boks før input</InputGroup.Text>
                        </InputGroup.Prepend> */}
                        <FormControl
                          type="number"
                          max="-0.000000001"
                          step={0.01}
                          precision={0}
                          //mobile={true}
                          value={+a}
                          onChange={(e) => seta(-Math.abs(e.target.value))}
                          placeholder="0"
                        />

                        <InputGroup.Append>
                          <InputGroup.Text
                            inputGroup-sizing-sm
                            id="basic-addon2"
                          >
                            a
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                      <Form.Text className="text-muted">
                        Hældningskoefficienten: a
                      </Form.Text>
                    </Col>
                    <Col>
                      <InputGroup size="sm">
                        {/* <InputGroup.Prepend>
                          <InputGroup.Text size="sm">i boks før input</InputGroup.Text>
                        </InputGroup.Prepend> */}
                        <Form.Control
                          type="number"
                          min="0"
                          step={1}
                          precision={0}
                          mobile={true}
                          value={+b}
                          onChange={(e) => setb(Math.abs(e.target.value))}
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">b</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                      <Form.Text className="text-muted">
                        Skæringen med y-aksen: b
                      </Form.Text>
                    </Col>
                  </Row>
                  <h5>Pris</h5>
                  <Row>
                    <Col xs={6}>
                      <InputGroup size="sm">
                        {/* <InputGroup.Prepend>
                          <InputGroup.Text size="sm">i boks før input</InputGroup.Text>
                        </InputGroup.Prepend> */}
                        <FormControl
                          type="number"
                          min="0"
                          step={1}
                          precision={0}
                          //mobile={true}
                          value={+p}
                          onChange={(e) => setp(Math.abs(e.target.value))}
                          placeholder="0"
                        />

                        <InputGroup.Append>
                          <InputGroup.Text
                            inputGroup-sizing-sm
                            id="basic-addon2"
                          >
                            P
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                      <Form.Text className="text-muted">
                        Fastsat pris for varen: P
                      </Form.Text>
                    </Col>
                    <col></col>
                  </Row>
                </Form>
              </div>
            </Container>
          </div>
        </div>
      </Container>

      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <Toggle
                render={({ on, toggle }) => (
                  <div>
                    <Button size="sm" onClick={toggle}>
                      {on && "Skjul priselasticitet"}
                      {!on && "Vis priselasticitet"}
                    </Button>
                    {on && (
                      <HighchartsReact
                        // containerProps={{ style: { height: "200%" } }}
                        highcharts={Highcharts}
                        options={{
                          title: {
                            text: "Pris- afsætningsfunktionen",
                          },
                          tooltip: {
                            enabled: true,
                          },
                          exporting: {
                            buttons: {
                              contextButton: {
                                menuItems: [
                                  "viewFullscreen",
                                  "separator",
                                  "downloadPNG",
                                  "downloadPDF",
                                  "downloadSVG",
                                ],
                              },
                            },
                          },
                          credits: {
                            enabled: false,
                          },
                          annotations: [
                            {
                              labelOptions: {
                                // backgroundColor: "rgba(252, 255, 197, 1)",
                                // verticalAlign: "top",
                                padding: 2,

                                style: {
                                  fontSize: "0.6em",
                                },
                              },
                              labels: [
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: (p - b) / a,
                                    y: p,
                                  },
                                  distance: 7,
                                  text:
                                    "Elasticiteten ved pris " +
                                    numberFormat4(p) +
                                    " DKK. bliver " +
                                    numberFormat4(-p / (b - p)),
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: (-0.5 * b) / a,
                                    y: b / 2,
                                  },
                                  distance: 7,
                                  text: "Enhedselasticitet = -1",
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: (-0.25 * b) / a,
                                    y: a * ((-0.25 * b) / a) + b,
                                  },
                                  distance: 7,
                                  text: "Elastisk efterspørgsel < -1",
                                  borderWidth: 0,
                                  backgroundColor: "green",
                                  style: { color: "white" },
                                },
                                {
                                  // align: "right",
                                  // distance: 2,
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: 0,
                                    y: p + (b - p) * 0.5,
                                  },
                                  // x: 10,

                                  align: "right",
                                  text: "Øvre=" + numberFormat4(b - p),
                                  borderWidth: 0,
                                  backgroundColor: "orange",
                                  style: { color: "white" },
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: 0,
                                    y: p * 0.5,
                                  },
                                  // x: 3,

                                  text: "Nedre=" + numberFormat4(p),
                                  borderWidth: 0,
                                  backgroundColor: "yellow",
                                  style: { color: "black" },
                                  // format: {
                                  //   overflow: "justify",
                                  // },
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x:
                                      (-b / a - (p - b) / a) * 0.5 +
                                      (p - b) / a,
                                    y: 0,
                                  },
                                  distance: 10,

                                  text:
                                    "Højre=" +
                                    numberFormat4(-b / a - (p - b) / a),
                                  borderWidth: 0,
                                  backgroundColor: "purple",
                                  style: { color: "white" },
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: ((p - b) / a) * 0.5,
                                    y: 0,
                                  },
                                  distance: 10,
                                  borderWidth: 0,
                                  backgroundColor: "blue",
                                  style: { color: "white" },
                                  text: "Venstre=" + numberFormat4((p - b) / a),
                                },

                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: (-0.75 * b) / a,
                                    y: a * ((-0.75 * b) / a) + b,
                                  },
                                  distance: 7,
                                  text:
                                    "Uelastisk efterspørgsel mellem -1 og 0",
                                  borderWidth: 0,
                                  backgroundColor: "red",
                                  style: { color: "white" },
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: -b / a,
                                    y: 0,
                                  },
                                  distance: 7,
                                  text:
                                    "P=" +
                                    numberFormat4(a) +
                                    "X+" +
                                    numberFormat4(b),
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: (-0.5 * b) / a,
                                    y: 0,
                                  },
                                  distance: 10,
                                  text:
                                    "GROMS=" +
                                    numberFormat4(2 * a) +
                                    "X+" +
                                    numberFormat4(b),
                                },
                              ],
                            },
                            {
                              labelOptions: {
                                shape: "connector",
                                align: "right",
                                justify: false,
                                crop: true,
                                style: {
                                  fontSize: "0.8em",
                                  textOutline: "0px white",
                                },
                              },
                            },
                          ],
                          xAxis: {
                            title: {
                              text: "Afsætning",
                            },
                            gridLineWidth: 1,
                            min: 0,
                            max: 1.1 * (-b / a),
                            labels: {
                              format: "{value} stk.",
                            },
                          },
                          yAxis: {
                            title: {
                              text: null,
                            },
                            min: 0,
                            max: b,
                            labels: {
                              format: "{value} DKK.",
                            },
                          },
                          series: [
                            // {
                            //   name: "TVO",
                            //   type: "polygon",
                            //   data: [
                            //     [0, 0],
                            //     [(p - b) / a, 0],
                            //     [(p - b) / a, p],
                            //     [0, p],
                            //   ],
                            //   color: "rgb(0,255,0,.5)",
                            // },
                            {
                              type: "line",
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 2,
                              },
                              dashStyle: "ShortDot",
                              name: "Pris P",
                              data: [
                                [0, p],
                                [(p - b) / a, p],
                              ],
                            },
                            {
                              type: "line",
                              color: "red",
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 2,
                              },
                              dashStyle: "ShortDot",
                              name: "Mængde X",
                              data: [
                                [(p - b) / a, p],
                                [(p - b) / a, 0],
                              ],
                            },
                            {
                              type: "line",
                              color: "black",
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 2,
                              },
                              dashStyle: "Dot",
                              name: "Max omsætning",
                              data: [
                                [0, b / 2],
                                [(-0.5 * b) / a, b / 2],
                                [(-0.5 * b) / a, 0],
                              ],
                            },
                            {
                              type: "line",
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 2,
                              },
                              name: "GROMS",
                              data: [
                                [0, b],
                                [(-0.5 * b) / a, 0],
                              ],
                            },

                            {
                              type: "line",
                              color: "red",
                              lineWidth: 4,
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 0,
                              },
                              name: "Uelastisk efterspørgsel",
                              data: [
                                [(-0.5 * b) / a, a * ((-0.5 * b) / a) + b],
                                [-b / a, 0],
                              ],
                            },
                            {
                              type: "line",
                              color: "green",
                              lineWidth: 4,
                              marker: {
                                // color: "blue",
                                enabled: false,
                                symbol: "circle",
                                radius: 2,
                              },
                              name: "Elastisk efterspørgsel",
                              data: [
                                [0, b],
                                [(-0.5 * b) / a, a * ((-0.5 * b) / a) + b],
                              ],
                            },
                            // {
                            //   type: "line",
                            //   lineWidth: 0,
                            //   marker: {
                            //     enabled: false,
                            //     symbol: "circle",
                            //     radius: 2,
                            //   },
                            //   name: "P",
                            //   data: [
                            //     [0, b],
                            //     [(-0.5 * b) / a, a * ((-0.5 * b) / a) + b],
                            //     [-b / a, 0],
                            //   ],
                            // },
                            {
                              type: "line",
                              color: "yellow",
                              lineWidth: 8,
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 0,
                              },
                              name: "Nedre",
                              data: [
                                [0, p],
                                [0, 0],
                              ],
                            },
                            {
                              type: "line",
                              color: "orange",
                              lineWidth: 8,
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 0,
                              },
                              name: "Øvre",
                              data: [
                                [0, p],
                                [0, b],
                              ],
                            },
                            {
                              type: "line",
                              color: "blue",
                              lineWidth: 8,
                              marker: {
                                enabled: false,
                                // symbol: "circle",
                                radius: 0,
                              },
                              name: "Venstre",
                              data: [
                                [0, 0],
                                [(p - b) / a, 0],
                              ],
                            },
                            {
                              type: "line",
                              color: "purple",
                              lineWidth: 8,
                              marker: {
                                enabled: false,
                                // symbol: "circle",
                                radius: 0,
                              },
                              name: "Højre",
                              data: [
                                [-b / a, 0],
                                [(p - b) / a, 0],
                              ],
                            },
                          ],
                        }}
                      />
                    )}

                    {!on && (
                      <HighchartsReact
                        // containerProps={{ style: { height: "200%" } }}
                        highcharts={Highcharts}
                        options={{
                          title: {
                            text: "Pris- afsætningsfunktionen",
                          },
                          exporting: {
                            buttons: {
                              contextButton: {
                                menuItems: [
                                  "viewFullscreen",
                                  "separator",
                                  "downloadPNG",
                                  "downloadPDF",
                                  "downloadSVG",
                                ],
                              },
                            },
                          },
                          credits: {
                            enabled: false,
                          },
                          annotations: [
                            {
                              labelOptions: {
                                // backgroundColor: "rgba(252, 255, 197, 1)",
                                verticalAlign: "top",
                                padding: 2,

                                style: {
                                  fontSize: "0.6em",
                                },
                              },
                              labels: [
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: (-0.48 * b) / a,
                                    y: 2 * a * ((-0.48 * b) / a) + b,
                                  },
                                  distance: 7,
                                  text:
                                    "GROMS=" +
                                    numberFormat4(2 * a) +
                                    "X+" +
                                    numberFormat4(b),
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: (-0.85 * b) / a,
                                    y: a * ((-0.85 * b) / a) + b,
                                  },
                                  distance: 7,
                                  text:
                                    "P=" +
                                    numberFormat4(a) +
                                    "X+" +
                                    numberFormat4(b),
                                  borderWidth: 0,
                                  // backgroundColor: "orange",
                                  // style: { color: "blue" },
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: (p - b) / a,
                                    y: p,
                                  },
                                  distance: 7,
                                  text:
                                    "Pris P = " +
                                    +numberFormat4(p) +
                                    " DKK.<br />Afsætning X = " +
                                    numberFormat4((p - b) / a) +
                                    " stk.",
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: 0,
                                    y: b,
                                  },
                                  x: -4,
                                  // distance: -10,
                                  // align: "left",
                                  text:
                                    "Skæring med <br />y-aksen b = " +
                                    +numberFormat4(b) +
                                    "<br />Max pris/betalingsvillighed",
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: -b / a,
                                    y: 0,
                                  },
                                  // x: -4,
                                  distance: 7,
                                  // align: "left",
                                  text:
                                    "Skæring med <br />x-aksen -b/a = " +
                                    numberFormat4(afsmax) +
                                    "<br />Max afsætning<br />markedsmætning",
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: 0,
                                    y: b,
                                  },
                                  x: -4,
                                  // distance: -10,
                                  // align: "left",
                                  text:
                                    "Skæring med <br />y-aksen b = " +
                                    +numberFormat4(b) +
                                    "<br />Max pris/betalingsvillighed",
                                },
                                {
                                  point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: (b / 2 - b) / a,
                                    y: b / 2,
                                  },
                                  distance: -40,
                                  text:
                                    "Max omsætning ved<br />Pris P = " +
                                    +numberFormat4(b / 2) +
                                    " DKK.<br />Afsætning X = " +
                                    numberFormat4((b / 2 - b) / a) +
                                    " stk.",
                                },
                              ],
                            },
                            {
                              labelOptions: {
                                shape: "connector",
                                align: "right",
                                justify: false,
                                crop: true,
                                style: {
                                  fontSize: "0.8em",
                                  textOutline: "0px white",
                                },
                              },
                            },
                          ],
                          xAxis: {
                            title: {
                              text: "Afsætning",
                            },
                            gridLineWidth: 1,
                            min: 0,
                            max: 1.1 * (-b / a),
                            labels: {
                              format: "{value} stk.",
                            },
                          },
                          yAxis: {
                            title: {
                              text: null,
                            },
                            min: 0,
                            max: b,
                            labels: {
                              format: "{value} DKK.",
                            },
                          },
                          series: [
                            {
                              name: "Omsætning",
                              type: "polygon",
                              data: [
                                [0, 0],
                                [(p - b) / a, 0],
                                [(p - b) / a, p],
                                [0, p],
                              ],
                              color: "rgb(0,255,0,.5)",
                            },
                            {
                              type: "line",
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 2,
                              },
                              dashStyle: "ShortDot",
                              name: "Pris P",
                              data: [
                                [0, p],
                                [(p - b) / a, p],
                              ],
                            },
                            {
                              type: "line",
                              color: "red",
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 2,
                              },
                              dashStyle: "ShortDot",
                              name: "Mængde X",
                              data: [
                                [(p - b) / a, p],
                                [(p - b) / a, 0],
                              ],
                            },
                            {
                              type: "line",
                              color: "black",
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 2,
                              },
                              dashStyle: "Dot",
                              name: "Max omsætning",
                              data: [
                                [0, b / 2],
                                [(-0.5 * b) / a, b / 2],
                                [(-0.5 * b) / a, 0],
                              ],
                            },
                            {
                              type: "line",
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 2,
                              },
                              name: "GROMS",
                              data: [
                                [0, b],
                                [(-0.5 * b) / a, 0],
                              ],
                            },

                            // {
                            //   type: "line",
                            //   color: "red",
                            //   lineWidth: 4,
                            //   marker: {
                            //     enabled: false,
                            //     symbol: "circle",
                            //     radius: 2,
                            //   },
                            //   name: "Uelastisk efterspørgsel",
                            //   data: [
                            //     [(-0.5 * b) / a, a * ((-0.5 * b) / a) + b],
                            //     [-b / a, 0],
                            //   ],
                            // },
                            // {
                            //   type: "line",
                            //   color: "green",
                            //   lineWidth: 4,
                            //   marker: {
                            //     // color: "blue",
                            //     enabled: false,
                            //     symbol: "circle",
                            //     radius: 2,
                            //   },
                            //   name: "Elastisk efterspørgsel",
                            //   data: [
                            //     [0, b],
                            //     [(-0.5 * b) / a, a * ((-0.5 * b) / a) + b],
                            //   ],
                            // },
                            {
                              type: "line",
                              lineWidth: 2,
                              marker: {
                                enabled: false,
                                symbol: "circle",
                                radius: 2,
                              },
                              name: "P",
                              data: [
                                [0, b],
                                [(-0.5 * b) / a, a * ((-0.5 * b) / a) + b],
                                [-b / a, 0],
                              ],
                            },
                          ],
                        }}
                      />
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </Container>

      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <HighchartsReact
                //containerProps={{ style: { height: "200%" } }}
                highcharts={Highcharts}
                options={{
                  title: {
                    text: "Omsætning og Pris- afsætningsfunktionen",
                  },
                  exporting: {
                    buttons: {
                      contextButton: {
                        menuItems: [
                          "viewFullscreen",
                          "separator",
                          "downloadPNG",
                          "downloadPDF",
                          "downloadSVG",
                        ],
                      },
                    },
                  },
                  credits: {
                    enabled: false,
                  },
                  annotations: [
                    {
                      labelOptions: {
                        // backgroundColor: "rgba(252, 255, 197, 1)",
                        verticalAlign: "top",
                        padding: 2,

                        style: {
                          fontSize: "0.6em",
                        },
                      },
                      labels: [
                        {
                          point: {
                            xAxis: 0,
                            yAxis: 0,
                            x: (p - b) / a,
                            y: p * ((p - b) / a),
                          },
                          y: -1,
                          align: "right",
                          // distance: -28,
                          text:
                            "Omsætning<br />P · X =<br />" +
                            +numberFormat4(p) +
                            " · " +
                            numberFormat4((p - b) / a) +
                            " = <br />" +
                            numberFormat4((p * (p - b)) / a) +
                            " DKK.",
                        },
                        {
                          point: {
                            xAxis: 0,
                            yAxis: 0,
                            x: (b / 2 - b) / a,
                            y: (((b / 2 - b) / a) * b) / 2,
                          },
                          y: -1,
                          align: "left",
                          // distance: -28,
                          text:
                            "Max omsætning<br /> " +
                            +numberFormat4(b / 2) +
                            " · " +
                            numberFormat4((b / 2 - b) / a) +
                            " =<br />" +
                            numberFormat4(omsmax) +
                            " DKK.",
                        },

                        {
                          point: {
                            xAxis: 0,
                            yAxis: 0,
                            x: (-0.5 * b) / a,
                            y: 0,
                          },
                          distance: 10,
                          text:
                            "GROMS=" +
                            numberFormat4(2 * a) +
                            "X+" +
                            numberFormat4(b),
                        },
                        {
                          point: {
                            xAxis: 0,
                            yAxis: 0,
                            x: -b / a,
                            y: 0,
                          },
                          distance: 10,
                          text:
                            "P=" + numberFormat4(a) + "X+" + numberFormat4(b),
                        },
                      ],
                    },
                    {
                      labelOptions: {
                        shape: "connector",
                        align: "right",
                        justify: false,
                        crop: true,
                        style: {
                          fontSize: "0.8em",
                          textOutline: "0px white",
                        },
                      },
                      // labels: [
                      //   {
                      //     point: {
                      //       xAxis: 0,
                      //       yAxis: 0,
                      //       x: 100,
                      //       y: 0,
                      //     },
                      //     text: "Optimal X<br>" + numberFormat3(100) + "stk.",
                      //   },
                      //   {
                      //     point: {
                      //       xAxis: 0,
                      //       yAxis: 0,
                      //       x: 0,
                      //       y: 100,
                      //     },
                      //     text: "Optimal P<br>" + numberFormat3(100) + "kr.",
                      //   },
                      // ],
                    },
                  ],
                  xAxis: {
                    title: {
                      text: "Afsætning",
                    },
                    gridLineWidth: 1,
                    min: 0,
                    max: 1.1 * (-b / a),
                    labels: {
                      format: "{value} stk.",
                    },
                  },
                  yAxis: {
                    title: {
                      text: null,
                    },
                    min: 0,
                    max: omsmax,
                    labels: {
                      format: "{value} DKK.",
                    },
                  },
                  series: [
                    {
                      showInLegend: false,
                      type: "line",
                      color: "black",
                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 2,
                      },
                      dashStyle: "Dot",
                      name: "Max omsætning",
                      data: [
                        [
                          (-0.5 * b) / a,
                          a * Math.pow((-0.5 * b) / a, 2) +
                            b * ((-0.5 * b) / a),
                        ],
                        [(-0.5 * b) / a, 0],
                      ],
                    },
                    {
                      showInLegend: false,
                      type: "line",
                      color: "black",
                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 2,
                      },
                      dashStyle: "Dot",
                      // name: "Omsætning ved pris ".concat(
                      //   p,
                      //   " DKK. og afsætning ",
                      //   numberFormat4((p - b) / a)
                      // ),
                      data: [
                        [(p - b) / a, (p * (p - b)) / a],
                        [(p - b) / a, 0],
                      ],
                    },
                    {
                      showInLegend: false,
                      type: "line",
                      color: "black",
                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 2,
                      },
                      dashStyle: "Dot",
                      name: "Omsætning ved pris ".concat(
                        p,
                        " DKK. og afsætning ",
                        numberFormat4((p - b) / a)
                      ),

                      data: [
                        [0, (p * (p - b)) / a],
                        [(p - b) / a, (p * (p - b)) / a],
                      ],
                    },
                    {
                      showInLegend: true,
                      type: "line",
                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 2,
                      },
                      name: "GROMS",
                      data: [
                        [0, b],

                        [(-0.5 * b) / a, 0],
                      ],
                    },

                    {
                      showInLegend: true,
                      type: "line",
                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 2,
                      },
                      name: "P",
                      data: [
                        [0, b],
                        [(-0.5 * b) / a, a * ((-0.5 * b) / a) + b],
                        [-b / a, 0],
                      ],
                    },

                    {
                      showInLegend: true,
                      type: "spline",
                      marker: {
                        enabled: true,
                        symbol: "circle",
                        radius: 1,
                      },
                      name: "Omsætning",
                      data: [
                        [0, 0],

                        [
                          (-0.25 * b) / a,
                          a * Math.pow((-0.25 * b) / a, 2) +
                            b * ((-0.25 * b) / a),
                        ],

                        [xomsmax, omsmax],
                        [
                          (-0.75 * b) / a,
                          a * Math.pow((-0.75 * b) / a, 2) +
                            b * ((-0.75 * b) / a),
                        ],
                        [-b / a, 0],
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </Container>

      <Container>
        {/* <div class="container"> */}
        <div>
          {/* <div class="card"> */}

          <table class="table table-bordered table-responsive table-white table-hover table-striped ">
            <thead>
              <span class="align-middle">
                <tr>
                  <br />

                  <h3>&nbsp;&nbsp;&nbsp;Forklaring på variable </h3>
                  <Toggle
                    render={({ on, toggle }) => (
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button color="red" size="sm" onClick={toggle}>
                          {on && "Skjul priselasticitet"}
                          {!on && "Vis priselasticitet"}
                        </Button>
                        <br />
                        <br />
                        {on && (
                          <small>
                            <tbody>
                              <span class="align-top">
                                <tr>
                                  <th>DK navn</th>
                                  <th>US navn</th>
                                  <th>Værdi</th>
                                  <th>Forklaring</th>
                                </tr>

                                <tr>
                                  <td>P</td>
                                  <td>P</td>
                                  <td>{numberFormat4(a).concat("X+", b)}</td>

                                  <td>
                                    P er Pris- afsætningsfunktionen. P angiver
                                    hvilken pris P, man skal sætte for at
                                    afsætte mængden X stk.
                                  </td>
                                </tr>

                                <tr>
                                  <td>Pris</td>
                                  <td>Price</td>
                                  <td>{numberFormat4(p).concat(" DKK.")}</td>

                                  <td>
                                    Prisen p er her fastsat eksternt, dette vil
                                    ofte være ud fra en bidragskalkulation, hvor
                                    man kalkulerer salgsprisen ud fra et ønsket
                                    dækningsbidrag.
                                  </td>
                                </tr>

                                <tr>
                                  <td>X eller M</td>
                                  <td>X eller Q</td>
                                  <td>
                                    {numberFormat4((p - b) / a).concat(" stk.")}
                                  </td>

                                  <td>
                                    Afsætningen bestemmes ud fra pris-
                                    afsætningsfunktionen, når vi kender prisen,
                                    hældningskoefficienten a og skæringen med
                                    y-aksen b, kan vi løse følgende ligning:
                                    <BlockMath>
                                      P=aX+b \Leftrightarrow
                                    </BlockMath>
                                    <BlockMath>
                                      {String.raw`\textstyle ${numberFormat4(
                                        p
                                      )}=${numberFormat4(a)}X+${numberFormat4(
                                        b
                                      )}\Leftrightarrow`}
                                    </BlockMath>
                                    <BlockMath>
                                      {String.raw`\textstyle ${numberFormat4(
                                        p
                                      )}-${numberFormat4(b)}=${numberFormat4(
                                        a
                                      )}X\Leftrightarrow`}
                                    </BlockMath>
                                    <BlockMath>
                                      {String.raw`\textstyle ${numberFormat4(
                                        p - b
                                      )}=${numberFormat4(a)}X\Leftrightarrow`}
                                    </BlockMath>
                                    <BlockMath>
                                      {String.raw`\textstyle \frac{${numberFormat4(
                                        p - b
                                      )}}{${numberFormat4(
                                        a
                                      )}}=X \Leftrightarrow`}
                                    </BlockMath>
                                    <BlockMath>
                                      {String.raw`\textstyle ${numberFormat4(
                                        (p - b) / a
                                      )}=X`}
                                    </BlockMath>
                                  </td>
                                </tr>

                                <tr>
                                  <td>GROMS</td>
                                  <td>MR</td>
                                  <td>
                                    {numberFormat4(2 * a).concat("X+", b)}
                                  </td>

                                  <td>
                                    GROMS er grænseomsætningen. GROMS angiver
                                    hvor meget omsætningen vokser ved en given
                                    afsætning X, når der afsættes et stk. mere.
                                    GROMS der omsætningen differentieret.
                                    <br />
                                    Når P er lineær, kan vi hurtigt finde GROMS
                                    som P med den dobbelte hældning:
                                    <br />
                                    GROMS = 2 &middot;{" "}
                                    {numberFormat4(a).concat("X+", b)} ={" "}
                                    {numberFormat4(2 * a).concat("X+", b)}
                                  </td>
                                </tr>

                                <tr>
                                  <td>Omsætning</td>
                                  <td>TR</td>
                                  <td>
                                    {numberFormat4(a)}X<sup>2</sup>+
                                    {numberFormat4(b)}X
                                  </td>

                                  <td>
                                    Omsætning bestemmes som pris gange
                                    afsætning, når prisafsætningsfunktionen er
                                    lineær bliver omsætningsfunktionen et
                                    andetgradspolynomium. Funktionen for
                                    omsætningen bliver:
                                    <br />
                                    Omsætning = P · X = (aX + b) · X = (
                                    {numberFormat4(a).concat(
                                      "X + ",
                                      numberFormat4(b)
                                    )}
                                    )·X ={" "}
                                    {numberFormat4(a).concat(
                                      "X·X + ",
                                      numberFormat4(b),
                                      "X"
                                    )}{" "}
                                    = {numberFormat4(a)}X<sup>2</sup> +{" "}
                                    {numberFormat4(b)}X
                                    <br />
                                    Når vi kender afsætningen X ={" "}
                                    {numberFormat4((p - b) / a)} stk. kan vi
                                    indsætte afsætningen i omsætningsfunktionen.
                                    Men her er det nemmere at gange pris P og
                                    afsætning X <br />
                                    Omsætning = {numberFormat4(p)} ·{" "}
                                    {numberFormat4((p - b) / a)} ={" "}
                                    {numberFormat4(((p - b) / a) * p)} DKK.
                                    Omsætningen svarer til det grønne areal i
                                    figuren ovenfor.
                                    <br />
                                    <br />
                                    Når P er lineær en lineær, kan man altid
                                    finde prisen der giver den maksimale
                                    omsætning som b/2 = {numberFormat4(b)}/2 =
                                    {numberFormat4(b / 2)}.<br />
                                    Afsætningen der maksimerer omsætningen, kan
                                    så findes ved at indsætte P ={" "}
                                    {numberFormat4(b / 2)} i pris-
                                    afsætningsfunktionen og løse ligningen på
                                    samme måde, som vi fandt afsætningen
                                    ovenfor.
                                    <br />X = ({numberFormat4(b / 2)} -{" "}
                                    {numberFormat4(b)})/{numberFormat4(a)} ={" "}
                                    {numberFormat4((b / 2 - b) / a)}
                                    <br />
                                    Den maksimale omsætning bliver så:
                                    <br />P · X = {numberFormat4(b / 2)} ·{" "}
                                    {numberFormat4((b / 2 - b) / a)} ={" "}
                                    {numberFormat4((b / 2) * ((b / 2 - b) / a))}
                                    <br />
                                    Hvilket svarer til toppunktet i den grønne
                                    parabel for omsætningen ovenfor. Afsætningen
                                    og prisen der maksimerer omsætningen fremgår
                                    af de stiplede sorte linjer ovenfor.
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    e<sub>p</sub>
                                  </td>
                                  <td>
                                    e<sub>p</sub>
                                  </td>
                                  <td>{numberFormat4(-p / (b - p))} </td>
                                  <td>
                                    Priselasticiteten angiver hvor meget
                                    afsætningen falder/stiger i procent, når
                                    prisen øges/sænkes med 1 procent. En
                                    priselasticitet på{" "}
                                    {numberFormat4(-p / (b - p))}, betyder altså
                                    at hvis man sænker prisen med 1% øges
                                    afsætningen med {numberFormat4(p / (b - p))}
                                    %.
                                    <br />
                                    Man kan beregne priselasticiteten på flere
                                    måder, de gule og orange længder på figuren
                                    for priselasticitet er en hurtig måde at
                                    beregne e<sub>p</sub>:
                                    <br />e<sub>p</sub> = -nedre/øvre = -p/(b-p)
                                    = -gul/orange = {numberFormat4(-p)}/
                                    {numberFormat4(b - p)} =
                                    {numberFormat4(-p / (b - p))}
                                    <br />
                                    <br />
                                    Man kan alternativt benytte de blå og lilla
                                    længder på figuren for priselasticitet.
                                    <br />e<sub>p</sub> = -højre/venstre =
                                    -lilla/blå ={" "}
                                    {numberFormat4(-(-b / a - (p - b) / a))}/
                                    {numberFormat4((p - b) / a)} =
                                    {numberFormat4(-p / (b - p))}
                                    <br />
                                    Priselasticiteten antager næsten altid
                                    negative værdier, ofte undlades minus i
                                    lærebøger. Når omsætningen er maksimal (Ved
                                    P = {numberFormat4(b / 2)}), er
                                    priselasticiteten -1, vi siger der er
                                    enhedselasticitet eller unielasticitet.
                                    <br />
                                    Er prisen højere end {numberFormat4(
                                      b / 2
                                    )}{" "}
                                    er elasticiteten mindre end -1, vi siger så
                                    at priselasticiteten er elastisk, dette kan
                                    ses af det grønne linjestykke.
                                    <br />
                                    Er prisen lavere end {numberFormat4(
                                      b / 2
                                    )}{" "}
                                    er elasticiteten mellem -1 og 0, vi siger så
                                    at priselasticiteten er uelastisk, dette kan
                                    ses af det røde linjestykke.
                                  </td>
                                </tr>
                              </span>
                            </tbody>
                          </small>
                        )}
                        {!on && (
                          <small>
                            <tbody>
                              <span class="align-top">
                                <tr>
                                  <th>DK navn</th>
                                  <th>US navn</th>
                                  <th>Værdi</th>
                                  <th>Forklaring</th>
                                </tr>

                                <tr>
                                  <td>P</td>
                                  <td>P</td>
                                  <td>{numberFormat4(a).concat("X+", b)}</td>

                                  <td>
                                    P er Pris- afsætningsfunktionen. P angiver
                                    hvilken pris P, man skal sætte for at
                                    afsætte mængden X stk.
                                  </td>
                                </tr>

                                <tr>
                                  <td>Pris</td>
                                  <td>Price</td>
                                  <td>{numberFormat4(p).concat(" DKK.")}</td>

                                  <td>
                                    Prisen p er her fastsat eksternt, dette vil
                                    ofte være ud fra en bidragskalkulation, hvor
                                    man kalkulerer salgsprisen ud fra et ønsket
                                    dækningsbidrag.
                                  </td>
                                </tr>

                                <tr>
                                  <td>X eller M</td>
                                  <td>X eller Q</td>
                                  <td>
                                    {numberFormat4((p - b) / a).concat(" stk.")}
                                  </td>

                                  <td>
                                    Afsætningen bestemmes ud fra pris-
                                    afsætningsfunktionen, når vi kender prisen,
                                    hældningskoefficienten a og skæringen med
                                    y-aksen b, kan vi løse følgende ligning:
                                    <BlockMath>
                                      P=aX+b \Leftrightarrow
                                    </BlockMath>
                                    <BlockMath>
                                      {String.raw`\textstyle ${numberFormat4(
                                        p
                                      )}=${numberFormat4(a)}X+${numberFormat4(
                                        b
                                      )}\Leftrightarrow`}
                                    </BlockMath>
                                    <BlockMath>
                                      {String.raw`\textstyle ${numberFormat4(
                                        p
                                      )}-${numberFormat4(b)}=${numberFormat4(
                                        a
                                      )}X\Leftrightarrow`}
                                    </BlockMath>
                                    <BlockMath>
                                      {String.raw`\textstyle ${numberFormat4(
                                        p - b
                                      )}=${numberFormat4(a)}X\Leftrightarrow`}
                                    </BlockMath>
                                    <BlockMath>
                                      {String.raw`\textstyle \frac{${numberFormat4(
                                        p - b
                                      )}}{${numberFormat4(
                                        a
                                      )}}=X \Leftrightarrow`}
                                    </BlockMath>
                                    <BlockMath>
                                      {String.raw`\textstyle ${numberFormat4(
                                        (p - b) / a
                                      )}=X`}
                                    </BlockMath>
                                  </td>
                                </tr>

                                <tr>
                                  <td>GROMS</td>
                                  <td>MR</td>
                                  <td>
                                    {numberFormat4(2 * a).concat("X+", b)}
                                  </td>

                                  <td>
                                    GROMS er grænseomsætningen. GROMS angiver
                                    hvor meget omsætningen vokser ved en given
                                    afsætning X, når der afsættes et stk. mere.
                                    GROMS der omsætningen differentieret.
                                    <br />
                                    Når P er lineær, kan vi hurtigt finde GROMS
                                    som P med den dobbelte hældning:
                                    <br />
                                    GROMS = 2 &middot;{" "}
                                    {numberFormat4(a).concat("X+", b)} ={" "}
                                    {numberFormat4(2 * a).concat("X+", b)}
                                  </td>
                                </tr>

                                <tr>
                                  <td>Omsætning</td>
                                  <td>TR</td>
                                  <td>
                                    {numberFormat4(a)}X<sup>2</sup>+
                                    {numberFormat4(b)}X
                                  </td>

                                  <td>
                                    Omsætning bestemmes som pris gange
                                    afsætning, når prisafsætningsfunktionen er
                                    lineær bliver omsætningsfunktionen et
                                    andetgradspolynomium. Funktionen for
                                    omsætningen bliver:
                                    <br />
                                    Omsætning = P · X = (aX + b) · X = (
                                    {numberFormat4(a).concat(
                                      "X + ",
                                      numberFormat4(b)
                                    )}
                                    )·X ={" "}
                                    {numberFormat4(a).concat(
                                      "X·X + ",
                                      numberFormat4(b),
                                      "X"
                                    )}{" "}
                                    = {numberFormat4(a)}X<sup>2</sup> +{" "}
                                    {numberFormat4(b)}X
                                    <br />
                                    Når vi kender afsætningen X ={" "}
                                    {numberFormat4((p - b) / a)} stk. kan vi
                                    indsætte afsætningen i omsætningsfunktionen.
                                    Men her er det nemmere at gange pris P og
                                    afsætning X <br />
                                    Omsætning = {numberFormat4(p)} ·{" "}
                                    {numberFormat4((p - b) / a)} ={" "}
                                    {numberFormat4(((p - b) / a) * p)} DKK.
                                    Omsætningen svarer til det grønne areal i
                                    figuren ovenfor.
                                    <br />
                                    <br />
                                    Når P er lineær en lineær, kan man altid
                                    finde prisen der giver den maksimale
                                    omsætning som b/2 = {numberFormat4(b)}/2 =
                                    {numberFormat4(b / 2)}.<br />
                                    Afsætningen der maksimerer omsætningen, kan
                                    så findes ved at indsætte P ={" "}
                                    {numberFormat4(b / 2)} i pris-
                                    afsætningsfunktionen og løse ligningen på
                                    samme måde, som vi fandt afsætningen
                                    ovenfor.
                                    <br />X = ({numberFormat4(b / 2)} -{" "}
                                    {numberFormat4(b)})/{numberFormat4(a)} ={" "}
                                    {numberFormat4((b / 2 - b) / a)}
                                    <br />
                                    Den maksimale omsætning bliver så:
                                    <br />P · X = {numberFormat4(b / 2)} ·{" "}
                                    {numberFormat4((b / 2 - b) / a)} ={" "}
                                    {numberFormat4((b / 2) * ((b / 2 - b) / a))}
                                    <br />
                                    Hvilket svarer til toppunktet i den grønne
                                    parabel for omsætningen ovenfor. Afsætningen
                                    og prisen der maksimerer omsætningen fremgår
                                    af de stiplede sorte linjer ovenfor.
                                  </td>
                                </tr>
                              </span>
                            </tbody>
                          </small>
                        )}
                      </div>
                    )}
                  />

                  <br />
                </tr>
              </span>
            </thead>
          </table>
          {/* </div> */}
        </div>
      </Container>

      <Container>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            title="embedsPage"
            className="embed-responsive-item"
            src="https://vimeo.com/showcase/7079949/embed"
            allowfullscreen
          ></iframe>
        </div>
      </Container>
      <br />
      <br />
    </div>
  );
}
