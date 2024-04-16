import React, { useCallback, useEffect, useState } from "react";
import UserData from "../ExpensesEarnings/UserData";
import classes from "./Expenses.module.css";
import { useSelector } from "react-redux";

const EXPENSES = [];

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const token = localStorage.getItem("token");

  const fetchExpenses = useCallback(async () => {
    if (isAuthenticated) {
      const response = await fetch(
        `http://localhost:8080/expense-tracker/api/v1/expenses/pages/users/${user}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const resData = await response.json();

      resData.content.map((item) => {
        let date = new Date(item.date);
        const newExpense = {
          id: item.id,
          title: item.title,
          amount: +item.price,
          date,
        };

        const isExisting = EXPENSES.some((item) => {
          return item.id === newExpense.id;
        });

        if (!isExisting) EXPENSES.push(newExpense);

        return EXPENSES;
      });
      setExpenses(EXPENSES);
    }
  }, [isAuthenticated, user, token]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // function handleNewExpense(expense) {
  //   setExpenses((prevExpense) => {
  //     return [expense, ...prevExpense];
  //   });
  // }

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
