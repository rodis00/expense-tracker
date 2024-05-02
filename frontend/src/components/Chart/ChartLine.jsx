import React from "react";
import { ChartDataPoints } from "./ChartDataPoints";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import classes from "./Chart.module.css";
function ChartLine() {
  return (
    <div className={classes.chart}>
      <Line
        data={{
          labels: ChartDataPoints.map((data) => data.label),
          datasets: [
            {
              label: "expenses",
            },
            {
              label: "earnings",
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
