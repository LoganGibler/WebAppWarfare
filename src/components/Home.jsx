import React, { useState, useEffect } from "react";
import "../css/home.css";
import { useHistory } from "react-router-dom";

const Home = ({ allPublishedBlogs }) => {
  const history = useHistory();
  return (
    <div className="main-blogs-div">
      <div className="center-me-div">
        <div className="middle-content-div">
          <div className="search-bar-div">
            <input className="search-bar" placeholder="Search blog(s)"></input>
          </div>
          <div className="main-blog-div">
            <div className="blog-container">
              {allPublishedBlogs.length
                ? allPublishedBlogs.map((blog) => {
                    // console.log(blog);
                    return (
                      <div className="blog-div" id="blog-d" key={blog._id} onClick={()=>{
                        history.push(`/blog/${blog._id}`);
                      }}>
                        <h3>{blog.vmtitle}</h3>
                        <p>{blog.hostedby}</p>
                        <p>{blog.description}</p>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
