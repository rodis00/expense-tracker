import React, { useEffect } from "react";
import UserData from "../ExpensesEarnings/UserData";
import classes from "./Expenses.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses } from "./FetchExpenses";
import { fetchAllExpenses } from "../Summaries/FetchExpensesEarnings";

function Expenses() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const expenseItems = useSelector((state) => state.expense.items);
  const expensePageNumber = useSelector((state) => state.expense.pageNumber);
  const expenseYear = useSelector((state) => state.expense.year);
  const allExpenses = useSelector((state) => state.allExpenses.items);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated) {
      fetchExpenses(user, token, expensePageNumber, expenseYear, dispatch);
      fetchAllExpenses(user, token, dispatch);
    }
  }, [isAuthenticated, token, user, expensePageNumber, expenseYear, dispatch]);

  return (
    <div className={classes.section}>
      <UserData
        items={expenseItems}
        allItems={allExpenses}
        name="expenses"
        secondName="expense"
        upperName="Expense"
        amountName="Price"
        secondAmountName="price"
      />
    </div>
  );
}

export default Expenses;
