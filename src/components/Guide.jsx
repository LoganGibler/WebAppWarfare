import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import "../css/guide.css";

const Guide = () => {
  const [guide, setGuide] = useState([]);
  let { id } = useParams();
  let [imageList, setImageList] = useState([]);
  let imageListReg = ref(storage, `images/` + id);
  // console.log("id:", id);
  let counter = 0;
  let stepCounter = 0;

  async function fetchGuide(id) {
    const fetchedGuide = await getBlogById(id);
    setGuide(fetchedGuide.blog);
  }

  async function fetchGuidePictures(imageListReg) {
    listAll(imageListReg).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }

  useEffect(() => {
    fetchGuide(id);
    fetchGuidePictures(imageListReg);
  }, []);

  let steppies = guide.steps;

  return (
    <div className="main-individual-blog-div">
      <div className="main-blog-container1">
        {
          // imageList.map((image) => {}
          imageList.length ? (
            imageList.map((image) => {
              let index = image.split("?")[0];
              index = index.split("_")[1];
              console.log("This is image.split", index);
              if (index === "main") {
                return (
                  <div className="editguide-headers-title-pfp-div">
                    <div className="editguide-uploaded-img-div">
                      <img className="editguide-image-pfp" src={image} alt="" />
                    </div>
                    <div className="editguide-subinfo-div">
                      <h2 className="editguide-title">{guide.vmtitle}</h2>
                      <p className="editguide-hostedby">{guide.hostedby}</p>
                      <p className="author-guide">Created By: {guide.author}</p>
                      <p className="date-guide">Published on: {guide.date}</p>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div className="editguide-headers-title-pfp-div">
              <div className="editguide-uploaded-img-div">
                <img
                  className="editguide-image-pfp-default"
                  src={"https://www.ecpi.edu/sites/default/files/whitehat.png"}
                  alt=""
                />
                <p className="editguide-default-pic-info">
                  {" "}
                  ↑ &nbsp; This is default. Please upload a PFP.
                </p>
              </div>
              <div className="editguide-subinfo-div">
                <h2 className="editguide-title">{guide.vmtitle}</h2>
                <p className="editguide-hostedby">{guide.hostedby}</p>
                <p className="author-guide">Created By: {guide.author}</p>
                <p className="date-guide">Published on: {guide.date}</p>
              </div>
            </div>
          )
        }
        <div className="guide-description-div">
          <p>{guide.description}</p>
        </div>
        <div className="guide-main-step-div">
          {steppies ? (
            steppies.map((step) => {
              if (step.step === null) {
                stepCounter += 1;
                var stepCounterIndex = stepCounter - 1;
                return;
              }
              counter = counter + 1;
              var index = counter - 1;
              var stepCounterIndex = stepCounter;
              stepCounter += 1;
              if (!step.step && counter === 1) {
                return (
                  <div className="guide-step-div">
                    <p className="guide-step-element">
                      This guide has no steps yet!
                    </p>
                  </div>
                );
              }
              return (
                <div className="guide-step-main-div">
                  <div key={counter} className="guide-step-div">
                    <p className="guide-step-element">
                      Step {counter}: {step.step}
                    </p>
                    {
                      // imageList.map((image) => {}
                      imageList.length &&
                        imageList.map((image) => {
                          // console.log("This is image.name", image.name)
                          let index = image.split("?")[0];
                          // how to get last character of string
                          index = index[index.length - 1];
                          console.log("This is index", index);
                          console.log("This is image url", image);
                          if (index === stepCounterIndex.toString()) {
                            return (
                              <div className="guide-uploaded-img-div">
                                <img
                                  className="guide_uploaded_img"
                                  src={image}
                                />
                              </div>
                            );
                          }
                        })
                    }
                  </div>
                </div>
              );
            })
          ) : (
            <div className="guide-step-div">
              <p className="guide-step-element">This guide has no steps yet!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guide;
