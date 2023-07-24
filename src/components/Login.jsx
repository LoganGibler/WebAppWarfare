import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../api";
import { storeToken, storeUser, logStatus } from "../auth";
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
            const data = await loginUser(username, password);
            // console.log("Token: ", data.token)
            // console.log("user: ", data.user.username)
            if (data.user) {
              //   window.localStorage.setItem("isLoggedin", true);
              logStatus(true);
              storeUser(data.user.username);
              storeToken(data.token);
              setPassword("");
              setUsername("");
              history.push("/Home");
              location.reload();
            } else {
              alert("Sign in failed.");
              setUsername("");
              setPassword("");
              location.reload();
            }
          } catch (error) {
            throw error;
          }
        }}
      >
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
          <a href="/Register" className="signin-login-link">Need an account?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
