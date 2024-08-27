import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import {
  ChartDataPoints,
  ChartDataPointsDaily,
  ChartDataPointsYearly,
} from "./ChartDataPoints";
import { DUMMY_DATA_EARNINGS } from "../../DummyData";

const BarChart = ({ selectedPoints, name, home }) => {
  let labels;
  let dataValues;

  const MonthlyDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  const WeeklyDataPoints = [
    { label: "Mon", value: 0 },
    { label: "Tue", value: 0 },
    { label: "Wed", value: 0 },
    { label: "Thu", value: 0 },
    { label: "Fri", value: 0 },
    { label: "Sat", value: 0 },
    { label: "Sun", value: 0 },
  ];

  const YearlyDataPoints = [
    { label: 2021, value: 0 },
    { label: 2022, value: 0 },
    { label: 2023, value: 0 },
    { label: 2024, value: 0 },
    { label: 2025, value: 0 },
    { label: 2026, value: 0 },
    { label: 2027, value: 0 },
    { label: 2028, value: 0 },
  ];

  const minYear = 2021;

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

  for (const elem of DUMMY_DATA_EARNINGS) {
    const elemMonth = elem.date.getMonth();
    MonthlyDataPoints[elemMonth].value += elem.amount;
  }

  for (const elem of DUMMY_DATA_EARNINGS) {
    const elemDay = elem.date.getDay();
    WeeklyDataPoints[elemDay].value += elem.amount;
  }

  for (const elem of DUMMY_DATA_EARNINGS) {
    const elemYear = elem.date.getFullYear();
    const index = elemYear - minYear;
    if (index >= 0 && index < ChartDataPointsYearly.length)
      YearlyDataPoints[index].value += elem.amount;
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
              data: dataValues.map((data) => data.value),
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
