import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { DUMMY_DATA_EARNINGS } from "../../DummyData";

const DoughnutChart = () => {
  // const incomesCategory = [
  //   { label: "food", value: 0 },
  //   { label: "house", value: 0 },
  //   { label: "transport", value: 0 },
  //   { label: "health", value: 0 },
  //   { label: "education", value: 0 },
  //   { label: "clothes", value: 0 },
  //   { label: "travel", value: 0 },
  //   { label: "gifts", value: 0 },
  //   { label: "other", value: 0 },
  // ];

  // const expensesCategory = [
  //   { label: "salary", value: 0 },
  //   { label: "business income", value: 0 },
  //   { label: "investment", value: 0 },
  //   { label: "gifts", value: 0 },
  //   { label: "pension", value: 0 },
  //   { label: "other", value: 0 },
  // ];

  const WeeklyDataPoints = [
    { label: "Work", value: 0 },
    { label: "Survey", value: 0 },
    { label: "Rent", value: 0 },
    { label: "Shopping", value: 0 },
    { label: "Food", value: 0 },
    { label: "Holidays", value: 0 },
    { label: "Clothes", value: 0 },
  ];

  // for (const elem of data) {
  //   if (resource === "incomes") {
  //     incomesCategory.forEach((item) => {
  //       if (elem.category === item.label) {
  //         item.value += elem.amount;
  //       }
  //     });
  //   } else {
  //     expensesCategory.forEach((item) => {
  //       if (elem.category === item.label) {
  //         item.value += elem.price;
  //       }
  //     });
  //   }
  // }

  for (const elem of DUMMY_DATA_EARNINGS) {
    const elemDay = elem.date.getDay();
    WeeklyDataPoints[elemDay].value += elem.amount;
  }

  return (
    <div className="h-56">
      <Doughnut
        data={{
          labels: WeeklyDataPoints.map((item) => item.label),
          datasets: [
            {
              data: WeeklyDataPoints.map((item) => item.value),
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "right",
              align: "center",
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;
