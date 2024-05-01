import React, { useEffect } from "react";
import UserData from "../ExpensesEarnings/UserData";
import classes from "./Expenses.module.css";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-slice";

function Expenses() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const token = localStorage.getItem("token");

  const expenseItems = useSelector((state) => state.expense.items);

  useEffect(() => {
    async function fetchExpenses() {
      const response = await fetch(
        `http://localhost:8080/expense-tracker/api/v1/expenses/pages/users/${user}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const resData = await response.json();

      dispatch(expenseActions.fetchExpenses(resData.content));
    }

    if (isAuthenticated) {
      fetchExpenses();
    }
  }, [isAuthenticated, token, user, dispatch]);

  return (
    <div className={classes.section}>
      <UserData
        items={expenseItems}
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
