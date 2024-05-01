import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import classes from "./Chart.module.css";

function Chart({ items, name }) {
  const chartDataPoints = [
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

  for (const elem of items) {
    const elemMonth = elem.date.getMonth();
    chartDataPoints[elemMonth].value += elem.amount;
  }

  return (
    <div className={classes.chart}>
      <Bar
        data={{
          labels: chartDataPoints.map((data) => data.label),
          datasets: [
            {
              label: "count",
              barThickness: 15,
              backgroundColor: name === "expenses" ? "red" : "limegreen",
              borderRadius: "20",
              data: chartDataPoints.map((data) => data.value),
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

export default Chart;
