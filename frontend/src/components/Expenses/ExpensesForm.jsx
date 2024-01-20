import React, { useState } from "react";
import classes from "./Expenses.module.css";

function ExpensesForm({ onSaveExpenseData }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  function handleTitleChange(event) {
    setEnteredTitle((title) => (title = event.target.value));
  }

  function handlePriceChange(event) {
    setEnteredPrice((price) => (price = event.target.value));
  }

  function handleDateChange(event) {
    setEnteredDate((date) => (date = event.target.value));
  }

  function submitHandler(event) {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      price: +enteredPrice,
      date: new Date(enteredDate),
    };

    onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredPrice("");
    setEnteredDate("");
  }

  return (
    <form onSubmit={submitHandler} className={classes.expensesForm}>
      <div className={classes.expensesForm__expensesData}>
        <div className={classes.expensesForm__expenseData}>
          <label>Expense Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className={classes.expensesForm__expenseData}>
          <label>Price</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredPrice}
            onChange={handlePriceChange}
          />
        </div>
        <div className={classes.expensesForm__expenseData}>
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            value={enteredDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <button type="submit" className={classes.expensesForm__btn}>
        Add expense
      </button>
    </form>
  );
}

export default ExpensesForm;
