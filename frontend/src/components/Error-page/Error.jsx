import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import classes from "./Error.module.css";

function Error() {
  const error = useRouteError();

  const naviagte = useNavigate();

  let title = "An error occured!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  function handleBack() {
    naviagte("/");
  }

  return (
    <div className={classes.errorbox}>
      <div className={classes.errorPage}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={handleBack}>Go back</button>
      </div>
    </div>
  );
}

export default Error;
