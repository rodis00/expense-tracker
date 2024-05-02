import React from "react";
import classes from "./Summaries.module.css";
import ChartLine from "../Chart/ChartLine";

function Summaries() {
  return (
    <div className={classes.section}>
      <div>
        <h2 className={classes.title}>Your Summaries</h2>
        <div>
          <ChartLine />
        </div>
      </div>
    </div>
  );
}

export default Summaries;
