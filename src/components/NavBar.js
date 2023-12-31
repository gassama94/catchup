import React from 'react'
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import logo from "../assets/Catch-up-logo.png"
import styles from "../styles/NavBar.module.css";





const NavBar = () => {
  return (
    <Navbar className={styles.NavBar}  expand="md" fixed='top'>
      <Container>
        <Navbar.Brand > <img src={logo}  alt="logo" height="50" /></Navbar.Brand>
        <h4 className={`${styles.Loggo} mr-3 mt-1`} style={{ color: "white" }} >
          Catch-Up
        </h4>
        <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Travel</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Opinion</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Style</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Health</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Science</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Cultuure</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Technology</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Politics</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Buisiness</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Design</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link ><i className="fa-solid fa-house" />Home</Nav.Link>
            <Nav.Link ><i className="fa-solid fa-arrow-right-to-bracket" />Sign in</Nav.Link>
            <Nav.Link ><i className="fa-solid fa-user-plus" />Sign up</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
  )
}

export default NavBar