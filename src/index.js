import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Navigation, Home, Footer, About, Postform, Guide} from "./components";
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
        <Navigation />
        {/* <Footer /> */}
        <Switch>
          <Route path="/Home">
            <Home allPublishedBlogs={allPublishedBlogs}/>
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
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
