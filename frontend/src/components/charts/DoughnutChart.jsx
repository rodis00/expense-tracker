import React from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useMediaQuery } from "@react-hook/media-query";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartDataLabels
);

const DoughnutChart = ({ data, isPending }) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  let categoryValues = [];

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return [];
  }

  if (data <= 0) {
    return (
      <div className="flex h-[25rem] sm:h-[20rem] justify-center items-center">
        <span className="text-2xl p-4 text-center">
          You haven't added any data in this period
        </span>
      </div>
    );
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
    <div className="h-[25rem]">
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
          radius: "80%",
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: isSmallScreen ? "bottom" : "right",
              align: "center",
              labels: {
                color: "white",
                padding: isSmallScreen ? 25 : 20,
              },
            },
            datalabels: {
              color: "#fff",
              anchor: "end",
              align: "end",
              padding: (context) => {
                let dataset = context.dataset.data;
                let total = dataset.reduce((acc, val) => acc + val, 0);

                let smallSegments = dataset
                  .map((val, index) => ({
                    index,
                    percentage: (val / total) * 100,
                  }))
                  .filter((item) => item.percentage < 5);

                if (smallSegments.length <= 1) {
                  return 5;
                }

                let smallIndex = smallSegments.findIndex(
                  (item) => item.index === context.dataIndex
                );
                return smallIndex % 2 === 0 ? 25 : 5;
              },
              clip: false,
              formatter: (value, ctx) => {
                let total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
                let percentage = ((value / total) * 100).toFixed(2) + "%";
                return percentage;
              },
            },
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;
