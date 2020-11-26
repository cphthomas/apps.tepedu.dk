import React from "react";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";
import {
  numberFormat1,
  numberFormat2,
  numberFormat3,
  // numberFormat4,
  numberFormat5,
  // numberFormat6,
  numberFormat7,
} from "./lib"; //ændrer til komma og pct + DKK
import Container from "react-bootstrap/Container";
// import ReactHtmlParser from "react-html-parser";
import { Bar } from "react-chartjs-2";
// import { Doughnut } from "react-chartjs-2";
import DropdownButton from "react-bootstrap/DropdownButton";

import Dropdown from "react-bootstrap/Dropdown";

// import MathJax from "react-mathjax2";

import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";



export function invest() {





  var [investering, setinvestering] = useState(+(20000.0).toFixed(2));
  var [rente, setrente] = useState(+(8.25).toFixed(2));
  var [nettobetalinger, setnettobetalinger] = useState(+(5000).toFixed(2));
  var [netto1, setnetto1] = useState(+(5000).toFixed(2));
  var [netto2, setnetto2] = useState(+(4000).toFixed(2));
  var [netto3, setnetto3] = useState(+(3000).toFixed(2));
  var [netto4, setnetto4] = useState(+(6000).toFixed(2));
  var [netto5, setnetto5] = useState(+(3000).toFixed(2));
  var [netto6, setnetto6] = useState(+(5000).toFixed(2));
  var [netto7, setnetto7] = useState(+(4000).toFixed(2));
  var [netto8, setnetto8] = useState(+(3000).toFixed(2));
  var [netto9, setnetto9] = useState(+(6000).toFixed(2));
  var [netto10, setnetto10] = useState(+(3000).toFixed(2));
  var [netto11, setnetto11] = useState(+(5000).toFixed(2));
  var [netto12, setnetto12] = useState(+(4000).toFixed(2));
  var [netto13, setnetto13] = useState(+(3000).toFixed(2));
  var [netto14, setnetto14] = useState(+(6000).toFixed(2));
  var [netto15, setnetto15] = useState(+(3000).toFixed(2));
  var [netto16, setnetto16] = useState(+(5000).toFixed(2));
  var [netto17, setnetto17] = useState(+(4000).toFixed(2));
  var [netto18, setnetto18] = useState(+(3000).toFixed(2));
  var [netto19, setnetto19] = useState(+(6000).toFixed(2));
  var [netto20, setnetto20] = useState(+(3000).toFixed(2));
  var rentedecimal = rente / 100;
  var [år, setår] = useState(+(6));
  var [scrap, setscrap] = useState(+(500.0).toFixed(2));
  var [nettotype, setnettotype] = useState("Konstante nettobetalinger");



  var annSelect = (e) => {
    console.log(e);
    setnettotype(e);
  };

  var fv = investering * (1 + rente / 100) ** år;

  const cf = [...Array(år + 1).keys()];
  const cfnamed = cf.map((n) => "Tid: " + n);

  var cf2 = Array.apply(null, Array(år)).map((_) => "0");
  cf2.splice(0, 0, investering);

  const fvbarchart = Array.apply(null, Array(år + 1)).map((_) => "0");
  fvbarchart.splice(år, 0, fv.toFixed(2));

  const rentecf = cf.map(
    (cf) =>
      -1 *
      (
        investering * (1 + rente / 100) ** cf -
        investering -
        (investering * (1 + rente / 100) ** (cf - 1) - investering)
      ).toFixed(2)
  );
  rentecf.splice(0, 1, 0);
  var rentespreadsheet = cf.map(
    (cf) =>
      -1 *
      (investering * (1 + rente / 100) ** cf -
        investering -
        (investering * (1 + rente / 100) ** (cf - 1) - investering))
  );
  rentespreadsheet.splice(0, 1, 0);




  // ###################################################################################################################

  var renterbc, nettobc, nettobet, formatbs, bs, diskonteredebs, varnetto
  if (nettotype === "Konstante nettobetalinger") {
    renterbc = cf.map((cf) =>
      (nettobetalinger - nettobetalinger * (1 + rentedecimal) ** (-cf)).toFixed(2));

    nettobc = cf.map((cf) =>
      ((nettobetalinger * (1 + rentedecimal) ** -cf)).toFixed(2));
    nettobc.splice(0, 1, 0);
    nettobc.splice(år, 1, ((nettobetalinger + scrap) * (1 + rentedecimal) ** -cf[år]).toFixed(2))

    nettobet = new Array(år).fill(null).map(() => numberFormat3(nettobetalinger))
    nettobet.splice(0, 0, numberFormat3(0));

    formatbs = cf.map((cf) =>
      numberFormat3(nettobetalinger));
    formatbs.splice(0, 1, numberFormat3(-investering));
    formatbs.splice(år, 1, numberFormat3(nettobetalinger + scrap))

    bs = cf.map((cf) =>
      (nettobetalinger));
    bs.splice(0, 1, (-investering));
    bs.splice(år, 1, (nettobetalinger + scrap))

    diskonteredebs = cf.map((cf) =>
      ((nettobetalinger * (1 + rentedecimal) ** -cf)));
    diskonteredebs.splice(0, 1, -investering);
    diskonteredebs.splice(år, 1, (nettobetalinger + scrap) * (1 + rentedecimal) ** -år)
    varnetto = [nettobetalinger, nettobetalinger, nettobetalinger, nettobetalinger,];

  } else {
    varnetto = [0, netto1, netto2, netto3, netto4, netto5, netto6, netto7, netto8, netto9, netto10, netto11, netto12, netto13, netto14, netto15, netto16, netto17, netto18, netto19, netto20];
    varnetto = varnetto.slice(0, år + 1)
    renterbc = cf.map((cf) =>
      (varnetto[cf] - varnetto[cf] * (1 + rentedecimal) ** (-cf)).toFixed(2));

    nettobc = cf.map((cf) =>
      ((varnetto[cf] * (1 + rentedecimal) ** -cf)).toFixed(2));
    nettobc.splice(0, 1, 0);
    nettobc.splice(år, 1, ((varnetto[år] + scrap) * (1 + rentedecimal) ** -cf[år]).toFixed(2))

    nettobet = cf.map((cf) =>
      (varnetto[cf]));

    formatbs = cf.map((cf) =>
      numberFormat3(varnetto[cf]));
    formatbs.splice(0, 1, numberFormat3(-investering));
    formatbs.splice(år, 1, numberFormat3(varnetto[år] + scrap))

    bs = cf.map((cf) =>
      (varnetto[cf]));
    bs.splice(0, 1, (-investering));
    bs.splice(år, 1, (varnetto[år] + scrap))

    diskonteredebs = cf.map((cf) =>
      ((varnetto[cf] * (1 + rentedecimal) ** -cf)));
    diskonteredebs.splice(0, 1, -investering);
    diskonteredebs.splice(år, 1, (varnetto[år] + scrap) * (1 + rentedecimal) ** -år)

  }
  var faktor = cf.map((cf) =>
    numberFormat7((1 + rentedecimal) ** -cf));






  var investbc = new Array(år).fill(null).map(() => (0));
  investbc.splice(0, 0, (-investering));
  // investbc.splice(år, 1, (scrap));

  var formatinvestbc = new Array(år).fill(null).map(() => numberFormat3(0));
  formatinvestbc.splice(0, 0, numberFormat3(-investering));
  formatinvestbc.splice(år, 1, numberFormat3(scrap));








  var formatdiskonteredebs = diskonteredebs.map((diskonteredebs) =>
    numberFormat3(diskonteredebs));

  var akkbs = [];
  bs.reduce(function (a, b, i) { return akkbs[i] = a + b; }, 0);




  var formatakkbs = akkbs.map((akkbs) =>
    numberFormat3(akkbs));

  var akkdiskonteredebs = [];
  diskonteredebs.reduce(function (a, b, i) { return akkdiskonteredebs[i] = a + b; }, 0);
  var tilbagebetalingmkorr = akkdiskonteredebs.reduce((acc, value, i) => value >= 0 ? [...acc, i] : acc, [])[0]
  var tilbagebetalingukorr = akkbs.reduce((acc, value, i) => value >= 0 ? [...acc, i] : acc, [])[0]
  var formatakkdiskonteredebs = akkdiskonteredebs.map((akkdiskonteredebs) =>
    numberFormat3(akkdiskonteredebs));



  const add = (a, b) =>
    +a + +b
  // use reduce to sum our array
  const kapitalværdi = diskonteredebs.reduce(add)




  var data1 = [cf, formatinvestbc, nettobet, formatbs, formatakkbs, faktor, formatdiskonteredebs, formatakkdiskonteredebs];
  var colhead = [
    "Tid",
    "Investering\nScrap",
    "Nettobetalinger",
    "Betalingsstrømme",
    "Akkumulerede\nBetalingsstrømme",
    "Diskonteringsfaktor",

    "Tilbagediskonterede\nBetalingsstrømme",

    "Tilbagediskonterede\nAkkumulerede\nBetalingsstrømme",
  ];



  const databar = {
    labels: cfnamed,
    datasets: [
      {
        label: "Investering",
        backgroundColor: "red",
        stack: "Stack 0",
        hoverBackgroundColor: "darkred",
        data: investbc,
      },
      {
        label: "Nettobetaling diskonteret værdi",
        backgroundColor: "green",
        stack: "Stack 0",
        hoverBackgroundColor: "darkgreen",
        data: nettobc,
      },

      {
        label: "Diskonteringstab",
        backgroundColor: "orange",
        stack: "Stack 0",
        hoverBackgroundColor: "darkorange",
        data: renterbc,
      },
    ],
  };






  function IRR(values, guess) {

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
    if (!positive || !negative) return "Der skal være både positive og negative betalingsstrømme, for at beregne den interne rente";

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
  var internrente = IRR(bs, rente / 100);
  var kapitaltjenesten = ((investering - scrap * (1 + rentedecimal) ** -år) * rentedecimal) / (1 - (1 + rentedecimal) ** -år)
  var tilbagebetalingstiden = ((-Math.log(1 - (investering * rentedecimal) / nettobetalinger)) / Math.log(1 + rentedecimal)).toFixed(2)
  // var tilbagebetalingstidenukorr = (investering / nettobetalinger).toFixed(2)
  var kritiskscrap = (scrap - kapitalværdi * (1 + rentedecimal) ** år).toFixed(2);



  return (
    <div>
      <Container>
        <div class="p-3 mb-2 bg-secondary text-white">
          <h4>Investering.</h4>
        </div>
      </Container>



      <Container className="p-0">
        <div class="row p-3">
          <div class="col-md-12 p-3 ">
            <div class="card h-100">
              <div class="card-body">
                <Container className="p-3">
                  <div class="p-3 mb-2 bg-white">


                    <InputGroup>
                      <Form.Control
                        type="number"
                        value={investering}
                        onChange={(e) => setinvestering(+e.target.value)}
                        aria-describedby="inputGroupAppend"
                        placeholder="0"
                      />
                      <InputGroup.Append>
                        <InputGroup.Text id="inputGroupAppend">
                          Investering
                          </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>


                    <Form.Group>
                      {nettotype === "Konstante nettobetalinger" &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={nettobetalinger}
                            onChange={(e) => setnettobetalinger(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>

                      }
                      {nettotype === "Variable nettobetalinger" &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto1}
                            onChange={(e) => setnetto1(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 1
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>

                      }
                      {nettotype === "Variable nettobetalinger" && år > 1 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto2}
                            onChange={(e) => setnetto2(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 2
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>

                      }
                      {nettotype === "Variable nettobetalinger" && år > 2 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto3}
                            onChange={(e) => setnetto3(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 3
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>

                      }

                      {nettotype === "Variable nettobetalinger" && år > 3 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto4}
                            onChange={(e) => setnetto4(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 4
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 4 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto5}
                            onChange={(e) => setnetto5(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 5
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 5 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto6}
                            onChange={(e) => setnetto6(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 6
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }


                      {nettotype === "Variable nettobetalinger" && år > 6 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto7}
                            onChange={(e) => setnetto7(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 7
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 7 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto8}
                            onChange={(e) => setnetto8(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 8
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 8 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto9}
                            onChange={(e) => setnetto9(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 9
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 9 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto10}
                            onChange={(e) => setnetto10(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 10
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 10 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto11}
                            onChange={(e) => setnetto11(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 11
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }
                      {nettotype === "Variable nettobetalinger" && år > 11 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto12}
                            onChange={(e) => setnetto12(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 12
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 12 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto13}
                            onChange={(e) => setnetto13(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 13
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }
                      {nettotype === "Variable nettobetalinger" && år > 13 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto14}
                            onChange={(e) => setnetto14(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 14
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 14 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto15}
                            onChange={(e) => setnetto15(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 15
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 15 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto16}
                            onChange={(e) => setnetto16(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 16
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }
                      {nettotype === "Variable nettobetalinger" && år > 16 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto17}
                            onChange={(e) => setnetto17(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 17
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 17 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto18}
                            onChange={(e) => setnetto18(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 18
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 18 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto19}
                            onChange={(e) => setnetto19(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 19
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      {nettotype === "Variable nettobetalinger" && år > 19 &&
                        <InputGroup>
                          <Form.Control
                            // size="sm"
                            type="number"
                            value={netto20}
                            onChange={(e) => setnetto20(+e.target.value)}
                            aria-describedby="inputGroupAppend"
                            placeholder="0"
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                              Nettobetaling tid 20
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      }

                      <InputGroup>
                        <Form.Control
                          // size="sm"
                          type="number"
                          value={scrap}
                          onChange={(e) => setscrap(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Scrapværdi
                      </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>


                      <InputGroup>
                        <Form.Control
                          // size="sm"
                          type="number"
                          value={rente}
                          onChange={(e) => setrente(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Kalkulationsrente i %
                      </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <InputGroup input-group-sm>
                        <Form.Control
                          type="number"
                          min="1"
                          max={nettotype === "Variable nettobetalinger" ? "20" : "1000"}
                          value={år}
                          onChange={(e) =>
                            setår(+e.target.value.replace(/\D/, ""))
                          }
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append >
                          <InputGroup.Text id="inputGroupAppend">
                            Antal År
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>















                    </Form.Group>
                    <Form.Group>
                      <DropdownButton
                        alignleft
                        variant="warning"
                        title={nettotype}
                        id="nettotype"
                        // id="dropdown-split-basic"
                        onSelect={annSelect}
                      >

                        <Dropdown.Item eventKey="Konstante nettobetalinger">
                          Vælg konstante nettobetalinger
                          </Dropdown.Item>
                        <Dropdown.Item eventKey="Variable nettobetalinger">
                          Vælg variable nettobetalinger
                          </Dropdown.Item>
                      </DropdownButton>

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
              {nettotype === "Variable nettobetalinger" && <h4>Variable nettobetalinger Kapitalværdi = {numberFormat1(kapitalværdi)} Intern Rente = {numberFormat3(internrente)}%</h4>}
              {nettotype === "Konstante nettobetalinger" && <h4>Konstante nettobetalinger Kapitalværdi = {numberFormat1(kapitalværdi)} Intern Rente = {numberFormat3(internrente)}%</h4>}
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
              <h3>Restgælden over de {år} år</h3>
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
                    <th scope="row">Investering DKK</th>
                    <td>{numberFormat1(investering)}</td>

                    <td>
                      Investeringen på tidspunkt 0 nu er på {numberFormat1(investering)}. Dette er en negativ betalingsstrøm.<br />

                    </td>
                  </tr>



                  <tr>
                    <th scope="row">
                      Nettobetaling DKK


                    </th>

                    <td>{numberFormat1(nettobetalinger)}</td>
                    <td>
                      Nettobetalingen er de som regel positive betalingsstrømme investeringen genererer over tid.
                      Her er der konstante betalingsstrømme.<br></br>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Scrapværdi DKK
                    </th>
                    <td>
                      {numberFormat1(scrap)}
                    </td>
                    <td>
                      Scrapværdien her {numberFormat1(scrap)} angiver værdien af investeringsobjektet ved investeringshorisontens
                      udløb efter {år} år. Scrapværdien kan være både positiv eller negativ, er der fx. bortanskaffelsesomkostninger kan scrapværdien være negativ.

                    </td>
                  </tr>



                  <tr>
                    <th scope="row">
                      Kalkulationsrente i %.
                    </th>
                    <td>
                      {numberFormat3(rente)}%
                    </td>
                    <td>
                      Kalkulationsrenten er her sat til {numberFormat3(rente)}%.
                      <hr></hr>
                      Kalkulationsrenten der fastsættes subjektivt af virksomheden, angiver virksomhedens
                      krav til forrentning af investeringen. Der er mange faktorer der spiller ind i fastsættelsen af Kalkulationsrenten:
                      Hvad koster det for virksomheden af låne, findes alternative investeringsmuligheder,
                      hvor lang er tidshorisonten, hvor risikabel er investeringen, hvor høj er inflationen.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Investeringshorisonten i år
                    </th>
                    <td>{numberFormat3(år)} år</td>

                    <td>
                      Investeringens løbetid er her {numberFormat3(år)} år, det betyder investeringen afvikles
                      og investeringen afhændes til scrapværdien.
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Betalingsstrømme
                    </th>
                    <td> </td>

                    <td>
                      Betalingsstrømmene angiver negative udbetalinger og positive indbetalinger for hvert tidspunkt.
                      <hr></hr>

                      Betalingsstrøm tid 0 er ubetalingen til investeringen = {numberFormat1(-investering)}<br></br>
                      Betalingsstrøm tid 1 er nettobetalingen = {numberFormat1(bs[1])}<br></br>
                      {år > 1 && "Betalingsstrøm tid 2 er nettobetalingen = " + numberFormat1(bs[2])}<br></br>
                      {år > 2 && "Betalingsstrøm tid 3 er nettobetalingen = " + numberFormat1(bs[3])}<br></br>
                      {år > 3 && "..."}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Diskonteringsfaktor
                    </th>
                    <td> </td>

                    <td>
                      Diskonteringsfaktoren angiver det tal man skal gange betalingsstrømmen med for at tilbagediskontere denne til tidspunkt 0 (tidspunktet hvor man foretager investeringen).
                      <hr></hr>
                      Man kan finde diskonteringsfaktoren fx på tidspunkt n ved formlen (1+r)^-n, vi får følgende diskonteringsfaktorer:<br></br>
                      Diskonteringsfaktoren tid 0 = (1+{numberFormat5(rentedecimal)})^-0 = {(faktor[0])}<br></br>
                      Diskonteringsfaktoren tid 1 = (1+{numberFormat5(rentedecimal)})^(-1) = {(faktor[1])}<br></br>
                      {år > 1 && "Diskonteringsfaktoren tid 2 = (1 + " + numberFormat5(rentedecimal) + ")^(-2) = " + faktor[2]}<br></br>
                      {år > 2 && "Diskonteringsfaktoren tid 3 = (1 + " + numberFormat5(rentedecimal) + ")^(-3) = " + faktor[3]}<br></br>
                      {år > 3 && "..."}
                    </td>
                  </tr>


                  <tr>
                    <th scope="row">
                      Tilbagediskonterede betalingsstrømme
                    </th>
                    <td> </td>

                    <td>
                      De tilbagediskonterede betalingsstrømme angiver nutidsværdien af de fremtidige betalingsstrømme, man bestemmer disse ved at gange betalingsstrømmene med diskonteringsfaktoren.
                      <hr></hr>
                      Tilbagediskonteret betalingsstrøm tid 0 = {numberFormat2(-investering)}*1 = {formatdiskonteredebs[0]} DKK<br></br>
                      Tilbagediskonteret betalingsstrøm tid 1 = {numberFormat2(bs[1])}*{faktor[1]} = {formatdiskonteredebs[1]} DKK<br></br>
                      {år > 1 && "Tilbagediskonteret betalingsstrøm tid 2 = " + numberFormat2(bs[2]) + "*" + faktor[2] + " = " + formatdiskonteredebs[2] + " DKK"}<br></br>
                      {år > 2 && "Tilbagediskonteret betalingsstrøm tid 3 = " + numberFormat2(bs[3]) + "*" + faktor[3] + " = " + formatdiskonteredebs[3] + " DKK"}<br></br>
                      {år > 3 && "..."}
                    </td>
                  </tr>




                  <tr>
                    <th scope="row">
                      Kapitalværdi DKK
                    </th>
                    <td>{numberFormat1(kapitalværdi)} </td>

                    <td>
                      Her er kapitalværdien {numberFormat1(kapitalværdi)}
                      {kapitalværdi >= 0 && " ikke negativ, investeringen er derfor lønsom, og bør derfor gennemføres."}{kapitalværdi < 0 && " negativ,  investeringen er således ikke lønsom, og bør derfor ikke gennemføres."}
                      <hr></hr>
                      Kapitalværdien findes som den negative investering plus summen af de tilbagediskonterede betalingsstrømme :<br></br>
                      {(formatdiskonteredebs[0])} + {(formatdiskonteredebs[1])}{år === 2 && " + " + (formatdiskonteredebs[2])}{år > 2 && " + ... + " + formatdiskonteredebs[år]}  = {numberFormat1(kapitalværdi)}


                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Den interne rente
                    </th>
                    <td>{numberFormat3(internrente)}%</td>

                    <td>
                      Hvis de fremtidige betalingsstrømme tilbagediskonteres med den interne rente {numberFormat3(internrente)}%,
                      er summen netop lig med investeringen på {numberFormat1(investering)}.<br></br>
                      Den interne rente er altså den kritiske værdi for kalkulationsrenten. Den interne rente er den rente r der præcis løser ligningen:<br></br>
                      {numberFormat3(investering)} = {nettobet[1] + "*(1+r)^-1"} {år > 1 && " + " + nettobet[2] + "*(1+r)^-2"} {år === 3 && " + " + nettobet[3] + "*(1+r)^-3"}
                      {år > 3 && "... + " + nettobet[år] + "*(1+r)^-" + år}<br></br>
                      Vi kan ikke ved hjælp af algebra løse ligningen explicit når investeringen løber længere end 1 år.
                      Den interne rente kan findes med algoritmer i computerprogrammer, der prøver sig frem med forskellige værdier af den interne rente til de er tæt på den korrekte værdi.
                      I Excel bruges =IA(betalingsstrømme) formlen, der ligeledes er en algoritme.<hr></hr>
                      Vi benytter den interne rentefods metode, når vi sammenligner den interne rente {numberFormat3(internrente)}% med kalkulationsrenten {numberFormat3(rente)}%.
                      Her er den interne rente {numberFormat3(internrente)}%{internrente > rente && " større "}{internrente < rente && " mindre "}end kalkulationsrenten {numberFormat3(rente)}%,
                      derfor er investeringen {internrente < rente && "ikke "}lønsom.



                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Kapitaltjenesten
                    </th>
                    <td>{numberFormat1(kapitaltjenesten)} </td>

                    <td>
                      Kapitaltjenesten {numberFormat1(kapitaltjenesten)} er de nettobetalinger, man mindst skal tjene hvert år, i investeringens levetid for at investeringen, lige præcis bliver lønsom, så kapitalværdien bliver 0.
                    Med andre ord er kapitaltjenesten den kritiske værdi for nettobetalingerne.<hr></hr>
                    Vi kan finde kapitaltjenesten ved hjælp af formlen for ydelsen for et annuitetslån, hvor vi i stedet for hovedstolen,
                    benytter - investeringen + tilbagediskonteret scrapværdi.<br></br>
                    (({(-investering)} + {(scrap)}*(1 + {numberFormat5(rentedecimal)})^(-{år})) *
                    {numberFormat5(rentedecimal)}) / (1 - (1 + {numberFormat5(rentedecimal)})^(-{år})) = {numberFormat1(kapitaltjenesten)}<hr></hr>
                    I Excel kan man benytte formlen for ydelse til at beregne kapitaltjenesten, her sættes nutidværdien NV til -investeringen og fremtidsværdien FV til scrapværdien:<br></br>
                    =YDELSE({numberFormat5(rentedecimal)};{år};{(-investering).toFixed(2).replace(".", ",")};{scrap.toFixed(2).replace(".", ",")})

                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Tilbagebetalingstiden med rentekorrektion
                    </th>
                    <td>{nettotype === "Konstante nettobetalinger" && numberFormat3(tilbagebetalingstiden) + " år"}
                      {nettotype === "Variable nettobetalinger" && tilbagebetalingmkorr <= år && numberFormat3(tilbagebetalingmkorr - akkdiskonteredebs[tilbagebetalingmkorr] / (-akkdiskonteredebs[+tilbagebetalingmkorr - 1] + akkdiskonteredebs[tilbagebetalingmkorr])) + " år."}
                    </td>

                    <td>
                      {nettotype === "Konstante nettobetalinger" && "Tilbagebetalingstiden på " + numberFormat3(tilbagebetalingstiden) +
                        " år, angiver hvor lang tid der går før investeringen har tjent sig hjem, når vi tager højde for kalkulationsrenten. For investor er kort tilbagebetalingstid bedst. Her er scrapværdien ikke medregnet.\nNår vi som her har konstante nettobetalinger kan tilbagebetalingstiden udregnes vha. formlen for antal terminer i annuitetsformlen:\n"
                        + "LOG(1-Investering*rente/nettobetalinger)/LOG(1+rente) =\n" +
                        "LOG(1 - (" + investering.toFixed(2).replace(".", ",") + " * " + numberFormat5(rentedecimal) + ") / " + (nettobetalinger.toFixed(2).replace(".", ",")) + ") / LOG(1 + " + numberFormat5(rentedecimal) + ") = " + numberFormat3(tilbagebetalingstiden) +
                        "år\nI Excel kan man benytte NPER formlen:\n" +
                        "=NPER(" + numberFormat5(rentedecimal) + ";" + nettobetalinger.toFixed(2).replace(".", ",") + ";" + investering.toFixed(2).replace(".", ",") + ")"}
                      {nettotype === "Variable nettobetalinger" && tilbagebetalingmkorr <= år &&
                        "Når vi har variable nettobetalinger, kan vi bestemme tilbagebetalingstiden ved at se på hvornår de tilbagediskonterede akkumulerede betalingstrømme bliver positive. Her ligger tilbagebetalingstiden mellem " +
                        (tilbagebetalingmkorr - 1) + " og " +
                        tilbagebetalingmkorr + " år, hvor de akkumulerede tilbagediskonterede betalingsstrømme går fra " + numberFormat1(akkdiskonteredebs[tilbagebetalingmkorr - 1]) + " til " + numberFormat1(akkdiskonteredebs[tilbagebetalingmkorr]) +
                        "\nVi kan udregne at tilbagebetalingstiden mere præcist til " + numberFormat3(tilbagebetalingmkorr - akkdiskonteredebs[tilbagebetalingmkorr] / (-akkdiskonteredebs[+tilbagebetalingmkorr - 1] + akkdiskonteredebs[tilbagebetalingmkorr])) + " år."
                      }
                      {nettotype === "Variable nettobetalinger" && tilbagebetalingmkorr === undefined &&
                        "Når vi har variable nettobetalinger, kan vi bestemme tilbagebetalingstiden ved at se på hvornår de tilbagediskonterede akkumulerede betalingstrømme bliver positive. Her når de tilbagediskonterede akkumulerede betalingstrømme ikke at blive positive i investeringens løbetid, da de tilbagediskonterede akkumulerede betalingstrømme ved det " +
                        (år) + ". år er " +
                        numberFormat1(kapitalværdi)
                      }

                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Tilbagebetalingstiden uden rentekorrektion
                    </th>
                    <td>
                      {nettotype === "Konstante nettobetalinger" && numberFormat3(investering / nettobetalinger) + " år"}
                      {nettotype === "Variable nettobetalinger" && tilbagebetalingukorr <= år && numberFormat3(tilbagebetalingukorr - akkbs[tilbagebetalingukorr] / (-akkbs[+tilbagebetalingukorr - 1] + akkbs[tilbagebetalingukorr])) + " år."}
                    </td>

                    <td>
                      {nettotype === "Konstante nettobetalinger" && "Tilbagebetalingstiden uden rentekorrektion på " + numberFormat3(investering / nettobetalinger) +
                        " år, angiver hvor lang tid der går før investeringen har tjent sig hjem, når vi ikke tager højde for kalkulationsrenten. Tilbagebetalingstid uden rentekorrektion er ikke så retvisende, da der ikke tages højde for at penge i fremtiden er mindre værd, denne metode benyttes når man nemt og hurtigt skal have et overblik over en investering." +
                        "\nScrapværdien ikke medregnet.\nTilbagebetalingstiden kan udregnes nemt:\nInvestering/nettobetaling = " +
                        numberFormat3(investering) + "/" + numberFormat3(nettobetalinger) + " = " + numberFormat3(investering / nettobetalinger) + " år"}

                      {nettotype === "Variable nettobetalinger" && tilbagebetalingukorr <= år &&
                        "Når vi har variable nettobetalinger, kan vi bestemme tilbagebetalingstiden ved at se på hvornår de tilbagediskonterede akkumulerede betalingstrømme bliver positive. Her ligger tilbagebetalingstiden mellem " +
                        (tilbagebetalingukorr - 1) + " og " +
                        tilbagebetalingukorr + " år, hvor de akkumulerede betalingsstrømme går fra " + numberFormat1(akkbs[tilbagebetalingukorr - 1]) + " til " + numberFormat1(akkbs[tilbagebetalingukorr]) +
                        "\nVi kan udregne at tilbagebetalingstiden mere præcist til " + numberFormat3(tilbagebetalingukorr - akkbs[tilbagebetalingukorr] / (-akkbs[+tilbagebetalingukorr - 1] + akkbs[tilbagebetalingukorr])) + " år."
                      }
                      {nettotype === "Variable nettobetalinger" && tilbagebetalingukorr === undefined &&
                        "Når vi har variable nettobetalinger, kan vi bestemme tilbagebetalingstiden ved at se på hvornår de akkumulerede betalingstrømme bliver positive. Her når de akkumulerede betalingstrømme ikke at blive positive i investeringens løbetid, da de akkumulerede betalingstrømme ved det " +
                        (år) + ". år er " +
                        numberFormat1(akkbs[år])
                      }


                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Kritisk værdi af investeringen
                    </th>
                    <td>{numberFormat1(investering + kapitalværdi)}</td>

                    <td>
                      Kritisk værdi af investeringen er præcis det investeringen skal være, for at vi gennemfører denne.
                    Dvs. investeringen har præcis den størrelse hvor kapitalværdien bliver 0.<br></br>
                    Kritisk værdi af investeringen findes nemt,
                    da både kapitalværdien og investeringen er opgjort på tidspunkt 0,
                    kan man bare lægge investeringen sammen med kapitalværdien:<br></br>
                      {numberFormat3(investering)}{kapitalværdi >= 0 && " + "}{numberFormat3(kapitalværdi)} = {numberFormat1(investering + kapitalværdi)}
                      {kapitalværdi >= 0 && "\nDa investeringen er lønsom må udgiften til investeringen højst være " + numberFormat1(kapitalværdi) + " højere end den nuværende investering på " + numberFormat1(investering)}
                      {kapitalværdi < 0 && "\nDa investeringen er ikke er lønsom skal udgiften til investeringen mindst være " + numberFormat1(kapitalværdi) + " lavere end den nuværende investering på " + numberFormat1(investering)}
                    </td>
                  </tr>



                  <tr>
                    <th scope="row">
                      Kritisk værdi for scrapværdien
                    </th>
                    <td>{numberFormat1(kritiskscrap)}</td>

                    <td>
                      Kritisk værdi for scrapværdien er netop den scrapværdi hvor kapitalværdien bliver 0.<br></br>
                      Man fremskriver først kapitalværdien til år {år} dvs. udløbet af investeringen,
                      hvor investeringsobjektet afhændes. Scrapværdien minus den fremskrevne kapitalværdi giver den kritiske scrapværdi:<br></br>
                      {numberFormat3(scrap)}-{numberFormat3(kapitalværdi)} * (1 + {numberFormat5(rentedecimal)})^{år} = {numberFormat1(kritiskscrap)}<br></br>
                      {kapitalværdi.toFixed(2) < 0 && "Bemærk når vi fratrækker den negative kapitalværdi fra scrapværdien, får man minus og minus, hvilket giver plus."}<br></br>
                      Med Excels formler kan man finde fremtidsværdien af kapitalværdien, og trække denne fra scrapværdien for at få den kritiske scrapværdi.<br></br>
                      = Scrapværdi - FV(Rente;NPER;0;-Kapitalværdi)<br></br>
                      ={scrap.toFixed(2).replace(".", ",")}-FV({rentedecimal.toFixed(6).replace(".", ",")};{år};0;{(-kapitalværdi).toFixed(2).replace(".", ",")})
                      {kapitalværdi.toFixed(2) > 0 && "\nInvesteringen er lønsom, scrapværdien kan højst falde med " + numberFormat1(kapitalværdi * (1 + rentedecimal) ** år) + " fra den nuværende værdi på " + numberFormat1(scrap)}
                      {kapitalværdi.toFixed(2) < 0 && "\nDa investeringen er ikke er lønsom skal scrapværdien mindst være " + numberFormat1((-kapitalværdi) * (1 + rentedecimal) ** år) + " højere end den nuværende scrapværdi på " + numberFormat1(scrap)}

                    </td>
                  </tr>



                  <tr>
                    <th scope="row">
                      Nutidsværdien af uendelige nettobetalinger
                    </th>
                    <td>
                      {nettotype === "Konstante nettobetalinger" && numberFormat1(nettobetalinger / rentedecimal)}

                    </td>

                    <td>
                      {nettotype === "Konstante nettobetalinger" && "Hvis man har en investering med uendelig tidshorisont, vil de konstante nettobetalinger udgøre en uendelig betalingsstrøm. Man kan let beregne nutidsværdien af uendelige nettobetalinger som:\nNettobetaling/rente = " +
                        nettobetalinger.toFixed(2).replace(".", ",") + "/" + numberFormat5(rentedecimal) + " = " + numberFormat1(nettobetalinger / rentedecimal) +
                        "\nBemærk i denne sum er investering og scrapværdi ikke medregnet."}
                      {nettotype === "Variable nettobetalinger" && "Da vi har variable nettobetalinger, kan vi ikke beregne nutidsværdien af uendelige nettobetalinger."}
                    </td>
                  </tr>
                </span>
              </tbody>
            </small>
          </table>
        </div>
      </Container>

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
      {/* <Container className="p-0">
        <div class="row p-3">
          <div class="col-md-3 p-3 container-fluid">
            <div class="card h-100">
              <div class="card-body bg-white">
                <h3>Provenue og renter</h3>
                <div>
                  <Doughnut
                    data={datadoug}
                    height={400}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
                {/* </ResponsiveContainer> */}
      {/* </div>
            </div>
          </div>
        </div>
      </Container > */}
    </div >
  );
}
