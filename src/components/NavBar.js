import React from 'react'
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import logo from "../assets/Catch-up-logo.png"




const NavBar = () => {
  return (
    <Navbar expand="md" fixed='top' className="bg-body-tertiary">
      <Container>
        <Navbar.Brand > <img src={logo} alt="logo" height="50" /></Navbar.Brand>
        <h4 >
          Catch-Up
        </h4>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link ><i className="fa-solid fa-house" />Home</Nav.Link>
            <Nav.Link ><i className="fa-solid fa-arrow-right-to-bracket" />Sign in</Nav.Link>
            <Nav.Link ><i className="fa-solid fa-user-plus" />Sign up</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
  )
}

export default NavBar