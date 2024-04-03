import React, { useState } from "react";
import UserData from "../ExpensesEarnings/UserData";
import classes from "./Expenses.module.css";
import UserForm from "../ExpensesEarnings/UserForm";

const INITIAL_EXPENSES = [
  {
    id: "e1",
    title: "Doctor",
    amount: 200,
    date: new Date(2021, 2, 28),
  },
];

function Expenses() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  function handleNewExpense(expense) {
    setExpenses((prevExpense) => {
      return [expense, ...prevExpense];
    });
  }

  return (
    <div className={classes.section}>
      <UserData
        items={expenses}
        name="expenses"
        secondName="expense"
        upperName="Expense"
        amountName="Price"
      />
    </div>
  );
}

export default Expenses;
