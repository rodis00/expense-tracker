import React from "react";
import classes from "./Expenses.module.css";
import Button from "../Button/Button";

function Expenses() {

    const expenses = {
        id: 1,
        title: 'new computer',
        price: 3000,
        date: new Date('10-01-2024').toLocaleString(),
    }

  return (
    <>
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
      <Button type="submit" className={classes.expensesForm__btn}>Add expense</Button>
    </form>
    </div>

   <div className={classes.section}>
        <h2>Your Expenses</h2>
        <ul>
            <li id={expenses.id}><p>{expenses.title} {expenses.price}</p><span>{expenses.date}</span></li>
        </ul>
    </div> 
    </>
  );
}

export default Expenses;
