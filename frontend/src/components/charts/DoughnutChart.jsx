import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ data, isPending }) => {
  let categoryValues = [];

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return [];
  }

  data.forEach((item) => {
    const isDuplicate = categoryValues.some(
      (elem) => elem.label === item.category
    );

    if (
      (categoryValues.length > 0 && !isDuplicate) ||
      categoryValues.length === 0
    ) {
      categoryValues.push({ label: item.category, value: 0 });
    }

    categoryValues.forEach((elem) => {
      if (elem.label === item.category) {
        elem.value += item.amount ? item.amount : item.price;
      }
    });
  });

  return (
    <div className="h-56">
      <Doughnut
        data={{
          labels: categoryValues.map((item) => item.label),
          datasets: [
            {
              data: categoryValues.map((item) => item.value),
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
