import React, { useState } from "react";
import AllExpenses from "./AllExpenses";
import ExpensesForm from "./ExpensesForm";
import classes from "./Expenses.module.css";

const INITIAL_EXPENSES = [{
  id: 'e1',
  title: 'Doctor',
  price: 200,
  date: new Date(2021, 2, 28)
}]

function Expenses() {

  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  function handleNewExpense(expense){
    setExpenses((prevExpense)=>{
      return[expense, ...prevExpense];
    })
  }

  return (
    <div className={classes.section}>
      <ExpensesForm onSaveExpenseData={handleNewExpense}/>
      <AllExpenses items={expenses} />
    </div>
  );
}

export default Expenses;
