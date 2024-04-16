import React, { useCallback, useEffect, useState } from "react";
import UserData from "../ExpensesEarnings/UserData";
import classes from "./Earnings.module.css";
import { useSelector } from "react-redux";

const EARNINGS = [];

function Earnings() {
  const [earnings, setEarnings] = useState([]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const token = localStorage.getItem("token");

  const fetchExpenses = useCallback(async () => {
    if (isAuthenticated) {
      const response = await fetch(
        `http://localhost:8080/expense-tracker/api/v1/earnings/pages/users/${user}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const resData = await response.json();

      resData.content.map((item) => {
        let date = new Date(item.date);
        const newEarning = {
          id: item.id,
          title: item.title,
          amount: +item.amount,
          date,
        };

        const isExisting = EARNINGS.some((item) => {
          return item.id === newEarning.id;
        });

        if (!isExisting) EARNINGS.push(newEarning);

        return EARNINGS;
      });
      setEarnings(EARNINGS);
    }
  }, [isAuthenticated, user, token]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // function handleNewEarning(earning) {
  //   setEarnings((prevEarning) => {
  //     return [earning, ...prevEarning];
  //   });
  // }
  
  return (
    <div className={classes.section}>
      <UserData
        items={earnings}
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
