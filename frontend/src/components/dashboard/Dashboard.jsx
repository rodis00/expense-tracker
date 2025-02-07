import React, { useEffect } from "react";
import LineChart from "../charts/LineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faDollar,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import DashboardValueListElement from "./DashboardValueListElement";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchAllIncomes } from "../../util/http/incomeHttp";
import { fetchAllExpenses } from "../../util/http/expenseHttp";
import DateTransaction from "../../util/DateTransaction";
import { jwtDecode } from "jwt-decode";
import CategoryCases from "../../util/CategoryCases";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const username = jwtDecode(token).sub;
  const userId = useSelector((state) => state.auth.user);
  const year = new Date().getFullYear();
  const month = "";
  let incomesLatestAdded;
  let expenseLatestAdded;
  let combinedArray;
  let recentlyAdded;
  let incomes = 0;
  let expenses = 0;
  let balance = 0;
  let minIncome = 0;
  let maxIncome = 0;
  let minExpense = 0;
  let maxExpense = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: incomesData, isPending: incomesPending } = useQuery({
    queryKey: ["incomes", { userId, token, year, month }],
    queryFn: () => fetchAllIncomes({ userId, token, year, month }),
    enabled: !!userId,
  });

  const { data: expensesData, isPending: expensePending } = useQuery({
    queryKey: ["expenses", { userId, token, year, month }],
    queryFn: () => fetchAllExpenses({ userId, token, year, month }),
    enabled: !!userId,
  });

  if (incomesData && incomesData.length > 0) {
    incomesData.forEach((item) => (incomes += item.amount));
    minIncome = incomesData.reduce((item, current) => {
      return current.amount < item ? current.amount : item;
    }, incomesData[0].amount);
    maxIncome = incomesData.reduce((item, current) => {
      return current.amount > item ? current.amount : item;
    }, incomesData[0].amount);

    incomesLatestAdded = incomesData?.slice(-3);
  }

  if (expensesData && expensesData.length > 0) {
    expensesData.forEach((item) => (expenses += item.price));
    minExpense = expensesData.reduce((item, current) => {
      return current.price < item ? current.price : item;
    }, expensesData[0].price);
    maxExpense = expensesData.reduce((item, current) => {
      return current.price > item ? current.price : item;
    }, expensesData[0].price);

    expenseLatestAdded = expensesData?.slice(-3);
  }

  if (expensesData && incomesData) {
    balance = incomes - expenses;

    if (incomesLatestAdded === undefined) {
      incomesLatestAdded = [];
    }

    if (expenseLatestAdded === undefined) {
      expenseLatestAdded = [];
    }

    combinedArray = [...incomesLatestAdded, ...expenseLatestAdded];

    recentlyAdded = combinedArray.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  return (
    <main className="w-full min-h-screen flex flex-col text-white">
      <div className="text-center my-4">
        <h1 className="text-2xl text-neutral-600">Welcome back</h1>
        <span className="text-3xl font-semibold">{username  }</span>
      </div>
      <div className="flex flex-col items-center flex-grow mt-4">
        <section className="w-full md:w-3/4 lg:w-full h-full flex flex-col items-center justify-center">
          <ul className="w-full lg:w-[85%] flex flex-col xsm:flex-row justify-center items-center md:gap-8 ">
            <DashboardValueListElement
              border="border-yellow-500"
              color="text-yellow-500"
              title="Available balance"
              value={balance}
              icon={faDollar}
            />
            <DashboardValueListElement
              border="border-secondColor"
              color="text-secondColor"
              title="Incomes"
              value={incomes}
              icon={faArrowTrendUp}
            />
            <DashboardValueListElement
              border="border-red-400"
              color="text-red-400"
              title="Expenses"
              value={expenses}
              icon={faArrowTrendDown}
            />
          </ul>
          <div className="w-full mt-8 flex justify-center">
            <LineChart
              incomesData={incomesData}
              expensesData={expensesData}
              incomesPending={incomesPending}
              expensePending={expensePending}
            />
          </div>
        </section>

        <aside className="w-full md:w-3/4 flex flex-col items-center lg:w-1/2 h-full">
          <h2 className="text-center text-2xl lg:text-3xl mt-12 font-semibold">
            Recently Added
          </h2>
          <ul className="w-[95%] h-[40vh] flex flex-col mt-12 gap-8">
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
                  <CategoryCases category='clothes'/>
                </div>
                <div className="pl-4 flex flex-col gap-4 grow">
                  <h3 className="text-2xl">{item.title}</h3>
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
          <div className="flex justify-between mt-12 w-[95%]">
            <p className="text-neutral-600 pl-4">min</p>
            <h2 className="text-xl">Income</h2>
            <p className="text-neutral-600 pr-4">max</p>
          </div>
          <div className="flex w-[95%] h-16 mt-2 items-center justify-between rounded-3xl bg-thirdColor">
            <p className="pl-4 text-secondColor">{minIncome}$</p>
            <p className="pr-4 text-secondColor">{maxIncome}$</p>
          </div>
          <div className="flex justify-between mt-8 w-[95%]">
            <p className="text-neutral-600 pl-4">min</p>
            <h2 className="text-xl">Expense</h2>
            <p className="text-neutral-600 pr-4">max</p>
          </div>
          <div className="flex w-[95%] h-16 mt-2 items-center justify-between rounded-3xl bg-thirdColor mb-4">
            <p className="pl-4 text-red-500">{minExpense}$</p>
            <p className="pr-4 text-red-500">{maxExpense}$</p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Dashboard;
