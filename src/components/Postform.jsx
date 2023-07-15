import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { createPost } from "../api";
import "../css/Postform.css";
import { getUser } from "../auth";
import { createPost } from "../api";

const Postform = () => {
  let [vmtitle, setvmtitle] = useState("");
  let [hostedby, setHostedBy] = useState("");
  let [description, setDescription] = useState("");
  let [picture, setPicture] = useState("");

  return (
    <div>
      <form
        className="createPostform"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const data = await createPost(
              vmtitle,
              hostedby,
              description,
              picture
            );
            console.log("data on front end after createPost, data");
            if (!data) {
              alert("Blog creation failed!");
            } else {
              alert("Blog post created!");
            }
            setvmtitle("");
            setHostedBy("");
            setDescription("");
            setPicture("");
          } catch (error) {
            console.error("error in front end Postform.jsx", error);
            throw error;
          }
        }}
      >
        <div className="form-div">
          <div className="header-title-div">
            <h3 className="header-title">Start a new blog!</h3>
          </div>
          <div className="title-title-div">
            <input
              className="create-post-title"
              placeholder="Enter VM name"
              maxLength="24"
              value={vmtitle}
              type="text"
              onChange={(e) => {
                setvmtitle(e.target.value);
              }}
            ></input>
            <input
              className="host-title"
              placeholder="Where did you find this VM? ex: TryHackMe"
              maxLength="28"
              value={hostedby}
              type="text"
              onChange={(e) => {
                setHostedBy(e.target.value);
              }}
            ></input>
          </div>
          <div className="description-div">
            <textarea
              className="description-box"
              placeholder="Please enter a brief description of what to expect when hacking this box. OS, active directory, webapp pentesting, etc."
              maxLength="220"
              value={description}
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="post-form-button-div">
            <button className="post-form-button">Submit</button>
            <input
              className="create-post-pic"
              placeholder="Have a pic for the VM? Paste img link here!"
              value={picture}
              type="text"
              onChange={(e) => {
                setPicture(e.target.value);
              }}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Postform;
