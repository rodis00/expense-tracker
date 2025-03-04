import React from "react";

const DateTransaction = ({ date, form }) => {
  const newDate = new Date(date);
  const month = newDate.toLocaleString("pl-PL", { month: "2-digit" });
  const day = newDate.toLocaleString("pl-PL", { day: "2-digit" });
  const year = newDate.getFullYear();

  return (
    <span className={`${form ? "text-white" : "text-neutral-400"}`}>
      <span>{day}.</span>
      <span>{month}.</span>
      <span>{year}</span>
    </span>
  );
};

export default DateTransaction;
