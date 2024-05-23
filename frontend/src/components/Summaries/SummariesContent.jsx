import React, { useEffect, useState } from "react";
import ChartLine from "../Chart/ChartLine";
import YearFilter from "../ExpensesEarnings/YearFilter";
import classes from "./SummariesContent.module.css";

function SummariesContent({ allExpenses, allEarnings }) {
  const [allNewExpenses, setAllNewExpenses] = useState([]);
  const [allNewEarnings, setAllNewEarnings] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024");

  let totalExpenses = 0;
  let totalEarnings = 0;

  useEffect(() => {
    const modifiedExpenses = allExpenses.map((item) => {
      return {
        id: item.id,
        title: item.title,
        amount: item.price,
        date: new Date(item.date),
      };
    });
    setAllNewExpenses(modifiedExpenses);
  }, [allExpenses]);

  useEffect(() => {
    const modifiedEarnings = allEarnings.map((item) => {
      return {
        id: item.id,
        title: item.title,
        amount: item.amount,
        date: new Date(item.date),
      };
    });
    setAllNewEarnings(modifiedEarnings);
  }, [allEarnings]);

  function handleFilteredYear(year) {
    setSelectedYear(year);
  }

  const filteredExpenses = allNewExpenses.filter((item) => {
    return item.date.getFullYear().toString() === selectedYear;
  });

  const filteredEarnings = allNewEarnings.filter((item) => {
    return item.date.getFullYear().toString() === selectedYear;
  });

  for (const elem of filteredExpenses) {
    totalExpenses += elem.amount;
  }

  for (const elem of filteredEarnings) {
    totalEarnings += elem.amount;
  }

  let balans = totalEarnings - totalExpenses;

  return (
    <>
      <div>
        <ChartLine expenses={filteredExpenses} earnings={filteredEarnings} />
      </div>
      <div className={classes.filter}>
        <YearFilter
          selected={selectedYear}
          onYearChange={handleFilteredYear}
          summaries={true}
        />
      </div>
      <section className={classes.section}>
        <div>
          <p>Total expenses in this year:</p>
          <span className={`${classes.box} ${classes.box1}`}>
            {totalExpenses} $
          </span>
        </div>
        <div>
          <p>Your balance:</p>
          <span className={`${classes.box} ${classes.box2}`}>{balans} $</span>
        </div>
        <div>
          <p>Total earnings in this year:</p>
          <span className={`${classes.box} ${classes.box3}`}>
            {totalEarnings} $
          </span>
        </div>
      </section>
    </>
  );
}

export default SummariesContent;
