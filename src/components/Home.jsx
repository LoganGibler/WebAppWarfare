import React, { useState, useEffect } from "react";
import "../css/home.css";
import { useHistory } from "react-router-dom";
import { getAllPublishedGuides, getGuidesBySearch } from "../api";
import { storage } from "../firebase.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import SampleHome from "./SampleHome";
let imageListReg = ref(storage, "/guidepfp/");

const Home = () => {
  let [publicGuides, setPublicGuides] = useState([]);
  let [search, setSearch] = useState("");
  let [searchedGuides, setSearchedGuides] = useState([]);
  let [active, setActive] = useState(false);
  let [imageDirectoryList, setImageDirectoryList] = useState([]);
  let [imageList, setImageList] = useState([]);
  const history = useHistory();
  let list = [];
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
      <div className="both-comps">
      <div className="center-me-div">
        <div className="home-searchbar-main-container">
        <h4 className="home-title">Featured Guides</h4>
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
                              // console.log("this is image", image);
                              let guide_id = image.split("_")[1];
                              list.push(guide_id);
                              // console.log("this is list", list);
                              if (guide_id === guide._id) {
                                return (
                                  <div className="home-img-div">
                                    <img className="home-img" src={image}></img>
                                  </div>
                                );
                              }
                            })}
                        </div>
                        {!list.includes(guide._id) && (
                          <div className="home-img-div-null">
                            <img
                              src="https://www.ecpi.edu/sites/default/files/whitehat.png"
                              className="home-img-null"
                            ></img>
                          </div>
                        )}
                        <div className="home-guide-summary">
                          <h5 className="home-guide-title">{guide.vmtitle}</h5>
                          <p className="home-guide-description">
                            {guide.description}
                          </p>
                          <div className="home-guide-details-div">
                            <p className="blog-difficulty-home">
                              Difficulty: {guide.difficulty}
                            </p>
                            <p className="home-guide-hostedby">
                              Hosted By: {guide.hostedby}
                            </p>

                            <p className="createdby-home">
                              Created By: {guide.author}
                            </p>
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
      {/* <div className="sample-home-div"> */}
        <SampleHome
          publicGuides={publicGuides}
          imageDirectoryList={imageDirectoryList}
        />
      {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
