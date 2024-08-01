import React, { useEffect, useRef, useState } from "react";
import "./DataPointsSelection.css";

const DataPointsSelection = ({ handleSelection, selectedPoints }) => {
  const indicatorRef = useRef();

  useEffect(() => {
    const indicator = indicatorRef.current;
    if (indicator) {
      switch (selectedPoints) {
        case "Monthly":
          indicator.style.transform = "translateX(0)";
          break;
        case "Weekly":
          indicator.style.transform = "translateX(-100%)";
          break;
        case "Yearly":
          indicator.style.transform = "translateX(100%)";
          break;
        default:
          console.log("Wrong data points");
          break;
      }
    }
  }, [selectedPoints]);

  return (
    <ul className="w-[95%] sm:w-3/4 md:w-1/2 lg:w-96 h-16 flex justify-around items-center rounded-full mt-8 bg-thirdColor overflow-hidden relative">
      <li className="w-1/3 h-full flex items-center justify-center text-center transition-all duration-300 hover:bg-neutral-700 hover:rounded-full">
        <span
          onClick={() => handleSelection("Weekly")}
          className="w-full h-full leading-[4rem] relative z-10 cursor-pointer"
        >
          Weekly
        </span>
      </li>
      <li className="w-1/3 h-full flex items-center justify-center text-center transition-all duration-300 hover:bg-neutral-700 hover:rounded-full">
        <span
          onClick={() => handleSelection("Monthly")}
          className="w-full h-full leading-[4rem] relative z-10 cursor-pointer"
        >
          Monthly
        </span>
      </li>
      <li className="w-1/3 h-full flex items-center justify-center text-center transition-all duration-300 hover:bg-neutral-700 hover:rounded-full">
        <span
          onClick={() => handleSelection("Yearly")}
          className="w-full h-full leading-[4rem] relative z-10 cursor-pointer"
        >
          Yearly
        </span>
      </li>
      <div
        className="w-1/3 h-full absolute rounded-full border-b-2 border-[#28bf8a] transition-all duration-300"
        ref={indicatorRef}
        id="listIndicator"
      ></div>
    </ul>
  );
};

export default DataPointsSelection;
