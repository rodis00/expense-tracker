import React from "react";
import classes from "./Login.module.css";
import { json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { jwtDecode } from "jwt-decode";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const userData = {
      username: data.username,
      password: data.password,
    };

    const response = await fetch(
      "http://localhost:8080/expense-tracker/api/v1/auth/authenticate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

    const resData = await response.json();

    const token = resData.token;

    localStorage.setItem("token", token);

    if (!token) {
      return null;
    }

    const userId = jwtDecode(token).userId;

    const authData = {
      ...userData,
      userId,
    };

    dispatch(authActions.login(authData));

    navigate("/");
  }

  return (
    <div className={classes.box}>
      <div className={classes.login}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} className={classes.loginForm}>
          <div className={classes.field}>
            <label htmlFor="">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Type your username"
            />
          </div>
          <div className={classes.field}>
            <label htmlFor="">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Type your password"
            />
          </div>
          <div className={classes.actions}>
            <button className={classes.loginBtn} type="submit">
              Login
            </button>
            <button className={classes.signupBtn}>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
