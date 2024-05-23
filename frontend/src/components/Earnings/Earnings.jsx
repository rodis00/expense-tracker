import React, { useEffect } from "react";
import UserData from "../ExpensesEarnings/UserData";
import classes from "./Earnings.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchEarnings } from "./FetchEarnings";
import { fetchAllEarnings } from "../Summaries/FetchExpensesEarnings";

function Earnings() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const earningItems = useSelector((state) => state.earning.items);
  const earningsPageNumber = useSelector((state) => state.earning.pageNumber);
  const earningYear = useSelector((state) => state.earning.year);
  const allEarnings = useSelector((state) => state.allEarnings.items);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated) {
      fetchEarnings(user, token, earningsPageNumber, earningYear, dispatch);
      fetchAllEarnings(user, token, dispatch);
    }
  }, [isAuthenticated, user, token, earningsPageNumber, earningYear, dispatch]);

  return (
    <div className={classes.section}>
      <UserData
        items={earningItems}
        allItems={allEarnings}
        name="earnings"
        secondName="earning"
        upperName="Earning"
        amountName="Amount"
        secondAmountName="amount"
      />
    </div>
  );
}

export default Earnings;
