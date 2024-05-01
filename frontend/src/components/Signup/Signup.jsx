import React, { useState } from "react";
import classes from "./Signup.module.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authActions } from "../../store/auth-slice";
import SignupValidation from "./SignupValidation";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupValues, setSignupValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [result, setResult] = useState("");

  function handleInputValues(event) {
    setSignupValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [event.target.name]: "",
    }));

    setResult("");
  }

  function handleConfirmPassword(event) {
    setConfirmPassword(event.target.value);
  }

  async function handleSignup(event) {
    event.preventDefault();

    try {
      if (signupValues.password !== confirmPassword || confirmPassword === "") {
        setErrors(SignupValidation(signupValues));
      } else {
        const response = await fetch(
          "http://localhost:8080/expense-tracker/api/v1/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signupValues),
          }
        );

        const resData = await response.json();

        if (!response.ok) {
          if (response.status === 400) {
            setErrors(() => ({
              email: resData.email,
              username: resData.username,
              password: resData.password,
            }));
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
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.box}>
      <div className={classes.signup}>
        <h2>Signup</h2>
        <form onSubmit={handleSignup} className={classes.signupForm}>
          <div className={classes.field}>
            <label htmlFor="">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Type your email"
              onChange={handleInputValues}
              value={signupValues.email}
              className={(errors.email || result) && classes.inputError}
            />
            {errors.email && (
              <div className={classes.textError}>{errors.email}</div>
            )}
          </div>

          <div className={classes.field}>
            <label htmlFor="">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Type your username"
              onChange={handleInputValues}
              value={signupValues.username}
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
              value={signupValues.password}
              className={(errors.password || result) && classes.inputError}
            />
            {errors.password && (
              <div className={classes.textError}>{errors.password}</div>
            )}
          </div>

          <div className={classes.field}>
            <label htmlFor="">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleConfirmPassword}
              value={confirmPassword}
              className={
                (errors.confirmPassword || result) && classes.inputError
              }
            />
            {errors.confirmPassword && (
              <div className={classes.textError}>{errors.confirmPassword}</div>
            )}
          </div>

          {result && <p className={classes.textError}>{result}</p>}
          <div className={classes.actions}>
            <button className={classes.signupBtn} type="submit">
              Sign up
            </button>
            <Link to={"/login"} className={classes.loginBtn}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
