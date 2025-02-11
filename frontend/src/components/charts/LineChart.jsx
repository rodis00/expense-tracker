import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { ChartDataPoints } from "./ChartDataPoints";

const LineChart = ({
  incomesData,
  expensesData,
  incomesPending,
  expensePending,
}) => {
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
      <h2 className=" w-1/3 h-8 top-4 text-right pr-4 md:top-1 text-xl absolute left-2/3 uppercase font-semibold text-neutral-500">
        This Year
      </h2>
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
