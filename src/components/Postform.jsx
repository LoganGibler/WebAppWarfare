import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { createPost } from "../api";
import "../css/Postform.css";
import { getUser } from "../auth";

const Postform = () => {
  let [vmtitle, setvmtitle] = useState("");
  let [hostedby, setHostedBy] = useState("");
  let [description, setDescription] = useState("");
  let [picture, setPicture] = useState("");

  return (
    <div>
      <form className="createPostform" onSubmit={() => {}}>
        <div className="form-div">
          <div className="header-title-div">
            <h3 className="header-title">Start a new blog!</h3>
          </div>
          <div className="title-title-div">
            <input
              className="create-post-title"
              placeholder="Enter VM name"
            ></input>
            <input
              className="host-title"
              placeholder="Where did you find this VM? ex: TryHackMe"
            ></input>
          </div>
          <div className="description-div">
            <textarea
              className="description-box"
              placeholder="Please enter a brief description of what to expect when hacking this box. OS, active directory, webapp pentesting, etc."
            ></textarea>
          </div>
          {/* <div className="post-form-button-div"> */}
          <button className="post-form-button">Submit</button>
          {/* </div> */}
        </div>
      </form>
    </div>
  );
};

export default Postform;
