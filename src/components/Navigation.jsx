import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../css/navigation.css";

const Navigation = ({ loggedIn, whereami }) => {
  const history = useHistory();
  let count = 1;
  let [showLinks, setShowLinks] = useState(false);
  let [isHome, setIsHome] = useState(false);
  let path = whereami.slice(-4);
  // let [hamActive, setHamActive] = useState(false)
  // console.log(path);

  // function getHam() {
  //   const myHam = JSON.parse(localStorage.getItem("ham"));
  //   return myHam;
  // }

  // function setHam() {
  //   let ham = getHam();
  //   if (ham === false) {
  //     localStorage.setItem("ham", JSON.stringify(true));
  //   } else {
  //     localStorage.setItem("ham", JSON.stringify(false));
  //   }
  // }

  // function changeImg(hamburger) {
  //   let img = document.getElementById("ham_menu");
  //   img.src = hamburger;
  // }

  async function areWeHome(path) {
    if (path === "Home") {
      setIsHome(true);
    }
  }

  useEffect(() => {
    areWeHome(path);
  }, [path]);

  return (
    <nav className="nav-container">
      <div className="nav-branding-div">
        <a href="/Home" className="brand-text">
          WebAppWarfare
        </a>
      </div>

      {loggedIn ? (
        <div className="nav-linked-main-container-loggedin">
          <div className="nav-links-loggedin">
              <div className="this">
                <a href="/Home" className="nav-button">
                  Guides
                </a>
                <a href="/PostForm" className="nav-button">
                  Create Guide
                </a>
                <a href="/Profile" className="nav-button">
                  Profile
                </a>
                <a href="/About" className="nav-button">
                  About
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
            </div>
        </div>
      ) : (
        <div className="nav-links-loggedout">
          <a href="/Home" className="nav-button">
            Guides
          </a>
          <a href="/About" className="nav-button">
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
