import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../css/myStyles.css";

const Navigation = () => {
  const history = useHistory();
  return (
    <div className="main-nav-div">
      <nav className="nav-container">
        <div className="nav-branding-div">
          <div className="nav-branding">
            <a className="brand-text">WebAppWarfare</a>
          </div>
        </div>
        <div className="nav-links">
          <div className="nav-link-container">
            <a href="/Home" className="nav-button">
              Guides
            </a>
            <a href="/Postform" className="nav-button">
              Create Guide
            </a>
            <a href="/profile" className="nav-button">
              Profile
            </a>
            <a href="/About" className="nav-button">
              About
            </a>
          </div>
        </div>
      </nav>
    </div>
    // <div>
    //   <Navbar fixed="top" id="main_nav">
    //     <Container>
    //       <Navbar.Brand>
    //         <Nav.Link
    //           id="big-button"
    //           // id="main_button"
    //           type="submit"
    //           onClick={() => {
    //             history.push("/Home");
    //           }}
    //         >
    //           WebAppWarfare
    //         </Nav.Link>
    //       </Navbar.Brand>
    //       <Nav>
    //         <Nav.Link
    //           id="main_button"
    //           type="submit"
    //           onClick={() => {
    //             history.push("/Home");
    //           }}
    //         >
    //           Public Writeups
    //         </Nav.Link>
    //         <Nav.Link
    //           id="link_buttons"
    //           type="submit"
    //           onClick={() => {
    //             history.push("/About");
    //           }}
    //         >
    //           About Me
    //         </Nav.Link>
    //         <Nav.Link
    //           id="link_buttons"
    //           type="submit"
    //           onClick={() => {
    //             history.push("/Profile");
    //           }}
    //         >
    //           View Profile
    //         </Nav.Link>
    //         <Nav.Link
    //           id="link_buttons"
    //           type="submit"
    //           onClick={() => {
    //             history.push("/Postform");
    //           }}
    //         >
    //           New Post
    //         </Nav.Link>
    //       </Nav>
    //     </Container>
    //   </Navbar>
    // </div>
  );
};

export default Navigation;
