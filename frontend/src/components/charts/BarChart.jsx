import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { ChartDataPoints, ChartDataPointsDaily } from "./ChartDataPoints";
import { useQuery } from "@tanstack/react-query";
import { fetchIncomeYears } from "../../util/http/incomeHttp";
import { fetchExpenseYears } from "../../util/http/expenseHttp";

const BarChart = ({ selectedPoints, name, home, data }) => {
  let labels;
  let dataValues;
  let updatedData;
  let minYear;
  let YearlyDataPoints = [];
  const ChartDataPointsYearly = [];
  const MonthlyDataPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const WeeklyDataPoints = [0, 0, 0, 0, 0, 0, 0];
  const token = localStorage.getItem("token");

  const { data: dataYears } = useQuery({
    queryKey: name === "incomes" ? ["incomes", token] : ["expenses", token],
    queryFn:
      name === "incomes"
        ? () => fetchIncomeYears({ token })
        : () => fetchExpenseYears({ token }),
  });

  if (dataYears) {
    dataYears.forEach((item) => {
      ChartDataPointsYearly.push(item);
      YearlyDataPoints.push(0);
    });
    minYear = dataYears[0];
  } else {
    YearlyDataPoints = [];
  }

  if (data) {
    updatedData = data?.map((item) => ({
      ...item,
      value: name === "incomes" ? item.amount : item.price,
      date: new Date(item.date),
    }));
  } else {
    updatedData = [];
  }

  function changeDayIndex(dayIndex) {
    return dayIndex === 0 ? 6 : dayIndex - 1;
  }

  if (selectedPoints === "Monthly") {
    labels = ChartDataPoints;
    dataValues = MonthlyDataPoints;
  } else if (selectedPoints === "Weekly") {
    labels = ChartDataPointsDaily;
    dataValues = WeeklyDataPoints;
  } else {
    labels = ChartDataPointsYearly;
    dataValues = YearlyDataPoints;
  }

  for (const elem of updatedData) {
    const elemMonth = elem.date.getMonth();
    MonthlyDataPoints[elemMonth] += elem.value;
  }

  for (const elem of updatedData) {
    const elemDay = elem.date.getDay();
    const updatedDayIndex = changeDayIndex(elemDay);
    WeeklyDataPoints[updatedDayIndex] += elem.value;
  }

  for (const elem of updatedData) {
    const elemYear = elem.date.getFullYear();
    const index = elemYear - minYear;
    if (index >= 0 && index < ChartDataPointsYearly.length)
      YearlyDataPoints[index] += elem.value;
  }

  return (
    <div
      className={`h-[55vh] w-full md:w-10/12 ${
        home ? "lg:w-full" : "lg:w-3/4"
      } p-4 mt-8 rounded-3xl`}
    >
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: name === "incomes" ? "incomes" : "epxenses",
              barThickness: 15,
              backgroundColor: name === "incomes" ? "#28bf8a" : "#EF4444",
              borderRadius: "20",
              data: dataValues.map((data) => data),
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
                display: true,
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

export default BarChart;
