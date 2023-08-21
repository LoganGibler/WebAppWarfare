import React, { useState, useEffect } from "react";
import "../css/home.css";
import { useHistory } from "react-router-dom";
import { getAllPublishedBlogs, getGuidesBySearch } from "../api";


const Home = () => {
  let [publicBlogs, setPublicBlogs] = useState([]);
  let [search, setSearch] = useState("");
  let [searchedGuides, setSearchedGuides] = useState([]);
  let [active, setActive] = useState(false);
  let [imageList, setImageList] = useState([]);
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
        <div className="home-searchbar-main-container">
          <div className="home-searchbar-form">
            <div className="searchbar-button-input-div">
              <input
                className="home-searchbar-input"
                placeholder="Search Guides here..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              ></input>
              <button
                className="home-searchbar-button"
                onClick={async () => {
                  try {
                    if (search.length > 0) {
                      let foundGuides = await getGuidesBySearch(search);
                      console.log(
                        (foundGuides = foundGuides.allFoundGuides[0])
                      );
                      if (foundGuides != undefined) {
                        console.log(foundGuides);
                        let sortedGuides = [];
                        const filteredGuides = foundGuides.map((guide) => {
                          if (guide.published === true) {
                            sortedGuides.push(guide);
                          }
                        });
                        console.log("THIS IS sortedGuides", sortedGuides);
                        setPublicBlogs(sortedGuides);
                        console.log("This is now public blogs", publicBlogs);
                        if (searchedGuides) {
                          setActive(true);
                        }
                      } else {
                        console.log("no guides found");
                      }
                    } else {
                      return;
                    }
                  } catch (error) {
                    throw error;
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* {active && */}
        {/* searchedGuides.map((blog) => {
            return (
              <div
                className="blog-div"
                id="blog-d"
                key={blog._id}
                onClick={() => {
                  history.push(`/blog/${blog._id}`);
                }}
              >
                <h4 className="home-guide-title">{blog.vmtitle}</h4>
                <div className="hostedby-difficulty-div">
                  <p>{blog.hostedby}</p>
                  <p className="blog-difficulty-home">
                    Difficulty: {blog.difficulty}
                  </p>
                </div>
                <p className="blog-description-home-p">{blog.description}</p>
                <div className="date-createdby-div">
                  <p className="createdby-home">Created By: {blog.author}</p>
                  <p className="date-home">On: {blog.date}</p>
                </div>
              </div>
            );
          })} */}
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
                      <h4 className="home-guide-title">{blog.vmtitle}</h4>
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
                <h5 className="error-on-blogs-header">No Blogs Found</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
