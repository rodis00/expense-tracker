import React, { useState } from "react";
import UserData from "../ExpensesEarnings/UserData";
import classes from "./Earnings.module.css";

const INITIAL_EARNINGS = [
  {
    id: "e1",
    title: "Work",
    amount: 200,
    date: new Date(2021, 2, 28),
  },
];

function Earnings() {
  const [earnings, setEarnings] = useState(INITIAL_EARNINGS);

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
      />
    </div>
  );
}

export default Earnings;
