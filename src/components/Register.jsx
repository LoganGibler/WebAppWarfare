import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../api";
import { hashPassword } from "../flask_api";
import { storeToken, storeUser, logStatus } from "../auth";
import "../css/register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();


  return (
    <div className="main-form-div">
      <form
        className="register-form"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            let hashedPassword = await hashPassword(password);
             hashedPassword = hashedPassword.data.hashed_pass;
          
            const { token } = await registerUser(username, hashedPassword);
            if (token) {
              console.log("this is token", token);
              alert("Registration successful.");
              const activeUser = await loginUser(username, hashedPassword);
              console.log("this is active user", activeUser);
              if (activeUser) {
                window.localStorage.setItem("isLoggedin", true);
                // console.log("this is active user", activeUser);
                logStatus(true);
                storeUser(activeUser.user.username);
                storeToken(activeUser.token);
                // setIsLoggedIn(true);
                setUsername("");
                setPassword("");
                history.push("/Home");
                location.reload();
              } else {
                alert(
                  "Unable to log in user after registration. Please log in manually."
                );
              }
            } else {
              alert(
                "Registration failed. Please try a different username or password."
              );
            }
          } catch (error) {
            throw error;
          }
        }}
      >
        {/* <div className="register-username-label-div">
          <p className="register-username-label">Username:</p>
        </div> */}
        <div className="username-input-register-div">
          <input
            className="username-input-register"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </div>
        {/* <div className="register-password-label-div">
          <p className="register-password-label">Password:</p>
        </div> */}
        <div className="password-input-register-div">
          <input
            className="password-input-register"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </div>
        <div className="register-button-div">
          <button className="register-button">Create Account</button>
        </div>
        <div className="signin-div">
          <a className="signin-link" href="/Login">
            Already have an account?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
