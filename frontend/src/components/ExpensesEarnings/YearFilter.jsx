import React from "react";
import classes from "./YearFilter.module.css";

function YearFilter({ selected, onYearChange }) {
  const handleYearChange = (event) => {
    onYearChange(event.target.value);
  };

  return (
    <div className={classes.filter}>
      <label>Filter by year</label>
      <select value={selected} onChange={handleYearChange}>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>
    </div>
  );
}

export default YearFilter;
