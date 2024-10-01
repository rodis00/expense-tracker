import React from "react";
import LineChart from "../charts/LineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faDollar,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { DUMMY_DATA_EXPENSES } from "../../DummyData";
import DashboardValueListElement from "./DashboardValueListElement";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchAllIncomes } from "../../util/http/incomeHttp";
import { fetchAllExpenses } from "../../util/http/expenseHttp";

const Dashboard = () => {
  const testArray = DUMMY_DATA_EXPENSES.slice(0, 3);
  const token = localStorage.getItem("token");
  const userId = useSelector((state) => state.auth.user);
  let incomes = 0;
  let expenses = 0;
  let balance = 0;
  let minIncome = 0;
  let maxIncome = 0;
  let minExpense = 0;
  let maxExpense = 0;

  const { data: incomesData, isPending: incomesPending } = useQuery({
    queryKey: ["incomes", { userId, token }],
    queryFn: () => fetchAllIncomes({ userId, token }),
    enabled: !!userId,
  });

  const { data: expensesData, isPending: expensePending } = useQuery({
    queryKey: ["expenses", { userId, token }],
    queryFn: () => fetchAllExpenses({ userId, token }),
    enabled: !!userId,
  });

  if (incomesData) {
    incomesData.forEach((item) => (incomes += item.amount));
    minIncome = incomesData.reduce((item, current) => {
      return current.amount < item ? current.amount : item;
    }, incomesData[0].amount);
    maxIncome = incomesData.reduce((item, current) => {
      return current.amount > item ? current.amount : item;
    }, incomesData[0].amount);
  }

  if (expensesData) {
    expensesData.forEach((item) => (expenses += item.price));
    minExpense = expensesData.reduce((item, current) => {
      return current.price < item ? current.price : item;
    }, expensesData[0].price);
    maxExpense = expensesData.reduce((item, current) => {
      return current.price > item ? current.price : item;
    }, expensesData[0].price);
  }

  if (expensesData && incomesData) {
    balance = incomes - expenses;
  }

  return (
    <main className="w-full min-h-screen flex flex-col text-white">
      <div className="text-center my-4">
        <h1 className="text-2xl text-neutral-600">Welcome back</h1>
        <span className="text-3xl font-semibold">User</span>
      </div>
      <div className="flex flex-col items-center flex-grow mt-12 lg:items-start lg:flex-row lg:ml-12">
        <section className="w-full md:w-3/4 lg:w-[70%] h-full flex flex-col items-center justify-center">
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

        <aside className="w-full md:w-3/4 flex flex-col items-center lg:w-[30%] h-full">
          <h2 className="text-center text-2xl mt-8 lg:-mt-2 font-semibold">
            Recently Added
          </h2>
          <ul className="w-[95%] h-[40vh] flex flex-col mt-8 gap-8">
            {testArray.map((item) => (
              <li
                key={item.id}
                className="w-full h-1/3 rounded-full bg-thirdColor flex justify-between items-center"
              >
                <div className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-secondColor rounded-full ml-2 sm:ml-4 flex justify-center items-center">
                  <FontAwesomeIcon icon={faBriefcase} className="text-2xl" />
                </div>

                <h3 className="text-xl text-left pl-4 grow">{item.title}</h3>
                <p className="pr-4 text-center text-red-500">{item.amount}$</p>
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
