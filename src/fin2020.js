import React from "react";
import { useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import ReactHtmlParser from "react-html-parser";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import {
  numberFormat1,
  numberFormat2,
  numberFormat3,
  numberFormat4,
  numberFormat5,
} from "./lib"; //ændrer til komma og pct + DKK
import Container from "react-bootstrap/Container";
// import ReactHtmlParser from "react-html-parser";
import { Doughnut, Bar } from "react-chartjs-2";

// import MathJax from "react-mathjax2";

import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
// import { InlineMath } from "react-katex";

export function fin2020() {
  const [rente, setrente] = useState(+(1.25).toFixed(2));
  const [hovedstol, sethovedstol] = useState(+(100.0).toFixed(2));
  const [terminer, setterminer] = useState(+(10.0).toFixed(2));

  var fv = hovedstol * (1 + rente / 100) ** terminer;

  const cf = [...Array(terminer + 1).keys()];
  const cfnamed = cf.map((n) => "Tid: " + n);

  var cf2 = Array.apply(null, Array(terminer)).map((_) => "0");
  cf2.splice(0, 0, -1 * hovedstol);

  var nvspreadsheet = Array.apply(null, Array(terminer)).map((_) =>
    numberFormat3(0)
  );
  nvspreadsheet.splice(0, 0, numberFormat3(-1 * hovedstol));

  const fvbarchart = Array.apply(null, Array(terminer + 1)).map((_) => "0");
  fvbarchart.splice(terminer, 0, fv.toFixed(2));

  const fvspreadsheet = Array.apply(null, Array(terminer + 1)).map((_) =>
    numberFormat3(0)
  );
  fvspreadsheet.splice(terminer, 1, numberFormat3(fv));

  // const cf3 = cf;
  const rentecf = cf.map(
    (cf) =>
      -1 *
      (
        hovedstol * (1 + rente / 100) ** cf -
        hovedstol -
        (hovedstol * (1 + rente / 100) ** (cf - 1) - hovedstol)
      ).toFixed(2)
  );
  rentecf.splice(0, 1, 0);
  var rentespreadsheet = cf.map(
    (cf) =>
      -1 *
      (hovedstol * (1 + rente / 100) ** cf -
        hovedstol -
        (hovedstol * (1 + rente / 100) ** (cf - 1) - hovedstol))
  );
  rentespreadsheet.splice(0, 1, 0);

  const akkumcsfunk = ((sum) => (value) => numberFormat3((sum += value)))(-100);
  // Smart funktion der akkumulerer en array
  var akkumsum = rentespreadsheet.map(akkumcsfunk);
  rentespreadsheet = rentespreadsheet.map((rentespreadsheet) =>
    numberFormat3(rentespreadsheet)
  );
  var data1 = [cf, nvspreadsheet, rentespreadsheet, akkumsum, fvspreadsheet];
  var colhead = [
    "Tid",
    "NV Nutidsværdi DKK",
    "Renter DKK",
    "Saldo DKK",
    "FV Fremtidsværdi DKK",
  ];
  // var data2 = [["=FV(1.25%;10;0;-100)"]];

  const datadoug = {
    labels: [
      "Nutidsværdi ".concat(numberFormat1(hovedstol.toFixed(2))),
      "Rente ".concat(numberFormat1((fv - hovedstol).toFixed(2))),
    ],
    datasets: [
      {
        label: "Fremtidsværdi i DKK {FV}",
        backgroundColor: ["red", "orange"],
        hoverBackgroundColor: ["darkred", "darkorange"],
        data: [+hovedstol.toFixed(2), +(fv - hovedstol).toFixed(2)],
      },
    ],
  };

  const databar = {
    labels: cfnamed,
    datasets: [
      {
        label: "Nutidsværdi",
        backgroundColor: "red",
        stack: "Stack 0",
        hoverBackgroundColor: "darkred",
        data: cf2,
      },
      {
        label: "Renter",
        backgroundColor: "orange",
        stack: "Stack 0",
        hoverBackgroundColor: "darkorange",
        data: rentecf,
      },
      {
        label: "Fremtidsværdi",
        backgroundColor: "grey",
        stack: "Stack 0",
        hoverBackgroundColor: "darkgrey",
        data: fvbarchart,
      },
    ],
  };
  return (
    <div>
      <Container>
        <div class="p-3 mb-2 bg-secondary text-white">
          <h3>Finans</h3>
          <h5>Fremskrivning af kapital</h5>
          <h5>Hvor meget vokser et indestående med?</h5>
        </div>
      </Container>
      <Container className="p-0">
        <div class="row p-3">
          <div class="col-md-6 p-3 ">
            <div class="card h-100">
              <div class="card-body">
                <Container className="p-3">
                  <div class="p-3 mb-2 bg-white">
                    <h3>Variable:</h3>

                    <Form.Group>
                      <Form.Label>Rente i % pr. termin</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          value={rente}
                          onChange={(e) => setrente(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            %
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <br />

                      <Form.Label>Nutidsværdi i DKK</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          value={+hovedstol}
                          onChange={(e) => sethovedstol(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            DKK.
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <br />

                      <Form.Label>Antal terminer</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          min="1"
                          step={1}
                          precision={0}
                          mobile={true}
                          value={terminer}
                          onChange={(e) =>
                            setterminer(+e.target.value.replace(/\D/, ""))
                          }
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Terminer
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
                <h3>Fremtidsværdi {numberFormat1(fv)}</h3>
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
              <h3>Betalingsstrømmene over de {terminer} terminer</h3>
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

      <Container className="p-0">
        <div class="row p-3">
          <div class="col-md-6 p-3 ">
            <div class="card h-100">
              <div class="card-body">
                <Container className="p-3">
                  <p>
                    <i>
                      Hvis man i dag på tidspunkt 0, indsætter et beløb kaldet
                      nutidsværdien {numberFormat1(+hovedstol)}, vil det være
                      vokset til fremtidsværdien{" "}
                      <b>{numberFormat1(fv.toFixed(2))}</b> efter {terminer}{" "}
                      terminer, når renten pr. termin er {numberFormat2(rente)}%
                      <br />
                      <br />
                      Man kan udregne fremtidsværdien <b>
                        {numberFormat1(fv)}
                      </b>{" "}
                      i Excel ved følgende formel:<br></br>
                      =FV({numberFormat2(rente)}%;{terminer};0;
                      {numberFormat2(-1 * +hovedstol)}
                      )
                      <br />
                      <br />
                      For at fremtidsværdien i Excel bliver et positivt tal,
                      skal man indtaste nutidsværdien som et negativt tal. Vi
                      kan opfatte på det som, at når vi tager penge op af
                      lommen, og sætter pengene i banken, er beløbet negativt.
                      Fremtidsværdien som står til rådighed i banken efter de{" "}
                      {terminer} terminer, er så et positivt beløb, vi kan hæve
                      og putte i lommen igen.
                      <br />
                      <div>
                        {/* <HotTable
                          data={Handsontable.helper.translateRowsToColumns(
                            data2
                          )}
                          colHeaders={true}
                          rowHeaders={true}
                          // colHeaders={colhead2}

                          width="100%"
                          stretchH="all"
                          className="htRight"
                          preventOverflow="hidden"
                          manualColumnResize="100"
                          height="120"
                          licenseKey="non-commercial-and-evaluation"
                          formulas="true"
                          // renderer={lengthRenderer}
                          format="0,0.00 $"
                          language="de"
                          culture="de-DE"
                        /> */}
                        {/* <HotTable
                          data={[
                            [0.55, 0.23, 0.598],
                            [1.44, 5.78, 6.96],
                          ]}
                          contextMenu={true}
                          colHeaders={true}
                          dropdownMenu={true}
                          allowEmpty={false}
                          licenseKey="non-commercial-and-evaluation"
                        /> */}
                      </div>
                    </i>
                  </p>
                </Container>
              </div>
            </div>
          </div>

          <div class="col-md-6 p-3 container-fluid">
            <div class="card h-100">
              <div class="card-body bg-white text-black">
                <Container className="p-3">
                  <div>
                    <div>
                      Fremtidsværdien FV af en nutidsværdi kan udregnes ved
                      ligningen:
                      <br />
                      <BlockMath>{String.raw`FV=NV(1+RENTE)^{NPER}\Leftrightarrow`}</BlockMath>
                      <BlockMath>{String.raw`FV=${numberFormat5(
                        hovedstol
                      )}(1+${numberFormat5(
                        rente / 100
                      )})^{${terminer}}\Leftrightarrow`}</BlockMath>
                      <BlockMath>{String.raw`FV=${numberFormat4(
                        fv
                      )}`}</BlockMath>
                      <br />
                      Fremtidsværdien FV kan på en lommeregner udregnes som:
                      <br />
                      <i>
                        {numberFormat5(hovedstol)}*(1+
                        {rente / 100})^{terminer}
                      </i>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="p-0">
        <div class="p-3 mb-2  bg-white text-white">
          <table class="table bg-secondary text-white table-bordered table-hover table-sm table-responsive-sm">
            <thead>
              <tr>
                <th scope="col">Variabel</th>
                <th scope="col">DK Excel kode</th>
                <th scope="col">US Excel kode</th>
                <th scope="col">Forklaring</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Nutidsværdi</th>
                <td>NV</td>
                <td>PV</td>

                <td>
                  Nutidsværdien (her {numberFormat1(hovedstol.toFixed(2))}) er
                  beløbet man indsætter på tidspunkt 0 (dvs. nu)
                </td>
              </tr>
              <tr>
                <th scope="row">Rente</th>
                <td>RENTE</td>
                <td>RATE</td>

                <td>
                  Rentefod pr. termin (her {numberFormat2(rente)}%) angivet som
                  decimaltal eller i procent
                </td>
              </tr>
              <tr>
                <th scope="row">Terminer</th>
                <td>NPER</td>
                <td>NPER</td>

                <td>
                  Anallet af perioder (her {terminer}), hvor der tilskrives
                  rente kaldes for antallet af terminer
                </td>
              </tr>
              <tr>
                <th scope="row">Fremtidsværdi</th>
                <td>FV</td>
                <td>FV</td>

                <td>
                  Fremtidsværdien (her {numberFormat1(fv.toFixed(2))}) af en
                  kapital (nutidsværdien+tilskrevne renter)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>

      {/* <Container className="p-0">
        <div class="p-3 mb-2  bg-white text-white">
          <table class="table bg-warning text-white table-bordered table-hover ">
            <thead>
              <tr>
                <th scope="col">Række</th>
                <th scope="col">Tid</th>
                <th scope="col">NV</th>
                <th scope="col">Rente</th>
                <th scope="col">FV</th>
              </tr>
            </thead>
            <tbody>{ReactHtmlParser(test2)}</tbody>
          </table>
        </div>
      </Container> */}

      {/* <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-white">
          <div class="card h-400 bg-warning text-white">
            <div class="card-body bg-warning text-white">
              <div>
                <h2>Tabel over betalingstrømme</h2>
                <HotTable
                  data={Handsontable.helper.translateRowsToColumns(data1)}
                  colHeaders={colhead}
                  // colHeaders={true}
                  // rowHeaders={true}
                  // stretchH="all"
                  width="100%"
                  className="htRight"
                  licenseKey="non-commercial-and-evaluation"
                />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <Container className="p-3 mb-2 ">
        <HotTable
          data={Handsontable.helper.translateRowsToColumns(data1)}
          colHeaders={colhead}
          // colHeaders={true}
          // rowHeaders={true}
          // width="1120"
          // colWidths="[10,300, 300,300,300,300,300, 300,300,300,300,300]"
          // colWidths="100"
          width="100%"
          // scrollH="auto"
          stretchH="all"
          className="htRight"
          preventOverflow="hidden"
          // fixedRowsTop="1"
          manualColumnResize="100"
          height="320"
          // overflow="hidden"
          licenseKey="non-commercial-and-evaluation"
        />
      </Container>
    </div>
  );
}
