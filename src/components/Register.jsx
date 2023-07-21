import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../api";
import { storeToken, storeUser } from "../auth";
import "../css/register.css";

const Register = () => {
    // storeuser and token
    // automatically run login function on passed credentials
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

  return (
    <div className="main-form-div">
      <div className="form-div">
        <form className="register-form">
          <div className="username-input-register-div">
            <input
              className="username-input-register"
              placeholder="Username"
            ></input>
          </div>
          <div className="password-input-register-div">
            <input
              className="password-input-register"
              placeholder="Password"
              type="password"
            ></input>
          </div>
          <div>
            <button className="register-button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
