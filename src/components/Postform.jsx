import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { createPost } from "../api";
import "../css/Postform.css";
import { getUser } from "../auth";
import { createGuide } from "../api";

const Postform = () => {
  let [vmtitle, setvmtitle] = useState("");
  let [hostedby, setHostedBy] = useState("");
  let [description, setDescription] = useState("");
  let [difficulty, setDifficulty] = useState("");
  let history = useHistory();

  let author = getUser();
  function getCategoryOption() {
    let selectElement = document.querySelector("#dropdown_difficulty");
    let output = selectElement.options[selectElement.selectedIndex].value;
    return output;
  }

  return (
    <div className="main-createpost-div">
      <form
        className="createPostform"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            // console.log(
            //   "right before diff is passed into createPost:",
            //   difficulty
            // );
            const data = await createGuide(
              vmtitle,
              hostedby,
              description,
              author,
              difficulty
            );
            console.log("data on front end after createPost", data);
            if (!data) {
              alert("Blog creation failed!");
            } else {
              alert("Blog post created!");
            }
            setvmtitle("");
            setHostedBy("");
            setDescription("");
            history.push("/Profile");
            location.reload();
            // setDifficulty("");
            // setPicture("");
          } catch (error) {
            console.error("error in front end Postform.jsx", error);
            throw error;
          }
        }}
      >
        <div className="form-div">
          <div className="header-title-div">
            <h4 className="header-title">Create Guide</h4>
          </div>
          <div className="main-input-div">
            <div className="create-post-title-div">
              <input
                className="create-post-title"
                placeholder="Enter VM name"
                maxLength="40"
                value={vmtitle}
                type="text"
                onChange={(e) => {
                  setvmtitle(e.target.value);
                }}
              ></input>
            </div>
            <div className="create-post-hostedby-div">
              <input
                className="host-title"
                placeholder="Where did you find this VM? ex: TryHackMe"
                maxLength="45"
                value={hostedby}
                type="text"
                onChange={(e) => {
                  setHostedBy(e.target.value);
                }}
              ></input>
              <select
                className="postform-difficulty-select"
                name="difficulty"
                defaultValue={difficulty}
                id="dropdown_difficulty"
                onChange={async () => {
                  let selected_difficulty1 = await getCategoryOption();
                  setDifficulty(selected_difficulty1);
                  // console.log(
                  //   "this is selected_difficulty1",
                  //   selected_difficulty1
                  // );
                }}
              >
                <option disabled={true} value="">
                  Difficulty
                </option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Insane">Insane</option>
              </select>
            </div>
            <div className="description-div">
              <textarea
                className="guide-form-description-box"
                placeholder="Please enter a brief description of what to expect when hacking this box. OS, active directory, webapp pentesting, etc."
                maxLength="1350"
                value={description}
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="post-form-button-div">
            <button className="post-form-button-p">Submit</button>
            {/* <input
              className="create-post-pic"
              placeholder="Have a pic for the VM? Paste img link here!"
              value={picture}
              type="text"
              onChange={(e) => {
                setPicture(e.target.value);
              }}
            ></input> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Postform;
