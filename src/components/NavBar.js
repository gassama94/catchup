import React from 'react';
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import logo from "../assets/Catch-up-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser,  useSetCurrentUser} from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from "axios";




const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };


  const addPostIcon = (
    <NavLink 
  exact
  className={styles.NavLink}
  activeClassName={styles.Active}
  to="/posts/create"

>
 <i className="fa-regular fa-square-plus" />Add post
 </NavLink>

  )

  const loggedInIcons = (
  <>
   <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
  </>
  );
  const loggedOutIcons = (
  <> 
  <NavLink 
  exact
  className={styles.NavLink}
  activeClassName={styles.Active}
  to="/signin"

>
 <i className="fa-solid fa-arrow-right-to-bracket" />Sign in
 </NavLink>
<NavLink
    exact
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/signup"
>
 <i className="fa-solid fa-user-plus" />Sign up
 </NavLink>
 </>
  );
  
  return (
    <Navbar className={styles.NavBar}  expand="md" fixed='top'>
      <Container>
      <NavLink to="/">
        <Navbar.Brand > <img src={logo}  alt="logo" height="50" /></Navbar.Brand>
        </NavLink>
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
            {currentUser && addPostIcon}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink
               exact
               className={styles.NavLink}
               activeClassName={styles.Active}
               to="/"
             >
              <i className="fa-solid fa-house" />Home</NavLink>
            
              {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
  )
}

export default NavBar