import React from "react";
import classes from "./Date.module.css";

function Date({ date }) {
  const month = date.toLocaleString("pl-PL", { month: "long" });
  const day = date.toLocaleString("pl-PL", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <div className={classes.dateSection}>
      <div className="date-year">{year}</div>
      <div className="date-month">{month}</div>
      <div className="date-day">{day}</div>
    </div>
  );
}

export default Date;
