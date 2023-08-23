import React, { useState, useEffect } from "react";
import "../css/home.css";
import { useHistory } from "react-router-dom";
import { getAllPublishedGuides, getGuidesBySearch } from "../api";
import { storage } from "../firebase.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
let imageListReg = ref(storage, "/guidepfp/");

const Home = () => {
  let [publicGuides, setPublicGuides] = useState([]);
  let [search, setSearch] = useState("");
  let [searchedGuides, setSearchedGuides] = useState([]);
  let [active, setActive] = useState(false);
  let [imageDirectoryList, setImageDirectoryList] = useState([]);
  let [imageList, setImageList] = useState([]);
  const history = useHistory();
  // need to loop through every published blog, get ID,
  // console.log("this is imageDirectoryList length", imageDirectoryList.length);

  async function fetchPublicGuides() {
    const blogs = await getAllPublishedGuides();
    setPublicGuides(blogs.data.allPublishedBlogs);
  }

  // in loop of guide, get id, then loop through parsed images that have the
  //  same id, then loop through those images that have "_main"

  useEffect(() => {
    fetchPublicGuides();
    listAll(imageListReg).then((res) => {
      // console.log("this is res.items", res.items);
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageDirectoryList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

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
                        // console.log("THIS IS sortedGuides", sortedGuides);
                        setPublicGuides(sortedGuides);
                        // console.log("This is now public blogs", publicGuides);
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
        <div className="middle-content-div">
          <div className="main-blog-div">
            <div className="blog-container">
              {publicGuides.length ? (
                publicGuides.map((guide) => {
                  return (
                    <div
                      className="blog-div"
                      id="blog-d"
                      key={guide._id}
                      onClick={() => {
                        history.push(`/blog/${guide._id}`);
                      }}
                    >
                      <div className="home-guide-preview-div">
                        <div className="home-pfp-image-div">
                          {imageDirectoryList.length &&
                            imageDirectoryList.map((image) => {
                              console.log("this is image", image);
                              let guide_id = image.split("_")[1];
                              console.log("this is guide_id", guide_id);
                              if (guide_id === guide._id) {
                                return (
                                  <div className="home-img-div">
                                    <img className="home-img" src={image} />
                                  </div>
                                );
                              }
                            })}
                        </div>
                        <div className="home-guide-summary">
                          <h4 className="home-guide-title">{guide.vmtitle}</h4>
                          <div className="hostedby-difficulty-div">
                            <p>{guide.hostedby}</p>
                            <p className="blog-difficulty-home">
                              Difficulty: {guide.difficulty}
                            </p>
                          </div>
                          <p className="blog-description-home-p">
                            {guide.description}
                          </p>
                          <div className="createdby-date-div">
                            <p className="createdby-home">
                              Created By: {guide.author}
                            </p>
                            <p className="date-home">On: {guide.date}</p>
                          </div>
                        </div>
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
