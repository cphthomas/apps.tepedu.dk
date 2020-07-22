import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import styled from "styled-components";

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
      <Navbar.Brand href="/">tepedu apps</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/fremskrivning">Fremskrivning</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/annuitet">Annuitet</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/about">About</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/finans">Finans</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/contact">Contact</Link>
            </Nav.Link>
          </Nav.Item>
          <NavDropdown title="Investering" id="basic-nav-dropdown">
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
          </NavDropdown>
          <NavDropdown title="Finans" id="basic-nav-dropdown">
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
          </NavDropdown>
          <NavDropdown title="Optimering" id="basic-nav-dropdown">
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
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
