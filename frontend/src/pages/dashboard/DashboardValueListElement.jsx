import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardValueListElement = ({ border, color, title, value, icon }) => {
  return (
    <li className="w-[90%] xsm:w-1/3 lg:w-[15vw] xsm:h-36 h-20 xlg:h-24 bg-thirdColor shadow-lg shadow-neutral-0 lg:shadow-neutral-800 mt-4 xsm:mt-0">
      <div className="w-full h-full flex xsm:flex-col xlg:flex-row items-center">
        <div
          className={`w-14 h-14 mx-4 border-2 ${border} flex justify-center items-center xsm:mt-4 xlg:mt-0`}
        >
          <FontAwesomeIcon icon={icon} className="text-2xl" />
        </div>
        <div className="grow xsm:text-center xlg:text-left">
          <h2 className="text-neutral-500 font-semibold text-lg xlg:text-xl mt-2 xlg:mt-0">
            {title}
          </h2>
          <span className={`text-xl xlg:text-2xl ${color}`}>{value.toFixed(2)}$</span>
        </div>
      </div>
    </li>
  );
};

export default DashboardValueListElement;
