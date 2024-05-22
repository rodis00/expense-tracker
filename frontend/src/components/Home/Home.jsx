import React from "react";
import { useSelector } from "react-redux";
import classes from "./Home.module.css";
function Home() {
  const user = useSelector((state) => state.auth.user);

  return <div className={classes.home}>Hello this is your id: {user}</div>;
}

export default Home;
