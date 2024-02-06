import React, { useState } from "react";
import classes from "./UserData.module.css";
import ListData from "./ListData";
import Chart from "../Chart/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import YearFilter from "./YearFilter";

function UserData({ items, name }) {
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleFilteredYear = (year) => {
    setSelectedYear(year);
  };

  const filteredItems = items.filter((item) => {
    return item.date.getFullYear().toString() === selectedYear;
  });

  let amount = 0;

  for (const element of filteredItems) {
    amount += element.amount;
  }

  return (
    <>
      <h2 className={classes.total}>
        Total {name}:
        {amount <= 0 ? (
          ""
        ) : (
          <span>
            -{amount} <FontAwesomeIcon icon={faDollarSign} />
          </span>
        )}
      </h2>
      <Chart items={filteredItems} />
      <YearFilter selected={selectedYear} onYearChange={handleFilteredYear} />
      <div className={classes.section}>
        <ListData items={filteredItems} name="expenses" />
      </div>
    </>
  );
}

export default UserData;
