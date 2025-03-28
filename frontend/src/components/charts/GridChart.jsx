import React from "react";

const GridChart = ({ handleToogleGrid, lineChart }) => {
  return (
    <div
      className={`w-full flex items-center gap-8 justify-center xlg:justify-end ${
        lineChart ? "pt-4" : "pt-0"
      }`}
    >
      <div className="flex items-center gap-2">
        <label htmlFor="xGrid" className="order-2 font-semibold text-neutral-500 hover:cursor-pointer">
          Display x grid
        </label>
        <input
          type="checkbox"
          id="xGrid"
          name="xGrid"
          className="w-4 h-4 order-1 accent-secondColor hover:cursor-pointer"
          onClick={() => handleToogleGrid("x")}
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="yGrid" className="order-2 font-semibold text-neutral-500 hover:cursor-pointer">
          Display y grid
        </label>
        <input
          type="checkbox"
          id="yGrid"
          name="yGrid"
          className="w-4 h-4 order-1 accent-secondColor hover:cursor-pointer"
          onClick={() => handleToogleGrid("y")}
        />
      </div>
    </div>
  );
};

export default GridChart;
