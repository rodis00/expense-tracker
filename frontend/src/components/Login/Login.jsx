import React from "react";
import classes from "./Login.module.css";

function Login() {
  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <h2 className={classes.box__content__title}>Login</h2>
        <div className={classes.box__content__items}>
          <input type="text" placeholder="Username"/>
          <input type="text" placeholder="Password"/>
        </div>
        <div className={classes.box__content__btns}>
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
