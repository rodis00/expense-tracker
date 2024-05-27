import React from "react";
import classes from "./DummyChartLine.module.css";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { DUMMY_DATA_EXPENSES, DUMMY_DATA_EARNINGS } from "./DummyData";
import { useMediaQuery } from "@react-hook/media-query";

function DummyChartLine() {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

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

  for (const elem of DUMMY_DATA_EXPENSES) {
    const elemMonth = elem.date.getMonth();
    ChartDataPointsExpenses[elemMonth].value += elem.amount;
  }

  for (const elem of DUMMY_DATA_EARNINGS) {
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
                color: "rgb(35,35,35)",
              },
              title: {
                display: isSmallScreen ? false : true,
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
}

export default DummyChartLine;
