import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { ChartDataPoints } from "./ChartDataPoints";
import { fetchIncomeYears } from "../../util/http/incomeHttp";
import { fetchExpenseYears } from "../../util/http/expenseHttp";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const LineChart = ({
  incomesData,
  expensesData,
  incomesPending,
  expensePending,
  changeYear,
}) => {
  let years = [];
  const token = localStorage.getItem("token");
  const userId = useSelector((state) => state.auth.user);

  const { data: incomeYears } = useQuery({
    queryKey: ["incomes", token, userId],
    queryFn: () => fetchIncomeYears({ token, userId }),
    enabled: !!userId,
  });

  const { data: expenseYears } = useQuery({
    queryKey: ["expenses", token, userId],
    queryFn: () => fetchExpenseYears({ token, userId }),
    enabled: !!userId,
  });

  if (incomeYears) {
    incomeYears.forEach((item) => {
      const isDuplicate = years.some((elem) => elem === item);
      if ((years.length > 0 && !isDuplicate) || years.length === 0) {
        years.push(item);
      }
    });
  }

  if (expenseYears) {
    expenseYears.forEach((item) => {
      const isDuplicate = years.some((elem) => elem === item);
      if ((years.length > 0 && !isDuplicate) || years.length === 0) {
        years.push(item);
      }
    });
  }

  const ChartDataPointsEarnings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const ChartDataPointsExpenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  if (incomesPending || expensePending) {
    return <div>Loading...</div>;
  }

  if (!incomesData) {
    return [];
  }

  if (!expensesData) {
    return [];
  }

  for (const elem of incomesData) {
    const elemMonth = new Date(elem.date).getMonth();
    ChartDataPointsEarnings[elemMonth] += elem.amount;
  }

  for (const elem of expensesData) {
    const elemMonth = new Date(elem.date).getMonth();
    ChartDataPointsExpenses[elemMonth] += elem.price;
  }

  return (
    <div
      className={`h-[60vh] lg:h-[70vh] w-full lg:w-3/4 sm:pb-4 sm:px-4 md:rounded-2xl lg:rounded-3xl pt-12 md:pt-0 relative`}
    >
      <div className="absolute -top-4 right-1/2 whitespace-nowrap translate-x-1/2 md:-top-16 lg:translate-x-0 lg:right-0 lg:top-0">
        <span className="flex items-center">
          <span className="text-neutral-500 font-semibold mr-4">
            (Select year)
          </span>
          <span className="flex px-2 bg-neutral-800 rounded-full">
            <select
              name="years"
              id="years"
              className="bg-neutral-800 text-white focus:outline-none w-24 h-12 lg:h-10 pl-4 rounded-3xl border-none focus:ring-0"
              onChange={(e) => changeYear(e.target.value)}
            >
              {years?.reverse().map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </span>
        </span>
      </div>

      <Line
        data={{
          labels: ChartDataPoints,
          datasets: [
            {
              label: "expenses",
              data: ChartDataPointsExpenses.map((data) => data),
              backgroundColor: "#D74949",
              borderColor: "#D74949",
            },
            {
              label: "earnings",
              data: ChartDataPointsEarnings.map((data) => data),
              backgroundColor: "#28bf8a",
              borderColor: "#28bf8a",
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: "white",
              },
              grid: {
                display: false,
              },
              title: {
                display: false,
                text: "Months",
                color: "rgb(100,100,100)",
                font: {
                  size: "20px",
                },
              },
            },
            y: {
              ticks: {
                color: "white",
              },
              grid: {
                display: false,
              },
              title: {
                display: false,
                text: "Currency - $",
                color: "rgb(100,100,100)",
                font: {
                  size: "20px",
                },
              },
            },
          },
          plugins: {
            datalabels: {
              display: false,
            },
            legend: {
              labels: {
                font: {
                  size: "17px",
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
