import React, { useState, useEffect } from "react";
import "../css/home.css";
import { useHistory } from "react-router-dom";
import { getAllPublishedBlogs } from "../api";
// { allPublishedBlogs }
const Home = () => {
  let [publicBlogs, setPublicBlogs] = useState([]);
  const history = useHistory();

  async function fetchPublicBlogs() {
    const blogs = await getAllPublishedBlogs();
    setPublicBlogs(blogs.data.allPublishedBlogs);
  }

  useEffect(() => {
    fetchPublicBlogs();
  }, []);

  // console.log(publicBlogs);
  return (
    <div className="main-blogs-div">
      <div className="center-me-div">
        <div className="middle-content-div">
          <div className="main-blog-div">
            <div className="blog-container">
              {publicBlogs.length ? (
                publicBlogs.map((blog) => {
                  // console.log(blog);
                  return (
                    <div
                      className="blog-div"
                      id="blog-d"
                      key={blog._id}
                      onClick={() => {
                        history.push(`/blog/${blog._id}`);
                      }}
                    >
                      <h3 className="home-guide-title">{blog.vmtitle}</h3>
                      <div className="hostedby-difficulty-div">
                        <p>{blog.hostedby}</p>
                        <p className="blog-difficulty-home">
                          Difficulty: {blog.difficulty}
                        </p>
                      </div>
                      <p className="blog-description-home-p">
                        {blog.description}
                      </p>
                      <div className="date-createdby-div">
                        <p className="createdby-home">
                          Created By: {blog.author}
                        </p>
                        <p className="date-home">On: {blog.date}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h5 className="error-on-blogs-header">Failed to fetch blogs</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
