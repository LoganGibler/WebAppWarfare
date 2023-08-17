import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../api";
import { storeToken, storeUser, logStatus, storeID } from "../auth";
import { hashPassword } from "../flask_api";
import "../css/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  return (
    <div className="main-form-div">
      <form
        className="login-form"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (!username || !password) {
              alert("Please enter username and password.");
            }
            let hashedPassword = await hashPassword(password);
            hashedPassword = hashedPassword.data.hashed_pass;
            const data = await loginUser(username, hashedPassword);
            console.log("data ", data);
            if (data.fail === "fail") {
              alert("Sign in failed.");
              setUsername("");
              setPassword("");
              location.reload();
            } else {
              logStatus(true);
              storeUser(data.user.username);
              storeToken(data.token);
              storeID(data.user._id);
              setPassword("");
              setUsername("");
              history.push("/Home");
              location.reload();
            }
          } catch (error) {
            throw error;
          }
        }}
      >
        {/* <div className="login-username-label-div">
          <p className="login-username-label">Username:</p>
        </div> */}
        <div className="username-input-login-div">
          <input
            className="username-input-login"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </div>
        {/* <div className="login-password-label-div">
          <p className="login-password-label">Password:</p>
        </div> */}
        <div className="password-input-login-div">
          <input
            className="password-input-login"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <button className="login-button">Sign in</button>
        </div>
        <div className="signin-login-div">
          <a href="/Register" className="signin-login-link">
            Need an account?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
