import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api";
import "../css/guide.css";

const Guide = () => {
  const [guide, setGuide] = useState([]);
  let { id } = useParams();
  console.log("id:", id);
  let counter = 0;

  async function fetchGuide(id) {
    const fetchedGuide = await getBlogById(id);
    setGuide(fetchedGuide.blog);
  }
  useEffect(() => {
    fetchGuide(id);
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
              // console.log("step:", step.step);
              counter = counter + 1;
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
