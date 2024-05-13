import React, { useEffect, useState } from "react";
import classes from "./Summaries.module.css";
import { fetchAllEarnings, fetchAllExpenses } from "./FetchExpensesEarnings";
import { useDispatch, useSelector } from "react-redux";
import SummariesContent from "./SummariesContent";

function Summaries() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const token = localStorage.getItem("token");

  const allExpenses = useSelector((state) => state.allExpenses.items);

  const allEarnings = useSelector((state) => state.allEarnings.items);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllExpenses(user, token, dispatch);
      fetchAllEarnings(user, token, dispatch);
    }
  }, [user, token, isAuthenticated, dispatch]);

  return (
    <div className={classes.section}>
      <div>
        <h2 className={classes.title}>Your Summaries</h2>
        <SummariesContent allExpenses={allExpenses} allEarnings={allEarnings} />
      </div>
    </div>
  );
}

export default Summaries;
