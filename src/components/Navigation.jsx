import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../css/navigation.css";

const Navigation = ({ loggedIn }) => {
  const history = useHistory();
  return (
    <nav className="nav-container">
      <div className="nav-branding-div">
        <div className="nav-branding">
          <a href="/Home" className="brand-text">
            WebAppWarfare
          </a>
        </div>
      </div>
      {loggedIn ? (
        <div className="nav-links-loggedin">
          <a href="/Home" className="nav-button">
            Guides
          </a>
          <a href="/PostForm" className="nav-button">
            Create Guide
          </a>
          <a href="About" className="nav-button">
            About
          </a>
          <a href="Profile" className="nav-button">
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
          <a
            className="nav-button" href="/Login"
          >
            Sign In
          </a>
        </div>
      )}
      {/* <div className="nav-links">
        <a href="/Home" className="nav-button">
          Guides
        </a>

        {loggedIn ? (
          <a href="/Postform" className="nav-button">
            Create Guide
          </a>
        ) : null}
        <a href="/About" className="nav-button">
          About
        </a>
        {loggedIn ? (
          <a
            className="nav-button"
            onClick={async () => {
              history.push("/Profile");
            }}
          >
            Profile
          </a>
        ) : null}
        {loggedIn ? (
          <a
            className="nav-button"
            onClick={async () => {
              window.localStorage.removeItem("isLoggedIn", false);
              alert("Successfully Logged out.");
              history.push("/Login");
              localStorage.clear();
              location.reload();
            }}
          >
            Logout
          </a>
        ) : (
          <a
            className="nav-button"
            onClick={async () => {
              history.push("/Login");
            }}
          >
            Sign In
          </a>
        )}
      </div> */}
    </nav>
  );
};

export default Navigation;
