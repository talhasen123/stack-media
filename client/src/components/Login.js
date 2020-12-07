import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../css/Login.css";

import { checkResponse } from "../util/ResponseUtil";

export default function Login() {
  // states for login
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //states for register
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordCheck, setRegisterPassswordCheck] = useState("");
  const [registerUserType, setRegisterUserType] = useState(false);

  function handleLoginButtonPress(event) {
    //TODO: validation of input
    if (loginUsername === "") {
      toast.error("Please write your login username");
      return;
    }
    if (loginPassword === "") {
      toast.error("Please write your login password");
      return;
    }
    login(loginUsername, loginPassword);
  }

  function handleRegisterButtonPress(event) {
    //TODO: validation of input
    if (registerEmail === "") {
      toast.error("Please write down your email");
      return;
    }
    if (registerUsername === "") {
      toast.error("Please write down your username");
      return;
    }
    if (registerPassword === "" || registerPasswordCheck === "") {
      toast.error("Please fill your password!");
      return;
    }
    if (registerPasswordCheck !== registerPassword) {
      toast.error("Check your password! Your passwords do not match...");
      return;
    }
    register();
  }

  function login(nameArg, passArg) {
    console.log(loginUsername + " " + loginPassword);
    //TODO: send login request
    fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: nameArg,
        password: passArg,
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        console.log("Hello!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("error");
      });
  }

  function register() {
    //TODO: send register request
    fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
        userType: registerUserType ? "ROLE_ADMIN" : "ROLE_USER",
      }),
    })
      .then((r) => checkResponse(r))
      .then((r) => r.json())
      .then((r) => {
        console.log("asdasdasdasd");
        // login( registerUsername, registerPassword);
      })
      .catch((err) => {
        console.log(err);
        toast.error("error");
      });
  }

  return (
    <Container>
      <div className="DivWrapper">
        <div className="LoginPageSection">
          <h1>Login</h1>
          <div>
            <label>Username:</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="text"
              id="usernameLoginInputID"
              onInput={(e) => setLoginUsername(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Password:</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="password"
              id="passwordLoginInputID"
              onInput={(e) => setLoginPassword(e.target.value)}
              required
            ></input>
          </div>
          <div className="CenterButton">
            <button onClick={handleLoginButtonPress}>Login</button>
          </div>
        </div>
        <div className="VerticalLine"></div>
        <div className="LoginPageSection">
          <h1>Register</h1>
          <div>
            <label>Email:</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="text"
              id="emailRegisterInputID"
              onInput={(e) => setRegisterEmail(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Username:</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="text"
              id="usernameRegisterInputID"
              onInput={(e) => setRegisterUsername(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Password:</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="password"
              id="passwordRegisterInputID"
              onInput={(e) => setRegisterPassword(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Password (Repeat):</label>
          </div>
          <div>
            <input
              className="TextInput"
              type="password"
              id="passwordRegisterInput2ID"
              onInput={(e) => setRegisterPassswordCheck(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <input
              type="checkbox"
              id="companyUserInputID"
              onInput={(e) => setRegisterUserType(e.target.value)}
            ></input>
            <label>I am a company user</label>
          </div>
          <div className="CenterButton">
            <button onClick={handleRegisterButtonPress}>Register</button>
          </div>
        </div>
      </div>
    </Container>
  );
}