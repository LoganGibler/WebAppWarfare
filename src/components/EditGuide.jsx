import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  addStep,
  getBlogsByUsername,
  updateDescription,
  updateSteppie,
  unpublishGuide,
  publishGuide,
  getBlogById,
  deleteGuide,
} from "../api";
import { getUser } from "../auth";
import "../css/editguide.css";
const EditGuide = () => {
  let history = useHistory();
  let [html, setHtml] = useState(null);
  let [description_html, setDescription_html] = useState(null);
  let [editStep_html, setEditStep_html] = useState(null);
  let [renderEditBox, setRenderEditBox] = useState(null);
  let [showEditDescButton, setShowEditDescButton] = useState(true);
  let [showEditStepButton, setShowEditStepButton] = useState(true);
  let [showAddStepButton, setShowAddStepButton] = useState(true);
  let [userGuide, setUserGuide] = useState([]);
  let { id } = useParams();
  let counter = 0;
  const activeUser = getUser();
  let steppies = userGuide.steps;

  async function fetchUserGuide(id) {
    let guide = await getBlogById(id);
    // console.log(guide);
    setUserGuide(guide.blog);
  }

  useEffect(() => {
    fetchUserGuide(id);
  }, [id]);

  // console.log("this is userGuide", userGuide);
  // console.log("this is steppies:", steppies);
  function renderStepBox(id) {
    try {
      async function getStepData() {
        let newStepData = document.getElementById("step-area").value;
        // console.log("this should be new step data:", newStepData);
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
          <div className="editguide-newstep-button-div">
            <button
              className="editguide-newstep-button"
              onClick={async () => {
                const data = await getStepData();
                // console.log(data, "!!!!!!!!");
                if (!data) {
                  alert("Step Failed to add.");
                } else {
                  // alert("New Step added!");
                }
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

  function renderDescriptionBox(id) {
    try {
      // console.log("!!!!", id);
      async function getDescriptionData() {
        let newDescriptionData = document.getElementById(
          "editguide-description-textarea"
        ).value;

        // console.log("this should be newDescriptionData:", newDescriptionData);
        let updatedDescription = await updateDescription(
          id,
          newDescriptionData
        );
        return updatedDescription;
      }
      return (
        <div className="editguide-description-div">
          <textarea
            id="editguide-description-textarea"
            className="editguide-description-textarea"
            type="text"
            max-length="4000"
          >
            {userGuide.description}
          </textarea>
          <p
            className="editguide-description-update-p"
            onClick={() => {
              // console.log("This is blog_id, passed to db", blog._id);
              getDescriptionData();
              location.reload();
            }}
          >
            Submit Update
          </p>
        </div>
      );
    } catch (error) {
      throw error;
    }
  }

  function renderEditStepBox(id, index) {
    // console.log("id:", id);
    // console.log("index:", index);
    try {
      async function getNewStepData() {
        let newStepData = document.getElementById("editguide-step-textarea")
          .value;
        console.log("This should be new typed in step data: ", newStepData);
        // console.log("this should be new step data:", newStepData);
        let newStep = await updateSteppie(id, index, newStepData);
        console.log("This is new step", newStep);
        return newStep;
      }

      return (
        <div className="update-editstep-main-div">
          <textarea id="editguide-step-textarea">
            {userGuide.steps[index].step}
          </textarea>
          <p
            className="editguide-update-step-p"
            onClick={() => {
              getNewStepData();
              // alert("Step Updated.");
              location.reload();
            }}
          >
            Update Step
          </p>
        </div>
      );
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="editguide-main-div">
      <div className="editguide-main-container">
        <h3 className="editguide-title">{userGuide.vmtitle}</h3>
        <p className="author-guide">Created By: {userGuide.author}</p>
        <p className="date-guide">Published on: {userGuide.date}</p>
        <p>{userGuide.hostedby}</p>
        <p className="editguide-description-p">{userGuide.description}</p>
        {description_html}
        {showEditDescButton && (
          <p
            className="edit-description-p"
            onClick={() => {
              setShowEditDescButton(false);
              setDescription_html(renderDescriptionBox(id));
            }}
          >
            Edit Description →
          </p>
        )}

        {steppies ? (
          steppies.map((step) => {
            // console.log(steppies);
            if (step === null) {
              return;
            }
            counter = counter + 1;
            let index = counter - 1;
            return (
              <div className="editstep-outside-div" key={counter}>
                <div className="editguide-step-div">
                  <p className="editguide-step-element">
                    Step {counter}: {step.step}
                  </p>
                </div>
                {showEditStepButton && (
                  <p
                    className="editguide-p-button"
                    onClick={() => {
                      setShowEditStepButton(false);
                      setRenderEditBox(index);
                      console.log("This is index: ", index);
                      setEditStep_html(renderEditStepBox(userGuide._id, index));
                    }}
                  >
                    Edit →
                  </p>
                )}
                <div className="renderEditBox-div">
                  {renderEditBox === index ? editStep_html : null}
                </div>
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
          {showAddStepButton && (
            <p
              className="editguide-addstep-p-button"
              onClick={() => {
                // console.log("click!");
                setShowAddStepButton(false);
                setHtml(renderStepBox(id));
              }}
            >
              Add Step &nbsp; ↑
            </p>
          )}
          {userGuide.published ? (
            <p
              className="editguide-publish-p-button"
              onClick={async () => {
                await unpublishGuide(userGuide._id);
                alert("Guide hidden from public view.");
                // location.reload()
              }}
            >
              Hide Guide
            </p>
          ) : (
            <p
              className="editguide-publish-p-button"
              onClick={async () => {
                // console.log("blog._id", blog._id)
                await publishGuide(userGuide._id);
                alert(
                  "Guide published. Once this guide is approved by a dev, it will be public."
                );
                // location.reload()
              }}
            >
              Publish Guide
            </p>
          )}
          {activeUser === userGuide.author && (
            <p
              className="editguide-deleteguide-button"
              onClick={async () => {
                await deleteGuide(userGuide._id);
                alert("Guide successfully deleted.");
                history.push("/Profile");
                location.reload();
              }}
            >
              Delete Guide
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditGuide;
