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
  // console.log(path);

  function changeImg(hamburger) {
    let img = document.getElementById("ham_menu");
    img.src = hamburger;
  }

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
      {/* <div className="nav-branding-div">
        <a href="/Home" className="brand-text">
          WebAppWarfare
        </a>
      </div>
      {loggedIn ? (
        <div className="nav-loggedin-check-yes">
          {isHome ? (
            <div>
              {showLinks ? (
                <div className="navbar-everythingsuccess">
                  <div>
                    <input placeholder="Search Guides here..."></input>
                  </div>
                </div>
              ) : (
                <div> </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )} */}
      <div></div>
      {loggedIn ? (
        <div>
          {showLinks ? (
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
                <div>
                  <img
                    src="https://img.icons8.com/ios/50/FFFFFF/top-menu.png"
                    className="ham_menu"
                    id="ham_menu"
                    onClick={(e) => {
                      let hamburger =
                        "https://img.icons8.com/ios-glyphs/50/FFFFFF/top-menu.png";
                      changeImg(hamburger);
                      setShowLinks(false);
                    }}
                  ></img>
                </div>
              </div>
            </div>
          ) : (
            <div className="nav-links-loggedin-linksoff">
              <div className="there">
                <div className="must">
                  <div className="be">
                    <div className="a">
                      <div className="better">
                        <a href="/Home" className="nav-button">
                          Guides
                        </a>
                        <a href="/Profile" className="nav-button">
                          Profile
                        </a>
                        <div>
                          <img
                            src="https://img.icons8.com/ios-glyphs/50/FFFFFF/top-menu.png"
                            className="ham_menu-inactive"
                            id="ham_menu"
                            onClick={(e) => {
                              let hamburger =
                                "https://img.icons8.com/ios/50/FFFFFF/top-menu.png";
                              changeImg(hamburger);
                              setShowLinks(true);
                            }}
                          ></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
