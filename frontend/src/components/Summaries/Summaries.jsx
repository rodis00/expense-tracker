import React from "react";
import classes from "./Summaries.module.css";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

function Summaries() {
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

  return (
    <div className={classes.section}>
      <h2 className={classes.section__title}>Your Summaries</h2>
      <div className={classes.chartLine}>
        <Line
          data={{
            labels: chartDataPoints.map((data) => data.label),
            datasets: [{ label: "price" }, { label: "amount" }],
          }}
          options={{ maintainAspectRatio: false }}
        />
      </div>

      <p className={classes.balance}>your balance of costs compared to revenues is: </p>

      <div className={classes.flexContainer}>
        <div className={classes.chartBar}>
          <Bar
            data={{
              labels: chartDataPoints.map((data) => data.label),
              datasets: [{ label: "price" }],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className={classes.chartBar}>
          <Bar
            data={{
              labels: chartDataPoints.map((data) => data.label),
              datasets: [{ label: "amount" }],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
}

export default Summaries;
