import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  Navigation,
  Home,
  Footer,
  About,
  Postform,
  Guide,
  Register,
  Login,
  Profile,
} from "./components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getAllBlogs, getAllPublishedBlogs } from "./api";

// CHODIKAR_USEPOLLING=true npm run start

const App = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [allPublishedBlogs, setAllPublishedBlogs] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const loggedIn = window.localStorage.getItem("isLoggedin");

  async function fetchAllBlogs() {
    const data = await getAllBlogs();
    setAllBlogs(data);
  }

  async function fetchAllPublishedBlogs() {
    const data = await getAllPublishedBlogs();
    setAllPublishedBlogs(data.data.allPublishedBlogs);
  }

  useEffect(() => {
    fetchAllBlogs();
    fetchAllPublishedBlogs();
  }, []);

  return (
    <Router>
      <div id="App">
        <Navigation
          loggedIn={loggedIn}
          // isLoggedIn={isLoggedIn}
          // setIsLoggedIn={setIsLoggedIn}
        />
        {/* <Footer /> */}
        <Switch>
          <Route path="/Home">
            <Home allPublishedBlogs={allPublishedBlogs} />
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/Postform">
            <Postform />
          </Route>
          <Route path="/blog/:id">
            <Guide allPublishedBlogs={allPublishedBlogs} />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
