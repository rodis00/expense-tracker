import React from "react";
import classes from "./Expenses.module.css";

function Expenses() {
  return (
    <div className={classes.boxForm}>
    <form action="" className={classes.expensesForm}>
      <div className={classes.expensesForm__expensesData}>
        <div className={classes.expensesForm__expenseData}>
          <label>Expense Title</label>
          <input type="text" />
        </div>
        <div className={classes.expensesForm__expenseData}>
          <label>Price</label>
          <input type="number" name="" id="" />
        </div>
        <div className={classes.expensesForm__expenseData}>
          <label>Date</label>
          <input type="date" />
        </div>
      </div>
      <button type="submit" className={classes.expensesForm__btn}>Add expense</button>
    </form>
    </div>
  );
}

export default Expenses;
