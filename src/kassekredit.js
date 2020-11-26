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
  // numberFormat2,
  numberFormat3,
  // numberFormat4,
  numberFormat5,
  // numberFormat6,
} from "./lib"; //ændrer til komma og pct + DKK
import Container from "react-bootstrap/Container";
// import ReactHtmlParser from "react-html-parser";
// import { Bar } from "react-chartjs-2";
// import { Doughnut } from "react-chartjs-2";
import DropdownButton from "react-bootstrap/DropdownButton";

import Dropdown from "react-bootstrap/Dropdown";

// import MathJax from "react-mathjax2";

import "handsontable/dist/handsontable.full.css";
// import { HotTable } from "@handsontable/react";
// import Handsontable from "handsontable";

// import "katex/dist/katex.min.css";
// import { BlockMath } from "react-katex";
// import { InlineMath } from "react-katex";

export function kassekredit() {


  // const numInputs = document.querySelectorAll("input[type=number]");

  // numInputs.forEach(function (input) {
  //   input.addEventListener("change", function (e) {
  //     if (e.target.value === "") {
  //       e.target.value = 1;
  //     }
  //   });
  // });




  var [rente, setrente] = useState(+(1.25).toFixed(2));
  
  // var rentedecimal = rente / 100;
  
  const [maksimum, setmaksimum] = useState(+(20000.0).toFixed(2));
  const [provision, setprovision] = useState(+(0.25).toFixed(2));
  const [udnyttelse, setudnyttelse] = useState(+(16000.0).toFixed(2));
  

  const [prår, setprår] = useState("1 helårlig termin");
  const handleSelect = (e) => {
    console.log(e);
    setprår(e);
  };
  var terminerår = prår.slice(0, 2);
  var udnyttelsesgrad = udnyttelse/maksimum;
  var effektiv 
  if (provision > 0) {
    effektiv = rente+provision/udnyttelsesgrad
  }else{
    effektiv = rente
  }
  var åop = ((1+effektiv/100)**terminerår-1)*100
 
  return (
    <div>
      <Container>
        <div class="p-3 mb-2 bg-secondary text-white">
          <h4>Kassekredit.</h4>        
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
                              Rente pr. termin i %
                      </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>

                      

                      <InputGroup input-group-sm>
                        <Form.Control
                          type="number"
                          // min="0"
                          value={provision}
                          onChange={(e) =>
                            setprovision(+e.target.value)
                          }
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append >
                          <InputGroup.Text id="inputGroupAppend">
                            Provision pr termin i %
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <InputGroup>
                        <Form.Control
                          type="number"
                          min="0"
                          value={maksimum}
                          onChange={(e) => setmaksimum(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                            Kassekredit maksimum DKK.
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      <InputGroup>
                        <Form.Control
                          type="number"
                          min="0"
                          value={+udnyttelse}
                          onChange={(e) => setudnyttelse(+e.target.value)}
                          aria-describedby="inputGroupAppend"
                          placeholder="0"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">
                          Gennemsnitlig udnyttelse DKK.
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                                
                      <br />
                      <Form.Group>
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




                    </Form.Group>




                  </div>
                </Container>
              </div>
            </div>
          </div>

        </div>
      </Container >









      {/* <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <h3>Afdraget er {numberFormat1(maksimum / provision)} over de {provision} provision</h3>

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
      </Container> */}

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
                      Maksimum
                    </th>
                    <td>{numberFormat1(maksimum)}</td>
                    <td>
                      Maksimum angiver den maksimale kredit, det betyder man maksimalt kan trække {numberFormat1(maksimum)} på kassekreditten.
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                    Udnyttelsesgrad
                    </th>
                    <td>{numberFormat3(udnyttelsesgrad*100)}%</td>
                    <td>
                      Den gennemsnitlig udnyttelse {numberFormat1(udnyttelse)} på kassekreditten, angiver hvad det gennemsnitlige træk på kassekreditten er. 
                      
                      Vi kan bestemme udnyttelsesgraden ved at dividere det gennemsnitlige træk på kassekreditten med maksimum på kassekreditten {numberFormat1(maksimum)}:<br></br>
                      Udnyttelsesgrad = gennemsnitligt træk/maksimum = {numberFormat3(udnyttelse)}/{numberFormat3(maksimum)} = {numberFormat3(udnyttelse/maksimum)} = {numberFormat3(100*udnyttelse/maksimum)}% 
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Effektiv rente pr. termin
                    </th>
                    <td>{numberFormat3(effektiv)}%</td>
                    <td>
                      {provision===0 && "Da der ikke tilskrives provision på kassekreditten, bliver den effektive rente pr. termin lig med den nominelle rente pr termin "+numberFormat3(rente)+"%"}
                      {provision>0 && "Vi kan bestemme den effektive rente pr. termin som nominel rente pr. termin " +numberFormat3(rente)+"% plus provision pr. termin " +numberFormat3(provision)+"% divideret med udnyttelsesgrad " +numberFormat3(udnyttelse/maksimum)+":\n"+
                      "rente+provision/udnyttelsesgrad = "+numberFormat3(rente)+"% + "+numberFormat3(provision)+"%"+
                      "/"+numberFormat3(udnyttelse/maksimum)+" = "+numberFormat3(rente+provision/(udnyttelse/maksimum))+"%"

                      }
                    </td>
                  </tr>

                 
                  <tr>
                    <th scope="row">
                      ÅOP Årlige omkostninger i procent
                     
                    </th>
                    <td>{numberFormat3(åop)}%</td>

                    <td>
                      {terminerår==="1 " && "Da der kun er en rentetilskrivning pr år, bliver ÅOP lig med den effektive rente pr. termin "+numberFormat3(effektiv)+"%"}
                      {terminerår>1 && "Da der er "+terminerår+" terminer pr. år, skal vi tage højde for renters rente, når vi beregner ÅOP ud fra den effektive rente pr. termin. Vi kan bestemme ÅOP som:\n"+
                      "(1+"+numberFormat5(effektiv/100)+")^"+terminerår+" - 1 = "+numberFormat5(åop/100)+" = "+numberFormat3(åop)+"%"
                      }
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
