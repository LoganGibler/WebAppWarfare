import React, { useState, useEffect } from "react";
import "../css/editedHome.css";
// import { SampleHome } from "./components";
let imageListReg = ref(storage, "/guidepfp/");
import { useHistory } from "react-router-dom";
import { getAllPublishedGuides, getGuidesBySearch } from "../api";
import { storage } from "../firebase.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const SampleHome = ({ publicGuides, imageDirectoryList }) => {
  // let [publicGuides, setPublicGuides] = useState([]);
  // let [imageDirectoryList, setImageDirectoryList] = useState([]);
  // console.log("publicGuides: ", publicGuides);
  // console.log("imageDirectoryList: ", imageDirectoryList);
  const history = useHistory();
  let list = [];

  return (
    <div className="editedHome-container-div">
      {/* {console.log("!!!length", publicGuides)} */}
      <div className="editedHome-main-div">
        {publicGuides.length ? (
          publicGuides.map((guide) => {
            return (
              <div
                key={guide.vmtitle}
                className="editedhome-guide-div"
                onClick={() => {
                  // console.log("publicGuides");
                  history.push(`/blog/${guide._id}`);
                }}
              >
                <div>
                  {imageDirectoryList.length &&
                    imageDirectoryList.map((image) => {
                      let guide_id = image.split("_")[1];
                      list.push(guide_id);
                      // console.log("this is list", list);
                      if (guide_id === guide._id) {
                        return (
                          <div className="editedhome-img-div">
                            <img className="editedhome-img" src={image}></img>
                          </div>
                        );
                      }
                    })}
                </div>
                <div>
                  {!list.includes(guide._id) && (
                    <div className="editedhome-img-div-null">
                      <img
                        src="https://www.ecpi.edu/sites/default/files/whitehat.png"
                        className="editedhome-img-null"
                      ></img>
                    </div>
                  )}
                </div>
                <div className="editedhome-main-details-div">
                  <h5 className="editedhome-guidetitle">{guide.vmtitle}</h5>
                  <h6 className="editedhome-difficulty">
                    Rating: {guide.difficulty}
                  </h6>
                  <p className="editedhome-createdby">By: {guide.author}</p>
                </div>
                {/* <SampleHome /> */}
              </div>
            );
          })
        ) : (
          <h4> no Guide found</h4>
        )}
      </div>
    </div>
  );
};

export default SampleHome;
