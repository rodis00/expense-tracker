import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import classes from "./Chart.module.css";

function ChartLine({ expenses, earnings }) {
  const ChartDataPointsExpenses = [
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

  const ChartDataPointsEarnings = [
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

  for (const elem of expenses) {
    const elemMonth = elem.date.getMonth();
    ChartDataPointsExpenses[elemMonth].value += elem.amount;
  }

  for (const elem of earnings) {
    const elemMonth = elem.date.getMonth();
    ChartDataPointsEarnings[elemMonth].value += elem.amount;
  }

  return (
    <div className={classes.chart}>
      <Line
        data={{
          labels: ChartDataPointsExpenses.map((data) => data.label),
          datasets: [
            {
              label: "expenses",
              data: ChartDataPointsExpenses.map((data) => data.value),
              backgroundColor: "red",
              borderColor: "red",
            },
            {
              label: "earnings",
              data: ChartDataPointsEarnings.map((data) => data.value),
              backgroundColor: "limegreen",
              borderColor: "limegreen",
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
            },
            y: {
              ticks: {
                color: "white",
              },
            },
          },
        }}
      />
    </div>
  );
}

export default ChartLine;
