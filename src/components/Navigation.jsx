import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../css/navigation.css";

const Navigation = ({ loggedIn }) => {
  const history = useHistory();
  return (
    <nav className="nav-container">
      <div className="nav-branding-div">
        <a href="/Home" className="brand-text">
          WebAppWarfare
        </a>
      </div>
      {loggedIn ? (
        <div className="nav-links-loggedin">
          <a href="/Home" className="nav-button">
            Guides
          </a>
          <a href="/PostForm" className="nav-button">
            Create Guide
          </a>
          <a href="/About" className="nav-button">
            About
          </a>
          <a href="/Profile" className="nav-button">
            Profile
          </a>
          <a
            href="/Login"
            className="nav-button"
            onClick={async () => {
              window.localStorage.removeItem("isLoggedIn", false);
              alert("Successfully Logged out.");
              localStorage.clear();
            }}
          >
            Sign out
          </a>
        </div>
      ) : (
        <div className="nav-links-loggedout">
          <a href="/Home" className="nav-button">
            Guides
          </a>
          <a href="About" className="nav-button">
            About
          </a>
          <a className="nav-button" href="/Login">
            Sign In
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
