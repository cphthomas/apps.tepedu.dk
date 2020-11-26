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
  numberFormat1,
  numberFormat2,
  numberFormat3,
  // numberFormat4,
  numberFormat5,
  numberFormat6,
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

// import "katex/dist/katex.min.css";
// import { BlockMath } from "react-katex";
// import { InlineMath } from "react-katex";

export function staaende() {
  const [hovedstol, sethovedstol] = useState(+(20000.0).toFixed(2));
  var [rente, setrente] = useState(+(1.25).toFixed(2));
  var rentedecimal = rente / 100;
  const [terminer, setterminer] = useState(+(10.0).toFixed(2));
  const [stiftelse, setstiftelse] = useState(+(0.0).toFixed(2));
  const [kurs, setkurs] = useState(+(100.0).toFixed(2));
  const [skat, setskat] = useState(+(22.0).toFixed(2));
  const [prår, setprår] = useState("1 helårlig termin");
  const handleSelect = (e) => {
    console.log(e);
    setprår(e);
  };
  var terminerår = prår.slice(0, 2);
  var fv = hovedstol * (1 + rente / 100) ** terminer;
  const cf = [...Array(terminer + 1).keys()];
  const cfnamed = cf.map((n) => "Tid: " + n);

  var cf2 = Array.apply(null, Array(terminer)).map((_) => "0");
  cf2.splice(0, 0, hovedstol);

  const fvbarchart = Array.apply(null, Array(terminer + 1)).map((_) => "0");
  fvbarchart.splice(terminer, 0, fv.toFixed(2));

  var restgæld = cf.map((cf) =>
    Math.abs(
      hovedstol
    )
  );
  restgæld.splice(terminer, 1, 0);
  var rentespreadsheet = cf.map(
    (cf) =>
      -1 *
      (hovedstol * (1 + rente / 100) ** cf -
        hovedstol -
        (hovedstol * (1 + rente / 100) ** (cf - 1) - hovedstol))
  );
  rentespreadsheet.splice(0, 1, 0);
  var provenue = (hovedstol * kurs) / 100 - stiftelse;

  var ydelse, bsss, bs;


  ydelse =
    hovedstol * rentedecimal;

  bs = restgæld.map((restgæld) =>
    +ydelse);
  bs.splice(0, 0, -provenue);
  bs.splice(terminer, 1, +hovedstol + ydelse);
  bs.pop();

  var bss = restgæld.map((restgæld) =>
  +ydelse  * (1 - skat / 100));
  bss.splice(0, 0, -provenue);
  bss.splice(terminer, 1, +hovedstol + ydelse*(1 - skat / 100));
  bss.pop();
  

  bsss = bs.map((bs) => numberFormat3(-bs));



  
  var ydelse1 = bs.map((bs) => bs);
  ydelse1.splice(0, 1, 0);



  const restgældss = restgæld.map((restgæld) => numberFormat3(restgæld));
  const restgældbc = restgæld.map((restgæld) => restgæld.toFixed(2));

  var renterss = restgæld.map((restgæld) => restgæld * rentedecimal);
  renterss.pop();
  renterss.splice(0, 0, 0);

  var rentersss = restgæld.map((restgæld) => numberFormat3(restgæld * rentedecimal * (1 - skat / 100)));
  rentersss.pop();
  rentersss.splice(0, 0, 0);


  var sss = restgæld.map((restgæld) => numberFormat3(-restgæld * rentedecimal * (skat / 100)));
  sss.pop();
  sss.splice(0, 0, 0);


  var bssss = restgæld.map((restgæld) =>
    restgæld * rentedecimal * (1 - skat / 100)
  )
  // bs = new Array(terminer).fill(null).map(() => 1999);
  bssss.splice(0, 0, -provenue);
  bssss.splice(terminer, 1, hovedstol + ydelse * (1 - skat / 100));
  bssss.pop();
  bssss = bssss.map((bssss) => numberFormat3(-1 * bssss));
  //const afdragss = ydelsess + renterss;
  //ydelseparsefloat =parseFloatydelsess.splice(0, 1, numberFormat3(0));
  //var afdragss = afdragss.map((ydelsess, renterss) => ydelsess - renterss); 

  //varable til ss spreadsheet
  var afdragss = ydelse1.map((e, i) => e - renterss[i]);
  var ydelsess = ydelse1.map((ydelse1) => numberFormat3(ydelse1));
  renterss = renterss.map((renterss) => numberFormat3(renterss));

  afdragss = afdragss.map((afdragss) => numberFormat3(afdragss));
  // variable til bc barchart
  var renterbc = restgæld.map((restgæld) =>
    (-restgæld * rentedecimal).toFixed(2)
  );
  renterbc.pop();
  renterbc.splice(0, 0, Number(0));

  // var renterbcs = restgæld.map((restgæld) =>
  //   (-restgæld * rentedecimal * (1 - skat / 100)).toFixed(2)
  // );
  // renterbcs.pop();
  // renterbcs.splice(0, 0, Number(0));

  var ydelsebc = ydelse1.map((ydelse1) => -ydelse1);
  var afdragbc = ydelsebc.map((e, i) =>
    parseFloat(e * 1 - renterbc[i]).toFixed(2)
  );
  let provenuebc = new Array(terminer).fill(null).map(() => 0);
  provenuebc.splice(0, 0, provenue);

  // const sumfunktion = (arr) => arr.reduce((a, b) => a + b, 0);
  // var sumrestgæld = (sumfunktion(restgæld) * rentedecimal).toFixed(2);
  var data1 = [cf, afdragss, renterss, sss, rentersss, ydelsess, restgældss, bsss, bssss];
  var colhead = [
    "Tid",
    "Afdrag\n DKK",
    "Renter\n DKK",
    "Skat\n DKK",
    "Renter\n - skat DKK",
    "Ydelse\n DKK",
    "Restgæld\n DKK",
    "Betalingsstrømme\n DKK",
    "Betalingsstrømme\n - skat DKK",





  ];

  

  const databar = {
    labels: cfnamed,
    datasets: [
      {
        label: "Provenue",
        backgroundColor: "green",
        stack: "Stack 0",
        hoverBackgroundColor: "darkgreen",
        data: provenuebc,
      },
      {
        label: "Afdrag",
        backgroundColor: "red",
        stack: "Stack 0",
        hoverBackgroundColor: "darkred",
        data: afdragbc,
      },

      {
        label: "Rente",
        backgroundColor: "orange",
        stack: "Stack 0",
        hoverBackgroundColor: "darkorange",
        data: renterbc,
      },
    ],
  };

  const databar2 = {
    labels: cfnamed,
    datasets: [
      {
        label: "Restgæld",
        backgroundColor: "green",
        stack: "Stack 0",
        hoverBackgroundColor: "darkgreen",
        data: restgældbc,
      },
    ],
  };

  //VIGTIG til investering ###########################
  // const NPV = (cashflow, discountRate) =>
  //   cashflow.reduce(
  //     (acc, val, i) => acc + val / Math.pow(1 + discountRate, i),
  //     0
  //   );

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
  var renteeffektiv = IRR(bs,rente/100);
  var renteeffektivskat = IRR(bss,rente/100);

  var åop = (Math.pow(1 + renteeffektiv / 100, terminerår) - 1) * 100;

  if (terminerår < 2) {
    var prårtekst = "Der er ".concat(
      prår,
      ", den nominelle rente pr. termin er ",
      numberFormat3(rente),
      "%. Helårlig rentetilskrivning betyder den nominelle rente pr. år (nominel rente pr. termin gange 1) bliver det samme altså: ",
      numberFormat3(rente),
      "% p.a."
    );
  } else {
    prårtekst = "Der er ".concat(
      prår,
      ", den nominelle rente pr. termin er ",
      rente,
      "%, det betyder den nominelle rente pr. år (nominel rente pr. termin gange ",
      terminerår,
      ") bliver: ",
      rente * terminerår,
      "%"
    );
  }
  var stiftelsetekst;
  if (stiftelse !== 0) {
    stiftelsetekst = "Der er stiftelsesomkostninger på ".concat(
      numberFormat1(stiftelse),
      ", stiftelsesomkostningerne er omkostninger banken tager for låneadministration. Stiftelsesomkostningerne betyder at den effektive rente pr termin og ÅOP bliver højere end den nominelle rente."
    );
  } else {
    stiftelsetekst =
      "Der er ingen stiftelsesomkostninger, derfor belastes ÅOP ikke af et lavere provenue, stiftelsesomkostningerne er omkostninger banken tager for låneadministration. Stiftelsesomkostningerne betyder at den effektive rente pr termin og ÅOP bliver højere end den nominelle rente.";
  }

  return (
    <div>
      <Container>
        <div class="p-3 mb-2 bg-secondary text-white">

          <h4>Stående lån.</h4>
          
          
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
                          value={rente}
                          onChange={(e) => setrente(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Rente nominel pr. termin i %
                      </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <InputGroup input-group-sm>
                        <Form.Control
                          type="number"
                          min="1"
                          value={terminer}
                          onChange={(e) =>
                            setterminer(+e.target.value.replace(/\D/, ""))
                          }
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append >
                          <InputGroup.Text id="inputGroupAppend">
                            Terminer totalt
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <InputGroup>
                        <Form.Control
                          type="number"
                          value={hovedstol}
                          onChange={(e) => sethovedstol(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Hovedstol DKK.
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <InputGroup>
                        <Form.Control
                          type="number"
                          value={+stiftelse}
                          onChange={(e) => setstiftelse(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Stiftelsesomkostninger i DKK.
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>




                      <InputGroup>
                        <Form.Control
                          type="number"
                          min="1"
                          // max="100"
                          step={1}
                          precision={0}
                          mobile={true}
                          value={kurs}
                          onChange={(e) =>
                            setkurs(+e.target.value.replace(/\D/, ""))
                          }
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Kurs på lånet
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          value={+skat}
                          onChange={(e) => setskat(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Skat i %
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <br />
                      
                        <DropdownButton
                          // size="sm"
                          alignleft
                          variant="warning"
                          title={prår}
                          id="dropdown-align-left"
                          // id="dropdown-split-basic"
                          onSelect={handleSelect}
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
              <h3>Afdraget er {numberFormat1(0)} over de {terminer} terminer</h3>

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
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <h3>Restgælden ultimo over de {terminer} terminer</h3>
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
                    <th>Variabel</th>
                    <th>Værdi</th>
                    <th>Forklaring</th>
                  </tr>

                  <tr>
                    <th scope="row">Afdrag</th>
                    <td>{numberFormat1(0)}</td>
                    <td>
                      Ved et stående lån afdrages ikke gennem lånets løbetid så er afdragene lig med 0 DKK.
                      Først ved lånets udløb efter de {terminer} terminer, tilbagebetales hele hovedstolen på {numberFormat1(hovedstol)}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Restgæld</th>
                    <td>{numberFormat1(hovedstol)}</td>
                    <td>
                      Ved et stående lån afdrages ikke gennem lånets løbetid så restgæld primo er {numberFormat1(hovedstol)} ved alle terminer.
                    Restgæld ultimo tid {terminer} bliver så {numberFormat1(0)}, når sidste ydelse er betalt.

                    </td>
                  </tr>





                  <tr>
                    <th scope="row">Rente DKK</th>
                    <td>{numberFormat1(hovedstol * rentedecimal)}</td>
                    <td>
                      Ved stående lån kan renten ved alle terminer, beregnes som hovedstolen gange den nominelle terminsrente::
                      <br />
                      Rente = hovedstol * terminsrente nominel = {numberFormat3(hovedstol)} * {numberFormat5(rentedecimal)}  = {numberFormat1(hovedstol * rentedecimal)}

                    </td>
                  </tr>


                  <tr>
                    <th scope="row">Skat DKK</th>
                    <td>{numberFormat1(hovedstol * rentedecimal * skat / 100)}</td>
                    <td>
                      Ved stående lån kan skattebesparelsen i DKK beregnes som renten i DKK gange skatteprocenten, da renteudgifter kan fratrækkes i skat:
                      <br />
                      Skat  = Rente  * skatteprocenten = {numberFormat3(hovedstol * rentedecimal)} * {numberFormat3(skat / 100)} = {numberFormat1(hovedstol * rentedecimal * skat / 100)}

                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Ydelse</th>
                    <td>{numberFormat1(hovedstol * rentedecimal)}</td>
                    <td>
                      Ved stående lån består ydelsen kun af renter de første n-1 terminer.
                      Her er ydelsen de første {terminer - 1} terminer {numberFormat1(hovedstol * rentedecimal)}.<br></br>
                      Den sidste termin, her termin nummer {terminer} består ydelsen af rente og hele hovedstolen, så ydelsen bliver {numberFormat1(hovedstol * rentedecimal + hovedstol)}
                    </td>
                  </tr>




                  <tr>
                    <th scope="row">
                      Hovedstol
                     
               
                    </th>
                    <td>{numberFormat1(hovedstol)}</td>

                    <td>
                      hovedstolen er beløbet man låner på papiret på tidspunkt
                      0 (dvs. nu)
                    </td>
                  </tr>


                  <tr>
                    <th scope="row">Rente pr. termin nominel</th>
                    <td>{numberFormat3(rente)}%</td>

                    <td>
                      Nominel pålydende, rente, her angivet i procent. Hvis den
                      nominelle rente er angivet pr år (pro anno), kan den
                      nominelle terminsrente findes ved at dividere pro anno
                      renten med antal terminer pr. år.
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Terminer pr. år</th>
                    <td>{terminerår}</td>

                    <td>{prårtekst}</td>
                  </tr>

                  <tr>
                    <th scope="row">Terminer</th>
                    <td>{terminer}</td>

                    <td>
                      Det totale antal af perioder (her {terminer}), hvor der
                      tilskrives rente kaldes for antallet af terminer.
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Stiftelse</th>
                    <td>{numberFormat1(stiftelse)}</td>


                    <td>{stiftelsetekst}</td>
                  </tr>

                  <tr>
                    <th scope="row">Kurs</th>
                    <td>{kurs}</td>

                    <td>
                      Kursen angiver hvor meget lånet er værd, er kursen under
                      100 vil der være et kurstab. Er der kurstab, betyder dette
                      at den effektive rente pr termin og ÅOP bliver højere end
                      den nominelle rente. Kursen fastsættes ud fra markedets
                      prissætning af lånet, hvilket fx. afhænger af debitors
                      kreditværdighed, renten på alternative investeringer samt
                      øvrige makroøkonomiske faktorer.
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Provenue</th>
                    <td>{numberFormat1(provenue)}</td>

                    <td>
                      Provenuet er det beløb man får udbetalt, dvs. hovedstolen
                      efter kurstab og stiftelsesomkostninger. Provenuet kan
                      findes som:

                      {"\nProvenue = PV*Kurs/100-Stiftelsesomkostninger =\n" +
                        numberFormat3(hovedstol) + "*" + numberFormat2(kurs) + "/100 - " + numberFormat3(
                          stiftelse
                        ) + " = " + numberFormat3(provenue)
                      }
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Rente pr. termin effektiv</th>
                    <td>{numberFormat3(renteeffektiv)}%</td>

                    <td>
                      Renten pr. termin korrigeret for eventuelt kurstab og
                      stiftelsesomkostninger. Renten kan ikke udregnes eksplicit
                      for et serielån, så man skal bruge en finansfunktion
                      på sin computer eller i fx. Excel hvor formlen er:
                      <br></br>
                      =IA(betalingsstrømme)
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Rente pr. termin effektiv efter skat</th>
                    <td>{numberFormat3(renteeffektivskat)}%</td>

                    <td>
                      Renten pr. termin korrigeret for eventuelt kurstab og
                      stiftelsesomkostninger samt skat. Renten kan ikke udregnes eksplicit
                      for et serielån, så man skal bruge en finansfunktion
                      på sin computer eller i fx. Excel hvor formlen er:
                      <br></br>
                      =IA(betalingsstrømme minus skat)

                      <br />
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">ÅOP</th>
                    <td>{numberFormat3(åop)}%</td>

                    <td>
                      Renten pr. år korrigeret for eventuelt kurstab,
                      stiftelsesomkostninger og antal rentetilskrivninger pr.
                      år. ÅOP bestemmes ud fra den effektive rente pr. termin,
                      korrigeret for renters rente, ud fra antallet af
                      rentetilskrivninger pr. år. Formlen er:
                      {"\nÅOP = ((1 + RENTE)^Terminer pr år - 1)*100 = \n" +
                        "((1 + " + numberFormat5(renteeffektiv / 100) + ")^" +
                        numberFormat5(terminerår) + " - 1)*100 = " + numberFormat5(åop) + "%"
                      }


                      <br></br>ÅOP kan derfor på en lommeregner udregnes som:
                      <br />
                      <i>
                        ((1+
                        {numberFormat5(renteeffektiv / 100)})^
                        {numberFormat6(terminerår)}-1)*100
                      </i>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">ÅOP efter skat</th>
                    <td>{numberFormat3((((1 + renteeffektivskat / 100) ** terminerår - 1)) * 100)}%</td>

                    <td>

                      Renten pr. år korrigeret for skat, kurstab,
                      stiftelsesomkostninger og antal rentetilskrivninger pr.
                      år. ÅOP minus skat bestemmes ud fra den effektive rente minus skat pr. termin,
                      korrigeret for renters rente, ud fra antallet af
                      rentetilskrivninger pr. år. Formlen er:
                      {"\nÅOP = ((1 + RENTE-skat)^Terminer pr år - 1)*100 = \n" +
                        "((1 + " + numberFormat5(renteeffektivskat / 100) + ")^" +
                        numberFormat5(terminerår) + " - 1)*100 = " + numberFormat3((((1 + renteeffektivskat / 100) ** terminerår - 1)) * 100) + "%"
                      }


                      <br></br>ÅOP efter skat kan derfor på en lommeregner udregnes som:
                      <br />
                      <i>
                        ((1+
                        {numberFormat5(renteeffektivskat / 100)})^
                        {numberFormat6(terminerår)}-1)*100
                      </i>
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
          height="800"
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
        </div> */}
      {/* </Container > * /} */}
    </div >
  );
}
