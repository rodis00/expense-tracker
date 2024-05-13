import React, { useEffect, useState } from "react";
import ChartLine from "../Chart/ChartLine";
import YearFilter from "../ExpensesEarnings/YearFilter";

function SummariesContent({ allExpenses, allEarnings }) {
  const [allNewExpenses, setAllNewExpenses] = useState([]);
  const [allNewEarnings, setAllNewEarnings] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024");

  useEffect(() => {
    allExpenses.forEach((item) => {
      let newDate = new Date(item.date);
      const newItem = {
        id: item.id,
        title: item.title,
        amount: item.price,
        date: newDate,
      };
      const isExisting = allNewExpenses.some((elem) => {
        return elem.id === item.id;
      });

      if (!isExisting) {
        setAllNewExpenses((prev) => [newItem, ...prev]);
      }
    });
  }, [allExpenses, allNewExpenses]);

  useEffect(() => {
    allEarnings.forEach((item) => {
      let newDate = new Date(item.date);
      const newItem = {
        id: item.id,
        title: item.title,
        amount: item.amount,
        date: newDate,
      };

      const isExisting = allNewEarnings.some((elem) => {
        return elem.id === item.id;
      });

      if (!isExisting) {
        setAllNewEarnings((prev) => [newItem, ...prev]);
      }
    });
  }, [allEarnings, allNewEarnings]);

  function handleFilteredYear(year) {
    setSelectedYear(year);
  }

  const filteredExpenses = allNewExpenses.filter((item) => {
    return item.date.getFullYear().toString() === selectedYear;
  });

  const filteredEarnings = allNewEarnings.filter((item) => {
    return item.date.getFullYear().toString() === selectedYear;
  });

  return (
    <>
      <div>
        <ChartLine expenses={filteredExpenses} earnings={filteredEarnings} />
      </div>
      <YearFilter selected={selectedYear} onYearChange={handleFilteredYear} />
    </>
  );
}

export default SummariesContent;
