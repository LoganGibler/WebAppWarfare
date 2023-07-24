import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/profile.css";
import { getUser } from "../auth";
import { getUserIDByUsername } from "../api";

const Profile = () => {
  let [userBlogs, setUsernameBlogs] = useState([]);
  let [user, setUser] = useState("");
  const activeUser = getUser();
  // need to do a post request to the backend to get the user's blogs
  // add a button to delete the blog
  // add a button to edit the blog
  // add a button to create a new blog form this page as well
  // add a button to view the blog
  async function getUserBlogs(activeUser) {
    const user = await getUserIDByUsername(activeUser);
    setUser(user.user.id)
    console.log("user:", user.user._id);
  }

  useEffect(() => {
    getUserBlogs(activeUser);
  }, [activeUser]);

  return (
    <div>
      <h2>Welcome, {activeUser}</h2>
      <h2>ID: {user}</h2>
      <div></div>
    </div>
  );
};

export default Profile;
