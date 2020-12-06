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
  numberFormat0,
  numberFormat1,
  numberFormat2,
  numberFormat3,
  numberFormat4,
  numberFormat5,
} from "./lib"; //ændrer til komma og pct + DKK
import Container from "react-bootstrap/Container";
// import ReactHtmlParser from "react-html-parser";
// import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

// import MathJax from "react-mathjax2";

import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";

// import "katex/dist/katex.min.css";
// import { BlockMath } from "react-katex";
// import { InlineMath } from "react-katex";
import DropdownButton from "react-bootstrap/DropdownButton";

import Dropdown from "react-bootstrap/Dropdown";

export function rente() {

  var [type, settype] = useState("Fremtidsværdi");
  var handleSelect = (e) => {
    console.log(e);
    settype(e);
  };

  var [rente, setrente] = useState(+(1.25).toFixed(2));
  var rentecalc = rente;
  var [nper, setnper] = useState(+(10.0).toFixed(2));
  var npercalc = nper;
  var [fv, setfv] = useState(+(120.0).toFixed(2))
  var fvcalc = fv;
  var [nv, setnv] = useState(+(100.0).toFixed(2))
  var nvcalc = nv;
  var [prår, setprår] = useState("1 helårlig termin");
  var handleSelect2 = (e) => {
    console.log(e);
    setprår(e);
  };
  var terminerår = prår.slice(0, 2);

  if (type === "Nutidsværdi") {
    nvcalc = fv * (1 + rente / 100) ** -nper
  }
  if (type === "Fremtidsværdi") {
    fvcalc = nv * (1 + rente / 100) ** nper;
  }


  function IRR(values, guess) {
    // Credits: algorithm inspired by Apache OpenOffice
    // Calculates the resulting amount
    var irrResult = function (values, dates, rate) {
      var r = rate + 1;
      var result = values[0];
      for (var i = 1; i < values.length; i++) {
        result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
      }
      return result;
    };

    // Calculates the first derivation
    var irrResultDeriv = function (values, dates, rate) {
      var r = rate + 1;
      var result = 0;
      for (var i = 1; i < values.length; i++) {
        var frac = (dates[i] - dates[0]) / 365;
        result -= (frac * values[i]) / Math.pow(r, frac + 1);
      }
      return result;
    };

    // Initialize dates and check that values contains at least one positive value and one negative value
    var dates = [];
    var positive = false;
    var negative = false;
    for (var i = 0; i < values.length; i++) {
      dates[i] = i === 0 ? 0 : dates[i - 1] + 365;
      if (values[i] > 0) positive = true;
      if (values[i] < 0) negative = true;
    }

    // Return error if values does not contain at least one positive value and one negative value
    if (!positive || !negative) return "#NUM!";

    // Initialize guess and resultRate
    guess = typeof guess === "undefined" ? 0.1 : guess;
    var resultRate = guess;

    // Set maximum epsilon for end of iteration
    var epsMax = 1e-10;

    // Set maximum number of iterations
    var iterMax = 50;

    // Implement Newton's method
    var newRate, epsRate, resultValue;
    var iteration = 0;
    var contLoop = true;
    do {
      resultValue = irrResult(values, dates, resultRate);
      newRate =
        resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
      epsRate = Math.abs(newRate - resultRate);
      resultRate = newRate;
      contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
    } while (contLoop && ++iteration < iterMax);

    if (contLoop) return "#NUM!";

    // Return internal rate of return
    return resultRate * 100;
  }


  if (type === "Rente") {
    var cf3 = Array.apply(null, Array(nper)).map((_) => 0);
    cf3.splice(0, 0, -1 * nv);
    cf3.splice(nper, 1, fv);
    rentecalc = IRR(cf3, rente / 100);
  }

  var åop = ((1 + rentecalc / 100) ** terminerår - 1) * 100

  if (type === "Terminer") {
    npercalc = Math.log(fv / nv) / Math.log(1 + rente / 100);
  }



  // var nperår = type.slice(0, 2);

  if (type !== "Terminer") {

    const cf = [...Array(nper + 1).keys()];
    const cfnamed = cf.map((n) => "Tid: " + n);

    var cf2 = Array.apply(null, Array(nper)).map((_) => "0");
    cf2.splice(0, 0, (-1 * nvcalc).toFixed(2));



    var nvspreadsheet = Array.apply(null, Array(nper)).map((_) =>
      numberFormat3(0)
    );
    nvspreadsheet.splice(0, 0, numberFormat3(-1 * nvcalc));

    const fvbarchart = Array.apply(null, Array(nper + 1)).map((_) => "0");
    fvbarchart.splice(nper, 0, fvcalc.toFixed(2));

    const fvspreadsheet = Array.apply(null, Array(nper + 1)).map((_) =>
      numberFormat3(0)
    );
    fvspreadsheet.splice(nper, 1, numberFormat3(fvcalc));

    // const cf3 = cf;
    const rentecf = cf.map(
      (cf) =>
        -1 *
        (
          nvcalc * (1 + rentecalc / 100) ** cf -
          nvcalc -
          (nvcalc * (1 + rentecalc / 100) ** (cf - 1) - nvcalc)
        ).toFixed(2)
    );
    rentecf.splice(0, 1, 0);
    var rentespreadsheet = cf.map(
      (cf) =>
        -1 *
        (nvcalc * (1 + rentecalc / 100) ** cf -
          nvcalc -
          (nvcalc * (1 + rentecalc / 100) ** (cf - 1) - nvcalc))
    );
    rentespreadsheet.splice(0, 1, 0);

    const akkumcsfunk = ((sum) => (value) => numberFormat3((sum += value)))(-nvcalc);
    // Smart funktion der akkumulerer en array
    var akkumsum = rentespreadsheet.map(akkumcsfunk);
    rentespreadsheet = rentespreadsheet.map((rentespreadsheet) =>
      numberFormat3(rentespreadsheet)
    );

    var data1 = [cf, nvspreadsheet, rentespreadsheet, akkumsum, fvspreadsheet];
    var colhead = [
      "Tid",
      "NV DKK",
      "Renter DKK",
      "Saldo DKK",
      "FV DKK",
    ];




    // var data2 = [["=FV(1.25%;10;0;-100)"]];

    // const datadoug = {
    //   labels: [
    //     "nv ".concat(numberFormat1(nv.toFixed(2))),
    //     "Rente ".concat(numberFormat1((fv - nv).toFixed(2))),
    //   ],
    //   datasets: [
    //     {
    //       label: "fv i DKK {FV}",
    //       backgroundColor: ["red", "orange"],
    //       hoverBackgroundColor: ["darkred", "darkorange"],
    //       data: [+nv.toFixed(2), +(fv - nv).toFixed(2)],
    //     },
    //   ],
    // };

    var databar = {
      labels: cfnamed,
      datasets: [
        {
          label: "nv",
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
          label: "fv",
          backgroundColor: "grey",
          stack: "Stack 0",
          hoverBackgroundColor: "darkgrey",
          data: fvbarchart,
        },
      ],
    };
  };
  return (
    <div>
      <Container>
        <div class="p-3 mb-2 bg-secondary text-white">
          <h4>
            {type === "Fremtidsværdi" && "Fremtidsværdi af kapital"}
            {type === "Nutidsværdi" && "Nutidsværdi af kapital"}
            {type === "Terminer" && "Antal terminer"}
            {type === "Rente" && "Find rente"}

          </h4>


        </div>
      </Container>
      <Container className="p-0">
        <div class="row p-3">
          <div class="col-md-12 p-3 ">
            <div class="card h-100">
              <div class="card-body">
                <Container className="p-3">
                  <div class="p-3 mb-2 bg-white">


                    {/* <Form.Group> */}
                    {type !== "Rente" &&
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
                            Terminsrente %
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    }


                    {type !== "Nutidsværdi" &&
                      <InputGroup>
                        <Form.Control
                          type="number"
                          value={+nv}
                          onChange={(e) => setnv(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Nutidsværdi DKK.
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    }


                    {type !== "Fremtidsværdi" &&
                      <InputGroup>
                        <Form.Control
                          type="number"
                          value={+fv}
                          onChange={(e) => setfv(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Fremtidsværdi DKK.
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    }

                    {type !== "Terminer" &&
                      <InputGroup>
                        <Form.Control
                          type="number"
                          min="1"
                          step={1}
                          precision={0}
                          mobile={true}
                          value={nper}
                          onChange={(e) =>
                            setnper(+e.target.value.replace(/\D/, ""))
                          }
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Antal terminer
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    }

                    <br />
                    <Form.Group>
                      <DropdownButton
                        // size="sm"
                        alignleft
                        variant="warning"
                        title={type}
                        id="dropdown-align-left"
                        // id="dropdown-split-basic"
                        onSelect={handleSelect}
                      >
                        <Dropdown.Item eventKey="Fremtidsværdi">
                          Find fremtidsværdi
                          </Dropdown.Item>
                        <Dropdown.Item eventKey="Nutidsværdi">
                          Find nutidsværdi
                          </Dropdown.Item>
                        <Dropdown.Item eventKey="Terminer">
                          Find antal terminer
                          </Dropdown.Item>
                        {/* <Dropdown.Divider /> */}
                        <Dropdown.Item eventKey="Rente">
                          Find rente
                          </Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>


                    <Form.Group>
                      <DropdownButton
                        // size="sm"
                        alignleft
                        variant="warning"
                        title={prår}
                        id="dropdown-align-left"
                        // id="dropdown-split-basic"
                        onSelect={handleSelect2}
                      >
                        <Dropdown.Item eventKey="1 helårlig termin">
                          Vælg 1 helårlig termin
                          </Dropdown.Item>
                        <Dropdown.Item eventKey="2 halvårlige terminer">
                          Vælg 2 halvårlige terminer
                          </Dropdown.Item>
                        <Dropdown.Item eventKey="4 kvartalsvise terminer">
                          Vælg 4 kvartalsvise terminer
                          </Dropdown.Item>
                        {/* <Dropdown.Divider /> */}
                        <Dropdown.Item eventKey="12 månedlige terminer">
                          Vælg 12 månedlige terminer
                          </Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>

                    {/* </Form.Group> */}
                  </div>
                </Container>
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* <Container className="p-0">
        <div class="col-md-6 p-3 container-fluid">
          <div class="card h-100">
            <div class="card-body bg-white">
              <h5>fv {numberFormat1(fv)}</h5>
              <div>
                <Doughnut
                  data={datadoug}
                  height={400}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      {type !== "Terminer" &&
        <Container className="p-0">
          <div class="p-3 mb-2 bg-white text-black">
            <div class="card">
              <div class="card-body">
                <h4>
                  {type === "Fremtidsværdi" && "Fremtidsværdien bliver " + numberFormat1(fvcalc) + " efter de " + npercalc + " terminer. ÅOP er " + numberFormat4(åop) + "%."}
                  {type === "Nutidsværdi" && "Nutidsværdien bliver " + numberFormat1(nvcalc) + ". ÅOP er " + numberFormat4(åop) + "%."}
                  {type === "Rente" && "Renten pr. termin " + numberFormat4(rentecalc) + "%. ÅOP er " + numberFormat4(åop) + "%."}
                </h4>
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
      }
      <Container className="p-0">
        <div class="row p-3">



        </div>
      </Container>
      <Container className="p-0">
        <div class="container">
          <table class="table table-bordered table-responsive table-white table-hover table-striped ">
            <small>
              <span class="align-top">

                <tbody>
                  <tr>

                    <td><big><b>DK navn</b></big></td>
                    <td><big><b>US navn</b></big></td>
                    <td><big><b>Værdi</b></big></td>
                    <td><big><b>Forklaring</b></big></td>

                  </tr>

                  <tr>
                    <td>NV</td>
                    <td>PV</td>
                    <td>{numberFormat1(nv)}</td>

                    <td>
                      {type !== "Nutidsværdi" && "Nutidsværdien " + numberFormat1(nvcalc) + " er beløbet man låner (positivt) eller, som her indsætter (negativt) på tidspunkt 0 (dvs. nu)"}
                      {type === "Nutidsværdi" && "Nutidsværdien " + numberFormat1(nv) + " er beløbet man låner (positivt) eller, som her indsætter (negativt) på tidspunkt 0 (dvs. nu).\n" +
                        "Vi kan bestemme nutidsværiden ved hjælp af formlen:\n" +
                        "NV = FV*(1 + Rente)^(-NPER) = " + numberFormat3(fv) + "*(1 +" + numberFormat5(rentecalc / 100) + ")^(-" + npercalc + ") = " + numberFormat1(nvcalc) +
                        "\nI Excel kan man benytte formlen =NV(rente;nper;ydelse;fv) for nutidsværdi:\n" +
                        "=NV(" + numberFormat5(rentecalc / 100) + ";" + npercalc + ";" + 0 + ";" + numberFormat5(fvcalc) + ")"
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>RENTE</td>
                    <td>RATE</td>
                    <td>{numberFormat2(rentecalc)}%</td>

                    <td>

                      {type !== "Rente" && "Rentefod pr. termin er " + numberFormat2(rentecalc) + "% eller " + numberFormat5(rentecalc / 100) + ", angivet i procent eller som decimaltal, er forrentingen der gør at NV vokser til FV over de " +
                        numberFormat0(npercalc) + " terminer."
                      }

                      {type === "Rente" && "Renten pr. termin " + numberFormat3(rentecalc) + "%, er forrentingen der gør at NV vokser til FV over de " +
                        numberFormat0(npercalc) + " terminer." +
                        " Vi kan ikke bestemme renten eksplicit ved hjælp af en formel, men computere kan vha. algoritmer bestemme renten. I Excel kan " +
                        "formlen =IA(Betalingsstrømme) benyttes."


                      }
                    </td>
                  </tr>
                  <tr>
                    <td>NPER</td>
                    <td>NPER</td>
                    <td>{numberFormat0(npercalc)} terminer</td>

                    <td>
                      {type !== "Terminer" && "Der er " + npercalc +
                        " perioder, hvor der tilskrives rente, disse kaldes for antallet af terminer."}

                      {type === "Terminer" && "Antallet af terminer " + numberFormat3(npercalc) + ", bestemmes vha. nutidsværdien = " + numberFormat1(nvcalc) + ", fremtidsværdien = " + numberFormat1(fvcalc) + " og renten " + numberFormat3(rentecalc) + "%, ud fra følgende formel:\n" +
                        "NPER = log(FV/NV)/log(1+RENTE) = log(" + numberFormat3(fvcalc) + "/" + numberFormat3(nvcalc) + ")/log(1 + " + numberFormat3(rentecalc) + "%) = " + numberFormat3(npercalc) + " terminer." +
                        "\nI Excel kan man benytte formlen =NPER(rente;ydelse;nv;fv) til at bestemme antallet af terminer:\n" +
                        "=NPER(" + numberFormat5(rentecalc) + "%;0;" + numberFormat3(-nvcalc) + ";" + numberFormat3(fvcalc) + ")\n" +
                        "Det vil sige at efter " + numberFormat3(npercalc) + " terminer, er NV vokset til FV = " + numberFormat1(fvcalc) + "."

                      }
                    </td>
                  </tr>
                  <tr>
                    <td>FV</td>
                    <td>FV</td>
                    <td>{numberFormat1(fvcalc)}</td>

                    <td>
                      {type === "Fremtidsværdi" && "Fremtidsværdien FV er " + numberFormat1(fvcalc) + " af en kapital, dette er værdien af indestående NV tilskrevet renters rente, efter " +
                        numberFormat0(npercalc) + " terminers rentetilskrivning." +
                        " Vi finder fremtidsværdien, ved at tilskrive terminsrenten til nutidsværdien over de " + numberFormat0(npercalc) + " terminer.\n" +
                        "FV = NV*(1+Rente)^NPER = " + numberFormat3(nvcalc) + "*(1 + " + numberFormat3(rentecalc) + "%)^" + numberFormat0(npercalc) + " = " +
                        numberFormat1(fvcalc) +
                        "\nI Excel kan man benytte formlen =FV(rente;nper;ydelse;nv) for fremtidsværdien:\n" +
                        "=FV(" + numberFormat3(rentecalc) + "%;" + nper + ";" + 0 + ";" + numberFormat5(nv) + ")"

                      }
                      {type !== "Fremtidsværdi" && "Fremtidsværdien FV er " + numberFormat1(fvcalc) + " af en kapital, dette er værdien af indestående NV efter " +
                        numberFormat0(npercalc) + " terminer."
                      }

                    </td>
                  </tr>

                  <tr>
                    <td>ÅOP</td>
                    <td>APRC</td>
                    <td>{numberFormat3(åop)}%</td>

                    <td>
                      {terminerår === "1 " && "Da der kun er 1 rentetilskrivning pr. år er en termin 1 år, derfor bliver ÅOP " + numberFormat3(åop) + "%, dvs. det samme som terminsrenten."
                      }
                      {terminerår !== "1 " && "Da der er  " + terminerår + " terminer pr. tilskrives terminsrenten " + numberFormat3(rentecalc) + "% " + terminerår +
                        " gange om året. Vi skal bestemme hvad renten pr. år bliver, når der tages højde for renters rente. Dette kan vi gøre ved at finde ud af hvad 1 kr. vokser til på et år og så trække kronen fra igen så ved vi hvad ÅOP er:\n" +
                        "(1 + terminsrente)^(terminer pr. år) -1 = (1 + " + numberFormat3(rentecalc) + "%)^" + terminerår + " - 1 = " + numberFormat5(åop / 100) + " = " + numberFormat3(åop) + "%\n" +
                        "Den engelske betegnelse APRC betyder annual percentage rate of charge."
                      }

                    </td>
                  </tr>


                </tbody>

              </span>
            </small>
          </table>
        </div>
      </Container>


      {type !== "Terminer" &&
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
      }
    </div>
  );
}
