import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAllIncomes } from "../../http/incomeHttp";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { fetchAllExpenses } from "../../http/expenseHttp";

const Percentage = () => {
  const userId = useSelector((state) => state.auth.user);
  const location = useLocation();
  const resource = location.pathname.split("/")[1];
  const token = localStorage.getItem("token");
  const year = "";
  const currentYear = new Date().getFullYear();
  const month = "";
  const currentMonth = new Date().getMonth();
  let currentMonthValue = 0;
  let previousMonthValue = 0;
  let percent = 0;
  let icon;
  let comparisonText = "";
  let percentColor;

  const { data } = useQuery({
    queryKey:
      resource === "incomes"
        ? ["incomes", { userId, token, year, month }]
        : ["expenses", { userId, token, year, month }],
    queryFn:
      resource === "incomes"
        ? () => fetchAllIncomes({ userId, token, year, month })
        : () => fetchAllExpenses({ userId, token, year, month }),
    enabled: !!userId,
  });

  if (data) {
    data.forEach((item) => {
      const newDate = new Date(item.date);
      const itemMonth = newDate.getMonth();
      const itemYear = newDate.getFullYear();
      if (itemMonth === currentMonth && currentYear === itemYear) {
        currentMonthValue += resource === "incomes" ? item.amount : item.price;
      }
      if (itemMonth === currentMonth - 1 && currentYear === itemYear) {
        previousMonthValue += resource === "incomes" ? item.amount : item.price;
      }
      if (
        currentMonth === 0 &&
        itemMonth === 11 &&
        currentYear - 1 === itemYear
      ) {
        previousMonthValue += resource === "incomes" ? item.amount : item.price;
      }
    });

    if (previousMonthValue !== 0 && currentMonthValue !== 0) {
      percent =
        ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100;

      if (Math.abs(percent) < 100) {
        percent = percent.toFixed(2);
      } else {
        percent = percent.toFixed(0);
      }

      if (percent > 999) {
        percent = 999;
      }
    } else if (previousMonthValue === 0 && currentMonthValue !== 0) {
      percent = 100;
    } else if (previousMonthValue !== 0 && currentMonthValue === 0) {
      percent = -100;
    } else {
      percent = 0;
    }
  }

  if (percent > 0) {
    icon = faArrowUp;
    comparisonText = "more";
    percentColor = resource === "incomes" ? "text-secondColor" : "text-red-500";
  } else if (percent < 0) {
    icon = faArrowDown;
    comparisonText = "less";
    percentColor = resource === "incomes" ? "text-red-500" : "text-secondColor";
  } else {
    icon = faMinus;
    comparisonText = "equal";
    percentColor = "text-neutral-600";
  }

  return (
    <>
      <div className="px-4 mt-8 min-h-16 flex items-center justify-center shadow-lg shadow-neutral-800 bg-thirdColor rounded-full w-auto md:w-3/5 lg:w-auto">
        <span
          className={`${percentColor} px-4 text-xl flex items-center gap-2`}
        >
          <FontAwesomeIcon icon={icon} /> {Math.abs(percent)}%
        </span>
        <p className="px-4 border-l-2 border-neutral-600 py-2 sm:py-0">
          This month you are {resource === "incomes" ? "receiving" : "spending"}{" "}
          {comparisonText} compared to the previous month
        </p>
      </div>
    </>
  );
};

export default Percentage;
