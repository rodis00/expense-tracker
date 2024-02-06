import React, { useState } from "react";
import UserData from "../ExpensesEarnings/UserData";
import classes from "./Earnings.module.css";
import UserForm from "../ExpensesEarnings/UserForm";

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

  function handleNewEarning(earning) {
    setEarnings((prevEarning) => {
      return [earning, ...prevEarning];
    });
  }
  return (
    <div className={classes.section}>
      <UserForm
        onSaveUserData={handleNewEarning}
        name="earning"
        secondName="Earning"
        amount="Amount"
      />
      <UserData items={earnings} name="earnings" />
    </div>
  );
}

export default Earnings;
