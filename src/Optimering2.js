import React, { useState } from "react";

import { Row, Col, FormControl } from "react-bootstrap";
import "chartjs-plugin-annotation";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./styles.css";
import {
  numberFormat1,
  // numberFormat2,
  numberFormat3,
  numberFormat4,
  //numberFormat5,
  //numberFormat6,
} from "./lib"; //ændrer til komma og pct + DKK
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/annotations")(Highcharts);

require("highcharts/highcharts-more")(Highcharts);

export function Optimering2() {
  const [a, seta] = useState(+(-1.25).toFixed(2));
  const [b, setb] = useState(+(100).toFixed(2));
  const [ag, setag] = useState(+(0.5).toFixed(2));
  const [bg, setbg] = useState(+(50).toFixed(2));

  var ox;
  if (ag < 0 && -bg / (2 * ag) < -b / (2 * a)) {
    ox = -b / (2 * a);
  } else {
    ox = (bg - b) / (2 * a - ag);
  }

  var op = a * ox + b;
  var ove = 0.5 * ag * ox + bg;
  // var ogroms = ag * ox + bg;

  var dbneg;
  if ((a * ox + b) * ox - (0.5 * ag * ox + bg) * ox < 0) {
    dbneg =
      "Bemærk! Dækningsbidraget er negativt, der bør slet ikke afsættes. ";
  } else {
    dbneg = "";
  }
  var xneg;

  if (ox < 0) {
    xneg =
      "Bemærk! Afsætningen beregnes til negativ, dette er ikke muligt. Der bør slet ikke afsættes. ";
  } else {
    xneg = "";
  }

  var omsneg;
  if ((a * ox + b) * ox < 0 < 0) {
    omsneg =
      "Bemærk! Omsætningen beregnes som negativ, der bør slet ikke afsættes. ";
  } else {
    omsneg = "";
  }

  var optimalx = ox.toFixed(2);
  var optimalp = op.toFixed(2);

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

  return (
    <div>
      <Container>
        <div class="p-3 mb-2 bg-secondary text-light">
          <h3>Optimering</h3>
          <h5>Maksimering af dækningsbidrag</h5>
          <h5>Bestem den optimale pris og afsætning</h5>
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
                </Form>
                <br />
                <h5>Grænseomkostningerne GROMK = aX+b = {gromkligning}</h5>

                <Form>
                  <Row>
                    <Col>
                      <InputGroup size="sm">
                        {/* <InputGroup.Prepend>
                          <InputGroup.Text size="sm">i boks før input</InputGroup.Text>
                          </InputGroup.Prepend> */}
                        <Form.Control
                          type="number"
                          step={0.01}
                          precision={0}
                          mobile={true}
                          value={ag}
                          onChange={(e) => setag(e.target.value)}
                          aria-describedby="inputGroupAppend"
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
                          value={bg}
                          onChange={(e) => setbg(Math.abs(e.target.value))}
                          aria-describedby="inputGroupAppend"
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
              <HighchartsReact
                //containerProps={{ style: { height: "200%" } }}
                highcharts={Highcharts}
                options={{
                  title: {
                    text: "Optimering",
                  },
                  exporting: {
                    buttons: {
                      contextButton: {
                        menuItems: [
                          "viewFullscreen",
                          "separator",
                          "downloadPNG",
                          "downloadPNG",
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
                        // backgroundColor: "rgba(255,255,255,1)",
                        backgroundColor: "rgba(252, 255, 197, 1)",
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
                            x: (-0.5 * b) / a,
                            y: 2,
                          },
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
                            y: 2,
                          },
                          text:
                            "P=" + numberFormat4(a) + "X+" + numberFormat4(b),
                        },

                        {
                          point: {
                            xAxis: 0,
                            yAxis: 0,
                            x: -b / a,
                            y: 0.5 * ag * (-b / a) + bg,
                          },
                          text: "VE=" + avcligning,
                        },
                        {
                          point: {
                            xAxis: 0,
                            yAxis: 0,
                            x: (-0.5 * b) / a,
                            y: ag * ((-0.5 * b) / a) + bg,
                          },
                          text: "GROMK=" + gromkligning,
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
                      labels: [
                        {
                          point: {
                            xAxis: 0,
                            yAxis: 0,
                            x: ox,
                            y: 0,
                          },
                          text: "Optimal X<br>" + numberFormat3(ox) + "stk.",
                        },
                        {
                          point: {
                            xAxis: 0,
                            yAxis: 0,
                            x: 0,
                            y: op,
                          },
                          text: "Optimal P<br>" + numberFormat3(op) + "kr.",
                        },
                      ],
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
                    max: Math.max(b, 0.5 * ag * (-b / a) + bg),
                    labels: {
                      format: "{value} DKK.",
                    },
                  },
                  series: [
                    {
                      name: "TVO",
                      type: "polygon",
                      data: [
                        [0, 0],
                        [+ox.toFixed(2), 0],
                        [+ox.toFixed(2), +ove.toFixed(2)],
                        [0, +ove.toFixed(2)],
                      ],
                      color: "rgb(255,0,0,.2)",
                    },
                    {
                      name: "DB",
                      type: "polygon",
                      data: [
                        [0, ove],
                        [ox, ove],
                        [ox, op],
                        [0, op],
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
                      name: "GROMS",
                      data: [
                        [0, b],
                        [(-0.5 * b) / a, 0],
                      ],
                    },
                    {
                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 3,
                      },
                      name: "Optimal P",
                      data: [[ox.toFixed(2), +op.toFixed(2)]],
                    },
                    // {
                    //   marker: {
                    //     enabled: false,
                    //     symbol: "circle",
                    //     radius: 3,
                    //   },
                    //   name: "Optimal VE",
                    //   data: [[ox.toFixed(2), +ove.toFixed(2)]],
                    // },
                    // {
                    //   marker: {
                    //     enabled: false,
                    //     symbol: "circle",
                    //     radius: 3,
                    //   },
                    //   legend: {
                    //     enabled: false,
                    //   },
                    //   name: "Optimal test",
                    //   data: [[ox.toFixed(2), +ogroms.toFixed(2)]],
                    // },
                    {
                      type: "line",
                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 2,
                      },
                      name: "P",
                      data: [
                        [0, b],
                        [-b / a, 0],
                      ],
                    },
                    {
                      type: "line",
                      color: "brown",

                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 2,
                      },
                      name: "GROMK",
                      data: [
                        [0, bg],
                        [-b / a, ag * (-b / a) + bg],
                      ],
                    },
                    {
                      type: "line",
                      color: "grey",
                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 2,
                      },
                      name: "VE",
                      data: [
                        [0, bg],
                        [-b / a, 0.5 * ag * (-b / a) + bg],
                      ],
                    },
                    {
                      type: "line",
                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 2,
                      },
                      dashStyle: "ShortDot",
                      name: "Optimal P",
                      data: [
                        [0, +op.toFixed(2)],
                        [+ox.toFixed(2), +op.toFixed(2)],
                      ],
                    },
                    {
                      type: "line",
                      marker: {
                        enabled: false,
                        symbol: "circle",
                        radius: 2,
                      },
                      dashStyle: "ShortDot",
                      name: "Optimal X",
                      data: [
                        [+ox.toFixed(2), +op.toFixed(2)],
                        [+ox.toFixed(2), 0],
                      ],
                    },
                  ],
                }}
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
                      <b>{xneg}</b>
                      Afsætningen angiver det totale salg af varen i stk.
                      Optimal afsætning X<sup>opt</sup> ={" "}
                      {numberFormat4(optimalx)} stk. er den afsætning, der
                      maksimerer dækningsbidraget DB (det er forudsat at DB er
                      positivt). Vi kan finde den optimale afsætning ved at
                      sætte GROMS lig med GROMK:
                      <BlockMath>GROMS=GROMK \Leftrightarrow</BlockMath>
                      <BlockMath>
                        {String.raw`\textstyle ${numberFormat4(
                          2 * a
                        )}X+${numberFormat4(b)} =${numberFormat4(
                          ag
                        )}X+${numberFormat4(bg)}\Leftrightarrow`}
                      </BlockMath>
                      <BlockMath>
                        {String.raw`\textstyle ${numberFormat4(
                          b
                        )}-${numberFormat4(bg)} =${numberFormat4(
                          ag
                        )}X+${numberFormat4(-2 * a)}X\Leftrightarrow`}
                      </BlockMath>
                      <BlockMath>
                        {String.raw`\textstyle ${numberFormat4(
                          b - bg
                        )} =${numberFormat4(ag - 2 * a)}X\Leftrightarrow`}
                      </BlockMath>
                      <BlockMath>
                        {String.raw`\textstyle \frac{${numberFormat4(
                          b - bg
                        )}}{${numberFormat4(ag - 2 * a)}} = X\Leftrightarrow`}
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
                      <b>{xneg}</b>
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
                      <b>{xneg}</b>
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
                      <b>{xneg}</b>
                      <b>{omsneg}</b>
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
                      <b>{xneg}</b>
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
                      <b>{dbneg}</b>
                      <b>{xneg}</b>
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

      <Container className="p-0">
        <div class="row p-3">
          <div class="col-md-12 p-3 container-fluid">
            <div class="card h-100">
              <div class="card-body bg-white">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      plotBackgroundColor: null,
                      plotBorderWidth: null,
                      plotShadow: false,
                      type: "pie",
                    },
                    title: {
                      text: "Optimal Omsætning " + numberFormat1(omsætning),
                    },
                    exporting: {
                      buttons: {
                        contextButton: {
                          menuItems: [
                            "viewFullscreen",
                            "separator",
                            "downloadPNG",
                            "downloadPNG",
                            "downloadSVG",
                          ],
                        },
                      },
                    },
                    credits: {
                      enabled: false,
                    },
                    tooltip: {
                      pointFormat: "{series.name}: </b>{point.y}</b> DKK.",
                    },
                    accessibility: {
                      point: {
                        valueSuffix: "%",
                      },
                    },
                    plotOptions: {
                      pie: {
                        allowPointSelect: true,
                        cursor: "pointer",
                        dataLabels: {
                          enabled: true,
                          format: "{point.name}",
                        },
                      },
                    },
                    series: [
                      {
                        name: "Totalt",

                        data: [
                          {
                            name: "DB",
                            color: "rgb(0,255,0,.5)",
                            y: +db.toFixed(0),
                            sliced: true,
                            selected: true,
                          },
                          {
                            name: "TVO",
                            color: "rgb(255,0,0,.2)",
                            y: +tvo.toFixed(0),
                          },
                        ],
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
