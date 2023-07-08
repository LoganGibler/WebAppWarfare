import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./myStyles.css";

const Navigation = () => {
  const history = useHistory();
  return (
    <div>
      <Navbar fixed="top" id="main_nav">
        <Container>
          <Navbar.Brand>
          <Nav.Link
              id="main_button"
              type="submit"
              onClick={() => {
                history.push("/Home");
              }}
            >
              Ecommerce Template
            </Nav.Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link
              id="link_buttons"
              type="submit"
              onClick={() => {
                history.push("/Products");
              }}
            >
              Products
            </Nav.Link>
            <Nav.Link
              id="link_buttons"
              type="submit"
              onClick={() => {
                history.push("/About");
              }}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              id="link_buttons"
              type="submit"
              onClick={() => {
                history.push("/Cart");
              }}
            >
              View Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
