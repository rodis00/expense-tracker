import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAllIncomes } from "../../util/http/incomeHttp";
import { fetchAllExpenses } from "../../util/http/expenseHttp";
import { useSelector } from "react-redux";
import DateTransaction from "../../util/DateTransaction";
import TruncateText from "../../util/TruncateText";
import CategoryCases from "../../util/CategoryCases";

const DashboardRecentlyAdded = () => {
  const userId = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const month = "";
  const year = "";
  let incomesLatestAdded;
  let expenseLatestAdded;
  let combinedArray;
  let recentlyAdded;

  const { data: incomesData } = useQuery({
    queryKey: ["incomes", { userId, token, year, month }],
    queryFn: () => fetchAllIncomes({ userId, token, year, month }),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });

  const { data: expensesData } = useQuery({
    queryKey: ["expenses", { userId, token, year, month }],
    queryFn: () => fetchAllExpenses({ userId, token, year, month }),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });

  if (incomesData && incomesData.length > 0) {
    incomesLatestAdded = incomesData?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (expensesData && expensesData.length > 0) {
    expenseLatestAdded = expensesData?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (expensesData && incomesData) {
    if (incomesLatestAdded === undefined) {
      incomesLatestAdded = [];
    }

    if (expenseLatestAdded === undefined) {
      expenseLatestAdded = [];
    }

    combinedArray = [...incomesLatestAdded, ...expenseLatestAdded];

    recentlyAdded = combinedArray.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return (
    <ul className="w-[95%] h-[40vh] flex flex-col mt-12 mb-12 md:mb-4 gap-8">
      {incomesData <= 0 && expensesData <= 0 && (
        <p className="text-neutral-400 text-center text-xl">
          You haven't added any transactions yet.
        </p>
      )}
      {recentlyAdded?.slice(0, 3).map((item) => (
        <li
          key={item.slug}
          className="w-full h-1/3 rounded-full bg-thirdColor flex justify-between items-center mb-4"
        >
          <div
            className={`h-14 w-14 sm:h-16 sm:w-16 border-2 ${
              item.amount ? "border-secondColor" : "border-red-500"
            } rounded-full ml-2 sm:ml-4 flex justify-center items-center`}
          >
            <CategoryCases category={item.category} />
          </div>
          <div className="pl-4 flex flex-col gap-4 grow">
            <h3 className="text-2xl">
              <TruncateText text={item.title} />
            </h3>
            <div className="flex">
              <p>
                {item.amount && (
                  <span className="text-secondColor font-bold text-[17px]">
                    {item.amount.toFixed(2)}$
                  </span>
                )}
                {item.price && (
                  <span className="text-red-500 font-bold text-[17px]">
                    {item.price.toFixed(2)}$
                  </span>
                )}{" "}
                - <DateTransaction date={item.date} />
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DashboardRecentlyAdded;
