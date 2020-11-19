import React from "react";
import { Link } from "react-router-dom";
import {
  Nav,
  Navbar,
  // NavDropdown,
  OverlayTrigger,
  // Overlay,
  Tooltip,
  // Form,
  // FormControl,
  Button,
} from "react-bootstrap";
import styled from "styled-components";
import { ReactComponent as Logo } from "./tepedu300.svg";
const Styles = styled.div`
  .navbar {
    background-color: lightgrey;
  }

  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: black;

    &:hover {
      color: grey;
    }
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg" bg="light" variant="light">
      <Navbar.Brand href="https://www.tepedu.dk/">
        <Logo
          alt=""
          width="120"
          height="40"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link>
              <Link to="/">
                <OverlayTrigger
                  overlay={<Tooltip>Forside</Tooltip>}
                  placement="bottom"
                >
                  <Button size="sm">Home</Button>
                </OverlayTrigger>
              </Link>
            </Nav.Link>
          </Nav.Item>



          <Nav.Item>
            <Nav.Link>
              <Link to="/fremskrivning">
                {" "}
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Fremskrivning af kapital. Hvor meget vokser et indestående
                      med?
                    </Tooltip>
                  }
                  placement="bottom"
                >
                  <Button size="sm">Fremskrivning</Button>
                </OverlayTrigger>
              </Link>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <Link to="/ann">
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Finansregning
                    </Tooltip>
                  }
                  placement="bottom"
                >
                  <Button size="sm">Annuitet</Button>
                </OverlayTrigger>
              </Link>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <Link to="/staaende">
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Stående lån Hvad bliver ydelse, afdrag og renter?
                    </Tooltip>
                  }
                  placement="bottom"
                >
                  <Button size="sm">Stående</Button>
                </OverlayTrigger>
              </Link>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <Link to="/serie">
                <OverlayTrigger
                  overlay={<Tooltip>Serielån</Tooltip>}
                  placement="bottom"
                >
                  <Button size="sm">Serielån</Button>
                </OverlayTrigger>
              </Link>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <Link to="/invest">
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Investering.
                    </Tooltip>
                  }
                  placement="bottom"
                >
                  <Button size="sm">Investering</Button>
                </OverlayTrigger>
              </Link>
            </Nav.Link>
          </Nav.Item>

          {/* <Nav.Item>
            <Nav.Link>
              <Link to="/optimering">
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Maksimering af dækningsbidrag Bestem den optimale pris og
                      afsætning
                    </Tooltip>
                  }
                  placement="bottom"
                >
                  <Button size="sm">Optimering</Button>
                </OverlayTrigger>
              </Link>
            </Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link>
              <Link to="/fin2020">
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Finansiering
                    </Tooltip>
                  }
                  placement="bottom"
                >
                  <Button size="sm">fin2020</Button>
                </OverlayTrigger>
              </Link>
            </Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link>
              <Link to="/f3">
                <OverlayTrigger
                  overlay={<Tooltip>f3</Tooltip>}
                  placement="bottom"
                >
                  <Button size="sm">Demo</Button>
                </OverlayTrigger>
              </Link>
            </Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link>
              <Link to="/f4">
                <OverlayTrigger
                  overlay={<Tooltip>Investering</Tooltip>}
                  placement="bottom"
                >
                  <Button size="sm">f4</Button>
                </OverlayTrigger>
              </Link>
            </Nav.Link>
          </Nav.Item>

          {/* <NavDropdown title="Investering" id="basic-nav-dropdown">
            <Link href="/about">About</Link>
            <Nav.Link href="/about">navlink</Nav.Link>
            <NavDropdown.Item to="/about">About</NavDropdown.Item>
            <Nav.Link href="/fremskrivning">
              <small>navlink fremskrivning</small>
            </Nav.Link>
            <NavDropdown.Item href="/about">About</NavDropdown.Item>
            <Link href="/about">link</Link>
            <NavDropdown.Item href="https://www.tepedu.dk/">
              tepedu
            </NavDropdown.Item>
            <NavDropdown.Item href="/finans">Finans</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        {/* <Form inline>
          <FormControl
            type="text"
            id="anythingSearch"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button variant="outline-success">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
