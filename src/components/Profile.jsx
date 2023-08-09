import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../css/profile.css";
import { getUser } from "../auth";
import { getBlogsByUsername } from "../api";

const Profile = ({ userBlogs }) => {
  let [user, setUser] = useState("");
  const activeUser = getUser();
  let history = useHistory();


  return (
    <div className="main-profile-div">
      <div className="main-profile-container">
        {userBlogs.length ? (
          <div>
            <h5 className="profile-title"> Welcome back, {activeUser}!</h5>
            <p className="profile-paragraph">
              Looks like you already have some created guides! You can add and
              edit steps of your guides here by clicking on the guide you want
              to edit. Remember to publish your guide so others can see it!
            </p>
          </div>
        ) : null}
        <div className="profile-listed-guides">
          {userBlogs.length ? (
            userBlogs.map((blog) => {
              // console.log(blog);
              return (
                <div className="profile-guide-main-div" key={blog._id}>
                  <div
                    className="blog-profile-div"
                    key={blog._id}
                    onClick={() => {
                      history.push(`/userguides/${blog._id}`);
                    }}
                  >
                    <div className="title-date-div">
                      <h6 className="vmtitle-profile">{blog.vmtitle}</h6>
                      <p className="date-profile">Created: {blog.date}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="profile-no-guides-created-div">
              <h5> Welcome to WebAppWarfare, {activeUser}!</h5>
              <p className="profile-no-guides-p">
                Looks like you don't have any created guides! Click here to
                create one:
              </p>
              <a href="/Postform"> Click here to create a Guide</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
