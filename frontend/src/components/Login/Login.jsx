import React from "react";
import classes from "./Login.module.css";

function Login() {
  return (
    <div className={classes.box}>
      <div className={classes.login}>
        <h2>Login</h2>
        <form className={classes.loginForm}>
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
        </form>
        <div className={classes.actions}>
          <button className={classes.loginBtn}>Login</button>
          <button className={classes.signupBtn}>Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
