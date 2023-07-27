import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../css/profile.css";
import { getUser } from "../auth";
import { getBlogsByUsername } from "../api";

const Profile = ({ userBlogs }) => {
  let [user, setUser] = useState("");
  const activeUser = getUser();
  let history = useHistory();
  // need to do a post request to the backend to get the user's blogs
  // add a button to delete the blog
  // add a button to edit the blog
  // add a button to create a new blog form this page as well
  // add a button to view the blog
  // console.log("this is user blogs", userBlogs);

  return (
    <div className="main-profile-div">
      <div className="main-profile-container">
        {userBlogs.length ? (
          <div>
            <h4> Welcome back, {activeUser}!</h4>
            <p>
              Looks like you already have some created guides! You can add and
              edit steps of your guides here by clicking on the blog you want to
              edit. Remember to publish your guide when you are all finished!
            </p>
          </div>
        ) : null}
        {userBlogs.length ? (
          userBlogs.map((blog) => {
            // console.log(blog);
            return (
              <div
                className="blog-profile-div"
                key={blog._id}
                onClick={() => {
                  history.push(`/userguides/${blog._id}`);
                }}
              >
                <div className="title-date-div">
                  <h3 className="vmtitle-profile">{blog.vmtitle}</h3>
                  <p className="date-profile">Created on: {blog.date}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h4> Welcome to WebAppWarfare, {activeUser}!</h4>
            <p>
              Looks like you don't have any created guides! Click here to create
              one:
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
