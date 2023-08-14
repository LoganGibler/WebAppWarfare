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
  EditGuide,
  Sample,
  ContactMe,
  HomeLab,
} from "./components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getBlogsByUsername } from "./api";
import { getUser } from "./auth";
import "../src/css/about.css";
// CHODIKAR_USEPOLLING=true npm run start

const App = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const loggedIn = window.localStorage.getItem("isLoggedin");
  const activeUser = getUser();

  let whereami = document.location.href;

  async function getUserBlogs(activeUser) {
    const blogs = await getBlogsByUsername(activeUser);
    // console.log("This is user blogs.", blogs.blogs);
    setUserBlogs(blogs.blogs);
  }

  useEffect(() => {
    // fetchAllBlogs();
    // fetchAllPublishedBlogs();
    getUserBlogs(activeUser);
  }, [activeUser]);

  return (
    <Router>
      <div id="App">
        <Navigation
          loggedIn={loggedIn}
          whereami={whereami}
        />
        <Switch>
          <Route to="/Home">
            <Home />
          </Route>
          <Route to="/About">
            <About />
          </Route>
          <Route to="/Postform">
            <Postform />
          </Route>
          <Route to="/blog/:id">
            <Guide />
          </Route>
          <Route to="/Register">
            <Register />
          </Route>
          <Route to="/Login">
            <Login />
          </Route>
          <Route to="/Profile">
            <Profile userBlogs={userBlogs} />
          </Route>
          <Route to="/userguides/:id">
            <EditGuide userBlogs={userBlogs} />
          </Route>
          <Route to="/ContactMe">
            <ContactMe />
          </Route>
          <Route to="/HomeLab">
            <HomeLab />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
