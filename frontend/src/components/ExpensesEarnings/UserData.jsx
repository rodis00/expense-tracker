import React from "react";
import classes from "./UserData.module.css";
import ListData from "./ListData";

function AllExpenses({ items }) {
  return (
    <>
      <h2 className={classes.total}>Total expenses: </h2>
      <div className={classes.section}>
        <ListData items={items} />
      </div>
    </>
  );
}

export default AllExpenses;
