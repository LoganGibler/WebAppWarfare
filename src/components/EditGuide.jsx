import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../css/editguide.css";

const EditGuide = ({ userBlogs }) => {
  const [blog, setBlog] = useState({});
  let { id } = useParams();
  let counter = 0;
  async function getBlog(id) {
    const calledBlog = userBlogs.map((element) => {
      if (element._id === id) {
        return setBlog(element);
      }
    });
  }

  useEffect(() => {
    getBlog(id);
  }, [id]);

  console.log("THIS IS CLICKED ON BLOG", blog);
  let steppies = blog.steps;
  return (
    <div className="editguide-main-div">
      <div className="editguide-main-container">
        <h2>{blog.vmtitle}</h2>
        <p className="author-guide">Created By: {blog.author}</p>
        <p className="date-guide">Published on: {blog.date}</p>
        <p>{blog.hostedby}</p>
        <p>{blog.description}</p>
        <button> Edit Description</button>
        {steppies ? (
          steppies.map((step) => {
            console.log("step:", step.step);
            counter = counter + 1;
            if (step.step === undefined && counter === 1) {
              return (
                <div className="step-div">
                  <p className="step-element">This guide has no steps yet!</p>
                </div>
              );
            }
            return (
              <div key={counter} className="step-div">
                <p className="step-element">
                  Step {counter}: {step.step}
                </p>
                <button>Edit Step</button>
              </div>
            );
          })
        ) : (
          <div className="step-div">
            <p className="step-element">This guide has no steps yet!</p>
          </div>
        )}
        <button>Publish Guide</button>
      </div>
    </div>
  );
};

export default EditGuide;
