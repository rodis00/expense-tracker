import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAllIncomes } from "./http/incomeHttp";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Percentage = () => {
  const userId = useSelector((state) => state.auth.user);
  const location = useLocation();
  const resource = location.pathname.split("/")[1];
  const token = localStorage.getItem("token");
  const year = new Date().getFullYear();
  const month = "";
  const currentMonth = new Date().getMonth();
  let currentMonthValue = 0;
  let previousMonthValue = 0;
  let percent = 0;

  const { data, isPending, isError, error } = useQuery({
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
      if (itemMonth === currentMonth && year === itemYear) {
        currentMonthValue += resource === "incomes" ? item.amount : item.price;
      }
      if (itemMonth === currentMonth - 1 && year === itemYear) {
        previousMonthValue += resource === "incomes" ? item.amount : item.price;
      }
    });
    if (previousMonthValue !== 0) {
      percent = (
        ((currentMonthValue - previousMonthValue) / previousMonthValue) *
        100
      ).toFixed(0);
    } else {
      percent = 100;
    }
  }

  return (
    <>
      {resource === "incomes" ? (
        <div className="w-[95%] sm:w-3/4 md:w-1/2 lg:w-1/3 h-20 lg:h-16 mt-4 bg-thirdColor rounded-full flex items-center justify-around text-lg shadow-lg shadow-neutral-800">
          <span
            className={`${
              percent > 0 ? "text-secondColor" : "text-red-500"
            } w-28 pl-4 text-xl`}
          >
            <FontAwesomeIcon icon={percent >= 0 ? faArrowUp : faArrowDown} />{" "}
            {Math.abs(percent)}%
          </span>
          <p className="pl-2 pr-4 sm:pr-8 md:pr-4">
            This month you are receving {percent >= 0 ? "more" : "less"}{" "}
            compared to the previous month
          </p>
        </div>
      ) : (
        <div className="w-[95%] sm:w-3/4 md:w-1/2 lg:w-1/3 h-20 lg:h-16 mt-4 bg-thirdColor rounded-full flex items-center justify-around text-lg shadow-lg shadow-neutral-800">
          <span
            className={`${
              percent > 0 ? "text-red-500" : "text-secondColor"
            } w-28 pl-4 text-xl`}
          >
            <FontAwesomeIcon icon={percent >= 0 ? faArrowUp : faArrowDown} />{" "}
            {Math.abs(percent)}%
          </span>
          <p className="pl-2 pr-4 sm:pr-8 md:pr-4">
            This month you are spending {percent >= 0 ? "more" : "less"}{" "}
            compared to the previous month
          </p>
        </div>
      )}
    </>
  );
};

export default Percentage;
