import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addStep } from "../api";
import "../css/editguide.css";

const EditGuide = ({ userBlogs }) => {
  let [html, setHtml] = useState(null);
  const [blog, setBlog] = useState({});
  let [newStep, setNewStep] = useState("");
  let { id } = useParams();
  let counter = 0;

  function renderStepBox(id) {
    try {
      async function getStepData() {
        let newStepData = document.getElementById("step-area").value;
        // setNewStep(newStepData);
        console.log("this should be new step data:", newStepData);
        let addedSteppie = await addStep(id, newStepData);
        return addedSteppie;
      }

      return (
        <div>
          <div className="newstep-div">
            <textarea
              className="step-input-area"
              id="step-area"
              type="text"
              max-length="1350"
              placeholder="Enter new step here..."
            ></textarea>
          </div>
          <div className="submit-step-button-div">
            <button
              className="step-button-submit"
              onClick={async () => {
                const data = await getStepData();
                console.log(data, "!!!!!!!!");
                location.reload();
              }}
            >
              Submit Step
            </button>
          </div>
        </div>
      );
    } catch (error) {
      throw error;
    }
  }

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

  // console.log("THIS IS CLICKED ON BLOG", blog);
  let steppies = blog.steps;
  // console.log("steppies:", steppies);
  return (
    <div className="editguide-main-div">
      <div className="editguide-main-container">
        <h2>{blog.vmtitle}</h2>
        <p className="author-guide">Created By: {blog.author}</p>
        <p className="date-guide">Published on: {blog.date}</p>
        <p>{blog.hostedby}</p>
        <p>{blog.description}</p>
        <button className="edit-description-button"> Edit Description</button>
        {steppies ? (
          steppies.map((step) => {
            counter = counter + 1;
            return (
              <div key={counter} className="step-div">
                <p className="step-element">
                  Step {counter}: {step.step}
                </p>
                <button className="editstep-button">Edit</button>
              </div>
            );
          })
        ) : (
          <div className="step-div">
            <p className="step-element">Failed to render steps!</p>
          </div>
        )}
        {html}
        <div className="publish-editguide-button-div">
          <button
            className="added-step-button"
            onClick={() => {
              console.log("click!");
              setHtml(renderStepBox(id));
            }}
          >
            Add Step
          </button>
          <button className="publish-editguide-button">Publish Guide</button>
        </div>
      </div>
    </div>
  );
};

export default EditGuide;
