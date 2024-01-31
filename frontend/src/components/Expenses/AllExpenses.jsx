import React from "react";
import ExpenseList from "./ExpenseList";
import classes from "./AllExpenses.module.css";

function AllExpenses({ items }) {
  return (
    <>
      <h2 className={classes.total}>Total expenses: </h2>
      <div className={classes.section}>
        <ExpenseList items={items} />
      </div>
    </>
  );
}

export default AllExpenses;
