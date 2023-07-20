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
            <a href="/Home" className="brand-text">
              WebAppWarfare
            </a>
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
  );
};

export default Navigation;
