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
} from "./components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getAllBlogs, getAllPublishedBlogs, getBlogsByUsername } from "./api";
import { getUser } from "./auth";
import "../src/css/about.css"
// CHODIKAR_USEPOLLING=true npm run start

const App = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const loggedIn = window.localStorage.getItem("isLoggedin");
  const activeUser = getUser();

  // async function fetchAllBlogs() {
  //   const data = await getAllBlogs();
  //   setAllBlogs(data);
  // }

  // async function fetchAllPublishedBlogs() {
  //   const data = await getAllPublishedBlogs();
  //   setAllPublishedBlogs(data.data.allPublishedBlogs);
  // }

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
          // isLoggedIn={isLoggedIn}
          // setIsLoggedIn={setIsLoggedIn}
        />
        {/* <Footer /> */}
        <Switch>
          <Route path="/Home">
            <Home  />
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/Postform">
            <Postform />
          </Route>
          <Route path="/blog/:id">
            <Guide />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Profile">
            <Profile userBlogs={userBlogs} />
          </Route>
          <Route path="/userguides/:id">
            <EditGuide userBlogs={userBlogs} />
          </Route>
          <Route>
            <Sample />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
