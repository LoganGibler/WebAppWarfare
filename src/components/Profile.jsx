import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../css/profile.css";
import { getUser, getID } from "../auth";
import {
  getBlogsByUsername,
  getPublishedUnapprovedGuides,
  getUserByID,
  approveGuide,
} from "../api";

const Profile = ({ userBlogs }) => {
  let [user, setUser] = useState("");
  let [unapprovedGuides, setUnapprovedGuides] = useState([]);
  const activeUser = getUser();
  let history = useHistory();
  let key = getID();

  async function fetchUser(key) {
    let user = await getUserByID(key);
    setUser(user.user[0]);
  }

  async function fetchUnapprovedGuides() {
    let unapprovedGuides = await getPublishedUnapprovedGuides();
    setUnapprovedGuides(unapprovedGuides.guides);
    // console.log("This is unapprovedGuides: ", unapprovedGuides.guides);
  }

  useEffect(() => {
    fetchUser(key);
    fetchUnapprovedGuides();
  }, [key]);

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
          <div className="dev-approval-guides-div">
            {user.admin === true ? (
              <div>
                <h5>Guides awaiting Dev approval:</h5>
                {unapprovedGuides.length ? (
                  unapprovedGuides.map((guide) => {
                    return (
                      <div
                        className="blog-profile-div"
                        key={guide._id}
                        onClick={() => {
                          history.push(`/blog/${guide._id}`);
                        }}
                      >
                        <div className="title-date-div">
                          <h6 className="vmtitle-profile-unapproved">
                            {guide.vmtitle}
                          </h6>
                          <p className="date-profile-unapproved">
                            Created: {guide.date}
                          </p>
                          <button
                            className="profile-approve-button"
                            onClick={() => {
                              approveGuide(guide._id);
                              alert("Guide Approved.");
                              location.reload();
                            }}
                          >
                            Approve
                          </button>
                          <button className="profile-reject-button">
                            Reject
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h5>No Guides awaiting approval</h5>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
