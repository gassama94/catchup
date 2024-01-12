import React from 'react';
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import logo from "../assets/Catch-up-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser,  useSetCurrentUser,} from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";



const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();


  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      // console.log(err);
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
    <Navbar 
    bg="dark"
    variant="dark"
    expanded={expanded} 
    className={styles.NavBar}  expand="md" 
    fixed='top'>
      <Container>
      <NavLink to="/">
        <Navbar.Brand > <img src={logo}  alt="logo" height="50" /></Navbar.Brand>
        </NavLink>
        <h4 className={`${styles.Loggo} mr-3 mt-1`} style={{ color: "white" }} >
          Catch-Up
        </h4>
        <NavDropdown className="custom-dropdown" title="Categories" id="basic-nav-dropdown">
             
              <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/world">
              World
            </NavLink>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/environment">
              Environment
            </NavLink>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/technology">
              Technology
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/design">
              Design
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/culture">
              Culture
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/business">
              Business
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/politics">
              Politics
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/opinion">
              Opinion
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/science">
              Science
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/health">
              Health
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/style">
              Style
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink className={styles.NavDropdown} to="/category/travel">
              Travel
            </NavLink>
          </NavDropdown.Item>
            </NavDropdown>
            {currentUser && addPostIcon}
        <Navbar.Toggle  
        
          ref={ref}
          onClick={() => setExpanded(!expanded)} 
          aria-controls="basic-navbar-nav" />
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