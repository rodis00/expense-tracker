import React, { useEffect, useState } from "react";
import LineChart from "../../components/charts/LineChart";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faDollar,
} from "@fortawesome/free-solid-svg-icons";
import DashboardValueListElement from "./DashboardValueListElement";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchAllIncomes } from "../../http/incomeHttp";
import { fetchAllExpenses } from "../../http/expenseHttp";
import DoughnutChart from "../../components/charts/DoughnutChart";
import DashboardRecentlyAdded from "./DashboardRecentlyAdded";
import FullScreenLoader from "../../components/fullScreenLoader/FullScreenLoader";
import useLoader from "../../hooks/useLoader";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const userId = useSelector((state) => state.auth.user);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const month = "";
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
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });

  const { data: expensesData, isPending: expensePending } = useQuery({
    queryKey: ["expenses", { userId, token, year, month }],
    queryFn: () => fetchAllExpenses({ userId, token, year, month }),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
  const isFetching = incomesPending || expensePending;
  const isLoading = useLoader(isFetching);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (incomesData && incomesData.length > 0) {
    incomesData.forEach((item) => (incomes += item.amount));
    minIncome = incomesData.reduce((item, current) => {
      return current.amount < item ? current.amount : item;
    }, incomesData[0].amount);
    maxIncome = incomesData.reduce((item, current) => {
      return current.amount > item ? current.amount : item;
    }, incomesData[0].amount);
  }

  if (expensesData && expensesData.length > 0) {
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
        <span className="text-3xl font-semibold">{userId}</span>
      </div>
      <div className="flex flex-col items-center flex-grow mt-4">
        <section className="w-full md:w-3/4 lg:w-full h-full flex flex-col items-center justify-center ">
          <ul className="w-full lg:w-[85%] flex flex-col xsm:flex-row justify-center items-center md:gap-8 md:mb-12 lg:mb-0 ">
            <DashboardValueListElement
              border="border-yellow-500"
              color="text-yellow-500"
              title="Balance"
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
              border="border-red-500"
              color="text-red-500"
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
              changeYear={setYear}
              selectedYear={year}
            />
          </div>
        </section>

        <h2 className="text-3xl font-semibold mb-12 mt-40 lg:mt-24">
          Transactions by categories
        </h2>

        <section className="w-full flex flex-col xlg:flex-row xlg:justify-center items-center gap-8">
          <div className="w-full md:w-4/5 lg:w-3/5 xlg:w-2/5 bg-thirdColor pb-4 sm:pb-12 rounded-xl xlg:pr-8">
            <h2 className="text-2xl font-semibold text-secondColor text-left ml-4 sm:ml-12 xlg:ml-32 my-8">
              Incomes
              <span className="text-neutral-500 text-base pl-4">
                (by category)
              </span>
            </h2>
            <DoughnutChart data={incomesData} isPending={incomesPending} />
          </div>
          <div className="w-full md:w-4/5 lg:w-3/5 xlg:w-2/5 bg-thirdColor pb-4 sm:pb-12 rounded-xl xlg:pr-8">
            <h2 className="text-2xl font-semibold text-red-500 text-left ml-4 sm:ml-12 xlg:ml-32 my-8">
              Expenses
              <span className="text-neutral-500 text-base pl-4">
                (by category)
              </span>
            </h2>
            <DoughnutChart data={expensesData} isPending={expensePending} />
          </div>
        </section>
        <aside className="w-full md:w-3/4 flex flex-col items-center lg:w-1/2 h-full mb-8">
          <h2 className="text-center text-2xl lg:text-3xl mt-12 font-semibold">
            Recently Added
          </h2>
          <DashboardRecentlyAdded />
          <div className="flex justify-between mt-12 w-[95%]">
            <p className="text-neutral-600 pl-4">min</p>
            <h2 className="text-xl">Income</h2>
            <p className="text-neutral-600 pr-4">max</p>
          </div>
          <div className="flex w-[95%] h-16 mt-2 items-center justify-between rounded-3xl bg-thirdColor">
            <p className="pl-4 text-secondColor">{minIncome.toFixed(2)}$</p>
            <p className="pr-4 text-secondColor">{maxIncome.toFixed(2)}$</p>
          </div>
          <div className="flex justify-between mt-8 w-[95%]">
            <p className="text-neutral-600 pl-4">min</p>
            <h2 className="text-xl">Expense</h2>
            <p className="text-neutral-600 pr-4">max</p>
          </div>
          <div className="flex w-[95%] h-16 mt-2 items-center justify-between rounded-3xl bg-thirdColor mb-4">
            <p className="pl-4 text-red-500">{minExpense.toFixed(2)}$</p>
            <p className="pr-4 text-red-500">{maxExpense.toFixed(2)}$</p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Dashboard;
