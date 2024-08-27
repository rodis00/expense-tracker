import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { ChartDataPoints } from "./ChartDataPoints";
import { DUMMY_DATA_EXPENSES, DUMMY_DATA_EARNINGS } from "../../DummyData";

const LineChart = ({ name }) => {
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

  for (const elem of DUMMY_DATA_EARNINGS) {
    const elemMonth = elem.date.getMonth();
    ChartDataPointsEarnings[elemMonth].value += elem.amount;
  }

  for (const elem of DUMMY_DATA_EXPENSES) {
    const elemMonth = elem.date.getMonth();
    ChartDataPointsExpenses[elemMonth].value += elem.amount;
  }

  return (
    <div
      className={`h-[60vh] w-full lg:w-[80%] pt-12 pb-4 px-2 lg:py-12 md:px-4 mt-8 md:rounded-2xl lg:rounded-3xl ${
        name === "summaries" ? "" : "bg-thirdColor"
      } relative`}
    >
      <h2 className=" w-1/3 h-8 top-4 text-right pr-4 top text-xl absolute left-2/3 uppercase font-semibold text-neutral-500">
        This Year
      </h2>
      <Line
        data={{
          labels: ChartDataPoints,
          datasets: [
            {
              label: "expenses",
              data: ChartDataPointsExpenses.map((data) => data.value),
              backgroundColor: "#D74949",
              borderColor: "#D74949",
            },
            {
              label: "earnings",
              data: ChartDataPointsEarnings.map((data) => data.value),
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
