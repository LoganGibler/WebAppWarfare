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
  let imageListReg = ref(storage, id);
  // console.log("id:", id);
  let counter = 0;
  let stepCounter = 0;

  async function fetchGuide(id) {
    const fetchedGuide = await getBlogById(id);
    setGuide(fetchedGuide.blog);
  }

  async function fetchGuidePictures(imageListReg){
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
    fetchGuidePictures(imageListReg)
  }, []);

  let steppies = guide.steps;

  return (
    <div className="main-individual-blog-div">
      <div className="main-blog-container1">
        <h2 className="guide-title">{guide.vmtitle}</h2>
        <p className="author-guide">Created By: {guide.author}</p>
        <p className="date-guide">Published on: {guide.date}</p>
        <div className="hostedby-difficulty-div-guide">
          <p className="guide-hostedby">{guide.hostedby}</p>
          <p className="difficulty-guide">Rating: {guide.difficulty}</p>
        </div>
        <div className="guide-description-div">
          <p className="guide-description-p">{guide.description}</p>
        </div>
        <div className="guide-main-step-div">
          {steppies ? (
            steppies.map((step) => {
              if (step.step === null) {
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
