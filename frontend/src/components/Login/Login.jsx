import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { jwtDecode } from "jwt-decode";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [result, setResult] = useState("");

  function handleInputValues(event) {
    setLoginValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));

    setErrors((prevError) => ({
      ...prevError,
      [event.target.name]: "",
    }));

    setResult("");
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/expense-tracker/api/v1/auth/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginValues),
        }
      );

      const resData = await response.json();

      console.log(resData);

      if (!response.ok) {
        if (response.status === 400) {
          setErrors(() => ({
            username: resData.message.username,
            password: resData.message.password,
          }));
        }
        if (response.status === 401) {
          if (resData.message.username !== "")
            setResult(resData.message.username);
          if (resData.message.password !== "")
            setResult(resData.message.password);
        }
      }

      const token = resData.token;

      if (!token) {
        return null;
      }

      localStorage.setItem("token", token);

      const userId = jwtDecode(token).userId;

      dispatch(authActions.login(userId));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
              onChange={handleInputValues}
              value={loginValues.username}
              className={(errors.username || result) && classes.inputError}
            />
            {errors.username && (
              <div className={classes.textError}>{errors.username}</div>
            )}
          </div>

          <div className={classes.field}>
            <label htmlFor="">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Type your password"
              onChange={handleInputValues}
              value={loginValues.password}
              className={(errors.password || result) && classes.inputError}
            />
            {errors.password && (
              <div className={classes.textError}>{errors.password}</div>
            )}
          </div>

          {result && <div className={classes.textError}>{result}</div>}
          <div className={classes.actions}>
            <button className={classes.loginBtn} type="submit">
              Login
            </button>
            <Link to={"/signup"} className={classes.signupBtn}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
