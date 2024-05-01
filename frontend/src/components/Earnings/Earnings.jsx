import React, { useEffect } from "react";
import UserData from "../ExpensesEarnings/UserData";
import classes from "./Earnings.module.css";
import { useSelector, useDispatch } from "react-redux";
import { earningsActions } from "../../store/earnings-slice";

function Earnings() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const token = localStorage.getItem("token");

  const earningItems = useSelector((state) => state.earning.items);

  useEffect(() => {
    async function fetchEarnings() {
      const response = await fetch(
        `http://localhost:8080/expense-tracker/api/v1/earnings/pages/users/${user}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const resData = await response.json();

      dispatch(earningsActions.fetchEarnings(resData.content));
    }

    if (isAuthenticated) {
      fetchEarnings();
    }
  }, [isAuthenticated, user, token, dispatch]);

  return (
    <div className={classes.section}>
      <UserData
        items={earningItems}
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
