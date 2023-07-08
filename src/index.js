import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  Navigation,
  Home,
  Sidebar,
  Products,
  Footer,
  About,
  Cart,
} from "./components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div id="App">
        <Navigation />
        <Footer />
        <Switch>
          <Route path="/Products">
            <Products />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Sidebar">
            <Sidebar />
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/Cart">
            <Cart />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
