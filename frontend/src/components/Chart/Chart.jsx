import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import classes from "./Chart.module.css";
import { ChartDataPoints } from "./ChartDataPoints";

function Chart({ items, name }) {
  for (const elem of items) {
    const elemMonth = elem.date.getMonth();
    ChartDataPoints[elemMonth].value += elem.amount;
  }

  return (
    <div className={classes.chart}>
      <Bar
        data={{
          labels: ChartDataPoints.map((data) => data.label),
          datasets: [
            {
              label: "count",
              barThickness: 15,
              backgroundColor: name === "expenses" ? "red" : "limegreen",
              borderRadius: "20",
              data: ChartDataPoints.map((data) => data.value),
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
