import Container from "react-bootstrap/Container";
import { Button } from 'react-bootstrap';
import React from "react";
// import { useState } from "react";
// import Toggle from "./ToggleRenderProps";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import ReactHtmlParser from "react-html-parser";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "react-bootstrap";
// import "./styles.css";
// import {
//   // numberFormat1,
//   // numberFormat2,
//   // numberFormat3,
//   // numberFormat4,
//   // numberFormat5,
//   // numberFormat6,
// } from "./lib"; //ændrer til komma og pct + DKK

// import ReactHtmlParser from "react-html-parser";
// import { Bar } from "react-chartjs-2";
// import { Doughnut } from "react-chartjs-2";
// import DropdownButton from "react-bootstrap/DropdownButton";

// import Dropdown from "react-bootstrap/Dropdown";

// import MathJax from "react-mathjax2";

// import "handsontable/dist/handsontable.full.css";
// import { HotTable } from "@handsontable/react";
// import Handsontable from "handsontable";

// import "katex/dist/katex.min.css";
// import { BlockMath } from "react-katex";
// import { InlineMath } from "react-katex";

export function video() {
return (
    <div>
      {' '}
      
      <Container className="p-0">
        <div class="p-3 mb-2 ">
          {/* <div class="card"> */}
            <div class="card bg-secondary text-white">
            <div class="card-body">

              <div>

                <h2>Videoplaylists 1. Interne Eksamen 2021-2022 CPH Business</h2>
                <h6>
                  1. Interne Eksamen 2021-2022 CPH Business Finansøkonom EØ finansierings- og investeringsdelen
                </h6>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="Videoplaylist"
                  className="embed-responsive-item"
                  src="https://vimeo.com/showcase/10051171/embed"
                  frameborder="0"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-secondary">
          <div class="card">
            <div class="card-body">
              <div>
                <h6 className="text-secondary">Materiale brugt i ovenstående videoplaylist.</h6>
                <br></br>
                
                <Button
                target="_blank"
                  size="sm"
                  href="https://docs.google.com/document/d/1_GUpK3R2yx2VptES6A19FnMuMQ29B2PudqJl70EB8sY/edit?usp=sharing"
                >
                  Eksamensprojekt 1. interne januar 2022
                </Button>

                <br></br>
                <br></br>
                <Button
                target="_blank"
                variant="warning"
                  size="sm"
                  href="https://docs.google.com/document/d/1YTBDszrHVim99n6gyXM2H9Q7jlywNDRx751Rsg1qIwg/edit?usp=sharing"
                >
                  Bilag 3 til køb af grund + ejendom EØ
                </Button>
                
                <br></br>
                <br></br>
                <Button
                target="_blank"
                  size="sm"
                  variant="success"
                  href="https://docs.google.com/spreadsheets/d/1fN2vy4RvvkVaQ5GSJIS5WXAZPVehxzhwmCIBAeb2FD8/edit?usp=sharing"
                >
                  CPH EØ Eksamen Løsningsforslag
                </Button>
                
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* <MathJaxContext hideUntilTypeset={'first'} config={config} version={3}>
        <main style={{ padding: '1rem 0' }}>
          <Container className="p-0">
            <div class="p-3 mb-2 bg-white text-black">
              <div class="card">
                <Container>
                  <div class="p-3 mb-2 bg-white">
                    <Form>
                      <div className="controls">
                        <span class="lead text-muted">
                          <h2>eksamensvideoer</h2>
                          <Row>
                            <Col class="col-6">
                              <div>
                                <div>
                                  <div>
                                    <br></br>
                                    <div class="card">
                                      <div class="card-body">
                                        <div></div>
                                        <p class="card-text">
                                          <MathJax dynamic>
                                            <hr></hr>
                                            CBS test Vores bedste gæt på, også kaldet estimat for, den sande middelværdi
                                            i populationen er stikprøvegennemsnittet{' '}
                                            <span>{`$\\bar{x}=${numberFormat4(a)}$`}</span>.
                                          </MathJax>
                                        </p>
                                      </div>
                                    </div>
                                    <br></br>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </span>
                      </div>
                    </Form>
                  </div>
                </Container>
              </div>
            </div>
          </Container>
        </main>
      </MathJaxContext> */}
    </div>
  );

}
