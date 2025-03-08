import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { ChartDataPoints } from "./ChartDataPoints";
import { fetchIncomeYears } from "../../http/incomeHttp";
import { fetchExpenseYears } from "../../http/expenseHttp";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import CustomSelect from "../customSelect/CustomSelect";
import GridChart from "./GridChart";

const LineChart = ({
  incomesData,
  expensesData,
  incomesPending,
  expensePending,
  changeYear,
  selectedYear,
}) => {
  let years = [];
  const token = localStorage.getItem("token");
  const userId = useSelector((state) => state.auth.user);
  const [selectGrid, setSelectGrid] = useState({
    x: false,
    y: false,
  });

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

  const handleToogleGrid = (grid) => {
    setSelectGrid((prev) => ({
      ...prev,
      [grid]: !prev[grid],
    }));
  };

  return (
    <div
      className={`h-[60vh] lg:h-[70vh] w-full lg:w-3/4 sm:pb-4 sm:px-4 md:rounded-2xl lg:rounded-3xl pt-12 md:pt-0 relative`}
    >
      <div className="absolute -top-4 right-1/2 whitespace-nowrap translate-x-1/2 md:-top-16 lg:translate-x-0 lg:right-0 lg:top-0">
        <span className="flex items-center">
          <span className="text-neutral-500 font-semibold mr-4">
            (Select year)
          </span>

          <CustomSelect
            divClass="w-24 relative mt-2"
            buttonClass="rounded-3xl h-12"
            bgClass="bg-neutral-800"
            isCategory={false}
            array={years}
            selectedValue={selectedYear}
            setValue={changeYear}
          />
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
                display: selectGrid.x,
                color: "rgba(200, 200, 200, 0.1)",
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
                display: selectGrid.y,
                color: "rgba(200, 200, 200, 0.1)",
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
      <GridChart handleToogleGrid={handleToogleGrid} lineChart={true} />
    </div>
  );
};

export default LineChart;
