import React, { useState } from "react";

// import { Chart } from "react-google-charts";
import "chartjs-plugin-annotation";

import "./styles.css";
import {
  numberFormat1,
  // numberFormat2,
  //numberFormat3,
  numberFormat4,
  //numberFormat5,
  //numberFormat6,
} from "./lib"; //ændrer til komma og pct + DKK
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Doughnut, Scatter } from "react-chartjs-2";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export function Optimering() {
  const [a, seta] = useState(+(-1.25).toFixed(2));
  const [b, setb] = useState(+(100).toFixed(2));
  const [ag, setag] = useState(+(0.5).toFixed(2));
  const [bg, setbg] = useState(+(50).toFixed(2));

  var ox = (bg - b) / (2 * a - ag);
  var op = a * ox + b;
  var ove = 0.5 * ag * ox + bg;

  var optimalx = ox.toFixed(2);
  var optimalp = op.toFixed(2);
  var optimalve = ove.toFixed(2);

  var omsætning = (ox * op).toFixed(2);
  var tvo = ox * (0.5 * ag * ox + bg);
  var db = omsætning - tvo;
  // korrektion når AVC og GROMK konstatn
  var avcligning;
  if (ag !== 0) {
    avcligning = numberFormat4(0.5 * ag).concat("X + ", bg);
  } else {
    avcligning = bg;
  }

  var avcligning2;
  if (ag !== 0) {
    avcligning2 = "";
  } else {
    avcligning2 = " = " + bg;
  }

  var gromkligning;
  if (ag !== 0) {
    gromkligning = numberFormat4(ag).concat("X + ", bg);
  } else {
    gromkligning = bg;
  }

  var gromkligning2;
  if (ag !== 0) {
    gromkligning2 = "";
  } else {
    gromkligning2 = " = " + bg;
  }

  var tvoligning2;
  if (ag !== 0) {
    tvoligning2 = "";
  } else {
    tvoligning2 = " = " + bg + "X";
  }

  const datadoug = {
    labels: [
      "TVO ".concat(numberFormat1(tvo)),
      "DB ".concat(numberFormat1(db.toFixed(2))),
    ],
    datasets: [
      {
        label: "Fremtidsværdi i DKK ",
        backgroundColor: ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)"],
        hoverBackgroundColor: ["rgba(255, 0, 0, 0.5)", "rgba(0, 255, 0, 0.5)"],
        data: [tvo.toFixed(2), db.toFixed(2)],
      },
    ],
  };

  const data = {
    labels: ["Scatter"],

    datasets: [
      {
        label: "P",
        fill: false,

        showLine: true,
        borderColor: "green",
        data: [
          { x: 0, y: b },
          { x: -b / a, y: 0 },
        ],

        datalabels: {
          labels: {
            title: {
              display: "false",
              text: "Custom Chart Title",
              font: {
                // weight: "bold",
                fontSize: 6,
              },
            },
            value: {
              color: "red",
            },
          },
          color: "white",
          backgroundColor: "green",
          display: ["null", "auto"],
          align: ["right", "left"],
          fontSize: 12,
        },
      },

      {
        label: "GROMS",
        fill: false,

        showLine: true,
        borderColor: "blue",
        data: [
          { x: 0, y: b },
          { x: (-0.5 * b) / a, y: 0 },
        ],
        chartOptions: {
          tooltips: {
            titleFontSize: 40,
            title: "GROMS",
            titleFontColor: "red",
            bodyFontColor: "red",
            bodyFontSize: 44,
            displayColors: true,
          },
        },
      },

      {
        label: "GROMK",
        fill: false,
        showLine: true,
        borderColor: "orange",
        data: [
          { x: 0, y: bg },
          { x: -b / a, y: (ag * -b) / a + bg },
        ],
      },

      {
        label: "AVC",
        fill: false,
        showLine: true,
        borderColor: "red",
        data: [
          { x: 0, y: bg },
          { x: -b / a, y: (0.5 * ag * -b) / a + bg },
        ],
      },

      {
        label: "DB",

        fill: 5,
        backgroundColor: "rgba(0, 255, 0, 0.3)",
        showLine: true,
        borderColor: "grey",
        borderDash: [2, 2],
        data: [
          { x: 0, y: optimalp },
          { x: optimalx, y: optimalp },
        ],
        options: {
          legend: {
            display: false,
          },
        },
      },

      {
        label: "TVO",
        fill: true,
        backgroundColor: "rgba(255, 0, 0, 0.3)",
        showLine: true,
        borderColor: "grey",
        borderDash: [2, 2],
        data: [
          { x: 0, y: optimalve },
          { x: optimalx, y: optimalve },
        ],
        chartOptions: {
          legend: {
            display: true,
          },
        },
      },

      {
        label: "",
        fill: false,

        showLine: true,
        borderColor: "grey",
        borderDash: [2, 2],
        data: [
          { x: optimalx, y: optimalp },
          { x: optimalx, y: 0 },
        ],
        chartOptions: {
          legend: {
            display: false,
          },
        },
      },
    ],
  };

  return (
    <div>
      <Container>
        <div class="p-3 mb-2 bg-secondary text-white">
          <h1>Optimering</h1>
          <h3>Maksimering af dækningsbidrag</h3>
          <h3>Bestem den optimale pris og afsætning</h3>
        </div>
      </Container>

      {/* <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <h3>Optimering</h3>

              <Chart
                chartType="ScatterChart"
                data={data23}
                options={options23}
                width="100%"
                height="400px"
                legendToggle
                // formatters={[
                //   {
                //     type: "NumberFormat",

                //     options: {
                //       prefix: "$",
                //       negativeColor: "red",
                //       negativeParens: true,
                //     },
                //   },
                // ]}
              />
            </div>
          </div>
        </div>
      </Container> */}

      <Container className="p-0">
        <div class="row p-3">
          <div class="col-md-6 p-3 ">
            <div class="card h-100">
              <div class="card-body">
                <Container className="p-3">
                  <div class="p-3 mb-2 bg-white">
                    <h4>Prisafsætningsfunktionen P</h4>

                    <Form.Group>
                      <Form.Label>Hældning a</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          max="-0.000000001"
                          step={0.01}
                          precision={0}
                          mobile={true}
                          value={+a}
                          onChange={(e) => seta(-Math.abs(e.target.value))}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            a
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <br />

                      <Form.Label>Skæring med y-aksen b</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          min="0"
                          step={1}
                          precision={0}
                          mobile={true}
                          value={+b}
                          onChange={(e) => setb(Math.abs(e.target.value))}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            b
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <br />
                      <h4>Grænseomkostningerne GROMK</h4>
                      <Form.Label>Hældning a</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          step={0.01}
                          precision={0}
                          mobile={true}
                          value={ag}
                          onChange={(e) => setag(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            a
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                      <br />
                      <Form.Label>Skæring med y-aksen b</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          min="0"
                          step={1}
                          precision={0}
                          mobile={true}
                          value={bg}
                          onChange={(e) => setbg(Math.abs(e.target.value))}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            b
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Form.Group>
                  </div>
                </Container>
              </div>
            </div>
          </div>
          <div class="col-md-6 p-3 container-fluid">
            <div class="card h-100">
              <div class="card-body bg-white">
                <h3>Optimal omsætning {numberFormat1(omsætning)}</h3>
                <div>
                  <Doughnut
                    data={datadoug}
                    height={400}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
                {/* </ResponsiveContainer> */}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <h3>Optimering</h3>

              <Scatter
                data={data}
                width={100}
                height={70}
                // plugins={ChartDataLabels}
                options={
                  ({ maintainAspectRatio: false },
                  {
                    scales: {
                      yAxes: [
                        {
                          scaleLabel: {
                            display: true,
                            labelString: "DKK",
                          },
                          ticks: {
                            callback: function (value, index, values) {
                              return value + " DKK";
                            },
                          },
                        },
                      ],
                      xAxes: [
                        {
                          scaleLabel: {
                            display: true,
                            labelString: "Afsætning",
                          },
                          ticks: {
                            callback: function (value, index, values) {
                              return value + " stk";
                            },
                          },
                        },
                      ],
                    },
                    annotation: {
                      annotations: [
                        {
                          drawTime: "afterDraw",
                          type: "line",
                          mode: "horizontal",
                          scaleID: "y-axis-1",
                          value: b,
                          endValue: -b,
                          borderColor: "rgba(0,0,0,0)",
                          borderWidth: 4,
                          label: {
                            backgroundColor: "blue",
                            fontFamily: "sans-serif",
                            fontSize: 8,
                            fontStyle: "normal",
                            fontColor: "#fff",
                            xPadding: 4,
                            yPadding: 4,
                            cornerRadius: 0,
                            position: "center",
                            yAdjust: -20,
                            xAdjust: 0,
                            enabled: true,
                            content: "GROMS = ".concat(
                              numberFormat4(2 * a),
                              "X +",
                              b
                            ),
                            rotation: 45,
                          },
                        },
                        {
                          drawTime: "afterDraw",
                          type: "line",
                          mode: "horizontal",
                          scaleID: "y-axis-1",
                          value: b,
                          endValue: 0,
                          borderColor: "rgba(0,0,0,0)",
                          borderWidth: 1,
                          label: {
                            backgroundColor: "green",
                            fontFamily: "sans-serif",
                            fontSize: 8,
                            fontStyle: "normal",
                            fontColor: "#fff",
                            xPadding: 4,
                            yPadding: 4,
                            cornerRadius: 0,
                            position: "right",
                            yAdjust: 20,
                            xAdjust: 200,
                            enabled: true,
                            content: "P = ".concat(numberFormat4(a), "X +", b),
                            rotation: 4,
                          },
                        },
                        {
                          drawTime: "afterDraw",
                          type: "line",
                          mode: "horizontal",
                          scaleID: "y-axis-1",
                          value: bg,
                          endValue: (ag * -b) / a + bg,
                          borderColor: "rgba(0,0,0,0)",
                          borderWidth: 4,
                          label: {
                            backgroundColor: "orange",
                            fontFamily: "sans-serif",
                            fontSize: 8,
                            fontStyle: "normal",
                            fontColor: "#fff",
                            xPadding: 4,
                            yPadding: 4,
                            cornerRadius: 0,
                            position: "center",
                            yAdjust: 0,
                            xAdjust: 0,
                            enabled: true,
                            content: "GROMK = ".concat(gromkligning),
                            rotation: 45,
                          },
                        },
                        {
                          drawTime: "afterDraw",
                          type: "line",
                          mode: "horizontal",
                          scaleID: "y-axis-1",
                          value: bg,
                          endValue: (0.5 * ag * -b) / a + bg,
                          borderColor: "rgba(0,0,0,0)",
                          borderWidth: 4,
                          label: {
                            backgroundColor: "red",
                            fontFamily: "sans-serif",
                            fontSize: 8,
                            fontStyle: "normal",
                            fontColor: "#fff",
                            xPadding: 4,
                            yPadding: 4,
                            cornerRadius: 0,
                            position: "right",
                            yAdjust: 0,
                            xAdjust: 0,
                            enabled: true,
                            content: "VE = ".concat(avcligning),
                            rotation: 45,
                          },
                        },

                        {
                          drawTime: "afterDraw",
                          type: "line",
                          mode: "horizontal",
                          scaleID: "y-axis-1",
                          value: optimalp,
                          //endValue: (0.5 * ag * -b) / a + bg,
                          borderColor: "rgba(0,0,0,0)",
                          borderWidth: 4,
                          label: {
                            backgroundColor: "grey",
                            fontFamily: "sans-serif",
                            fontSize: 8,
                            fontStyle: "normal",
                            fontColor: "#fff",
                            xPadding: 4,
                            yPadding: 4,
                            cornerRadius: 0,
                            position: "left",
                            yAdjust: 0,
                            xAdjust: 0,
                            enabled: true,
                            content: "Optimal pris P = ".concat(
                              numberFormat1(optimalp)
                            ),
                            rotation: 45,
                          },
                        },

                        {
                          drawTime: "afterDraw",
                          type: "line",
                          mode: "vertical",
                          scaleID: "x-axis-1",
                          value: optimalx,
                          //endValue: (0.5 * ag * -b) / a + bg,
                          borderColor: "rgba(0,0,0,0)",
                          borderWidth: 4,
                          label: {
                            backgroundColor: "grey",
                            fontFamily: "sans-serif",
                            fontSize: 8,
                            fontStyle: "normal",
                            fontColor: "#fff",
                            xPadding: 4,
                            yPadding: 4,
                            cornerRadius: 0,
                            position: "bottom",
                            yAdjust: 0,
                            xAdjust: 0,
                            enabled: true,
                            content: "Optimal afsætning X = ".concat(
                              numberFormat4(optimalx),
                              " stk."
                            ),

                            rotation: 45,
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
      </Container>

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
                      P er Pris- afsætningsfunktionen. P angiver hvilken pris P,
                      man skal sætte for at afsætte mængden X stk.
                    </td>
                  </tr>

                  <tr>
                    <td>GROMS</td>
                    <td>MR</td>
                    <td>{numberFormat4(2 * a).concat("X+", b)}</td>

                    <td>
                      GROMS er grænseomsætningen. GROMS angiver hvor meget
                      omsætningen vokser ved en given afsætning X, når der
                      afsættes et stk. mere. GROMS der omsætningen
                      differentieret.
                      <br />
                      Når P er lineær, kan vi hurtigt finde GROMS som P med den
                      dobbelte hældning:
                      <br />
                      GROMS = 2 &middot; {numberFormat4(a).concat(
                        "X+",
                        b
                      )} = {numberFormat4(2 * a).concat("X+", b)}
                    </td>
                  </tr>

                  <tr>
                    <td>GROMK</td>
                    <td>MC</td>
                    <td>{gromkligning}</td>

                    <td>
                      GROMK er grænseomkostningerne. GROMK angiver hvor meget
                      omkostningerne vokser ved en given afsætning X, når der
                      afsættes et stk mere. GROMK kan findes ved af
                      differentiere de totale variable omkostninger TVO eller de
                      totale omkostninger TO. <br />
                      Er VE lineær og kendt kan vi hurtigt finde GROMK som VE
                      med den dobbelte hældning.
                      <br />
                      GROMK = 2 &middot;{" "}
                      {numberFormat4(ag * 0.5).concat("X+", b)} ={" "}
                      {numberFormat4(ag).concat("X+", b)}
                      {gromkligning2}
                    </td>
                  </tr>

                  <tr>
                    <td>VE</td>
                    <td>AVC</td>
                    <td>{avcligning}</td>

                    <td>
                      VE er de variable enhedsomkostninger (AVC er average
                      variable costs). VE angiver de gennemsnitlige variable
                      omkostninger pr. stk. Kender man GROMK, og er GROMK en
                      lineær funktion, kan VE hurtigt findes som GROMK med den
                      halve hældning:
                      <br />
                      VE = 0,5 &middot; {numberFormat4(ag).concat(
                        "X+",
                        bg
                      )} = {numberFormat4(0.5 * ag).concat("X+", bg)}
                      {avcligning2}
                    </td>
                  </tr>

                  <tr>
                    <td>Omsætning</td>
                    <td>TR</td>
                    <td>
                      {numberFormat4(a)}X<sup>2</sup>+{numberFormat4(b)}X
                    </td>

                    <td>
                      Omsætning bestemmes som pris gange afsætning, når
                      prisafsætningsfunktionen er lineær bliver
                      omsætningsfunktionen et andetgradspolynomium. Funktionen
                      for omsætningen bliver:
                      <br />
                      Omsætning = P · X = (aX + b) · X = (
                      {numberFormat4(a).concat("X + ", numberFormat4(b))})·X ={" "}
                      {numberFormat4(a).concat("X·X + ", numberFormat4(b), "X")}{" "}
                      = {numberFormat4(a)}X<sup>2</sup> + {numberFormat4(b)}X
                    </td>
                  </tr>

                  <tr>
                    <td>TVO</td>
                    <td>TVC</td>
                    <td>
                      {numberFormat4(0.5 * ag)}X<sup>2</sup> +
                      {numberFormat4(bg)}X
                    </td>

                    <td>
                      TVO Totale variable omkostninger kan bestemmes som VE
                      gange afsætning, når VE er lineær bliver TVO et
                      andetgradspolynomium. Funktionen for TVO bliver:
                      <br />
                      TVO = VE · X = (aX + b) · X = (
                      {numberFormat4(0.5 * ag).concat(
                        "X + ",
                        numberFormat4(bg)
                      )}
                      )·X ={" "}
                      {numberFormat4(0.5 * ag).concat(
                        "X·X + ",
                        numberFormat4(bg),
                        "X"
                      )}{" "}
                      = {numberFormat4(0.5 * ag)}X<sup>2</sup> +{" "}
                      {numberFormat4(bg)}X{tvoligning2}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      X<sup>opt</sup>
                      <br />
                      eller
                      <br />M<sup>opt</sup>
                    </td>
                    <td>
                      X<sup>opt</sup>
                      <br />
                      eller
                      <br />Q<sup>opt</sup>
                    </td>
                    <td>{numberFormat4(optimalx)} stk.</td>

                    <td>
                      Afsætningen angiver det totale salg af varen i stk.
                      Optimal afsætning X<sup>opt</sup> ={" "}
                      {numberFormat4(optimalx)} stk. er den afsætning, der
                      maksimerer dækningsbidraget DB (det er forudsat at DB er
                      positivt). Vi kan finde den optimale afsætning ved at
                      sætte GROMS lig med GROMK:
                      <BlockMath>GROMS=GROMK</BlockMath>
                      <BlockMath>
                        {String.raw`\textstyle ${numberFormat4(
                          2 * a
                        )}X+${numberFormat4(b)} =${numberFormat4(
                          ag
                        )}X+${numberFormat4(bg)}`}
                      </BlockMath>
                      <BlockMath>
                        {String.raw`\textstyle ${numberFormat4(
                          b
                        )}-${numberFormat4(bg)} =${numberFormat4(
                          ag
                        )}X+${numberFormat4(-2 * a)}X`}
                      </BlockMath>
                      <BlockMath>
                        {String.raw`\textstyle ${numberFormat4(
                          b - bg
                        )} =${numberFormat4(ag - 2 * a)}X`}
                      </BlockMath>
                      <BlockMath>
                        {String.raw`\textstyle \frac{${numberFormat4(
                          b - bg
                        )}}{${numberFormat4(ag - 2 * a)}} = X`}
                      </BlockMath>
                      <BlockMath>
                        {String.raw`\textstyle ${numberFormat4(
                          (b - bg) / (ag - 2 * a)
                        )} = X`}
                      </BlockMath>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      P<sup>opt</sup>
                    </td>
                    <td>
                      P<sup>opt</sup>
                    </td>
                    <td>{numberFormat1(optimalp)}</td>

                    <td>
                      Vi kender nu den optimale afsætning X<sup>opt</sup> og kan
                      ved at indsætte afsætningen i pris- afsætningsfunktionen,
                      bestemme hvilken pris vi skal tage for netop at afsætte
                      den optimale mængde X<sup>opt</sup>:
                      <br />P<sup>opt</sup> ={" "}
                      {numberFormat4(a).concat(
                        " · ",
                        numberFormat4(optimalx),
                        " + ",
                        b
                      )}{" "}
                      = {numberFormat1(optimalp)}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      VE<sup>opt</sup>
                    </td>
                    <td>
                      AVC<sup>opt</sup>
                    </td>
                    <td>{numberFormat1(0.5 * ag * optimalx + bg)}</td>

                    <td>
                      Vi kan indsætte den optimale afsætning X<sup>opt</sup> i
                      funktionen for VE, og bestemme de gennemsnitlige variable
                      omkostninger:
                      <br />
                      VE<sup>opt</sup> ={" "}
                      {numberFormat4(0.5 * ag).concat(
                        " · ",
                        numberFormat4(optimalx),
                        " + ",
                        bg
                      )}{" "}
                      = {numberFormat1(0.5 * ag * optimalx + bg)}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      Omsætning<sup>opt</sup>
                    </td>
                    <td>
                      TR<sup>opt</sup>
                    </td>
                    <td>{numberFormat1(optimalp * optimalx)}</td>

                    <td>
                      Omsætningen angiver det totale salg af varen i kroner. Man
                      kan indsætte den optimale afsætning i funktionen for
                      omsætning ovenfor, eller man kan gange optimal pris P
                      <sup>opt</sup>
                      og afsætning X<sup>opt</sup>:
                      <br />
                      Omsætning<sup>opt</sup> = P<sup>opt</sup> · X
                      <sup>opt</sup> = {numberFormat4(optimalp)} ·{" "}
                      {numberFormat4(optimalx)} ={" "}
                      {numberFormat1(optimalp * optimalx)}
                      <br />
                      Optimal omsætning fremgår af figuren ovenfor som summen af
                      det grønne DB og det TVO røde areal.
                    </td>
                  </tr>

                  <tr>
                    <td>
                      TVO<sup>opt</sup>
                    </td>
                    <td>
                      TVC<sup>opt</sup>
                    </td>
                    <td>{numberFormat1(ove * ox)}</td>

                    <td>
                      TVO angiver de totale variable omkostninger i kroner. Man
                      kan indsætte den optimale afsætning i funktionen for TVO
                      ovenfor, eller man kan gange optimal VE og afsætning:
                      <br />
                      TVO<sup>opt</sup> = VE<sup>opt</sup> · X<sup>opt</sup> ={" "}
                      {numberFormat4(ove)} · {numberFormat4(ox)} ={" "}
                      {numberFormat1(ove * ox)}
                      <br />
                      TVO<sup>opt</sup> fremgår af figuren ovenfor som det røde
                      areal.
                    </td>
                  </tr>

                  <tr>
                    <td>
                      DB<sup>opt</sup>
                    </td>
                    <td>
                      Gross Profit<sup>opt</sup>
                    </td>
                    <td>{numberFormat1(op * ox - ove * ox)}</td>

                    <td>
                      Dækningsbidraget er omsætningen minus de totale variable
                      omkostninger. Dækningsbidraget benyttes til at dække faste
                      omkostninger og profit.
                      <br />
                      DB<sup>opt</sup> = Omsætning<sup>opt</sup> - TVO
                      <sup>opt</sup> = {numberFormat4(op * ox)} -{" "}
                      {numberFormat4(ove * ox)} ={" "}
                      {numberFormat1(op * ox - ove * ox)}
                      <br />
                      DB<sup>opt</sup> fremgår af figuren ovenfor som det grønne
                      areal.
                    </td>
                  </tr>
                </span>
              </tbody>
            </small>
          </table>
        </div>
      </Container>
    </div>
  );
}
