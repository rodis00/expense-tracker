import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import DateTransaction from "./DateTransaction";
import { Link } from "react-router-dom";
import TruncateText from "./TruncateText";
import CategoryCases from "./CategoryCases";

const TransactionList = ({ name, data, isPending, error, isError }) => {
  return (
    <ul className="w-[95%] sm:w-3/4 lg:w-1/2 mt-8">
      {isPending && <p className="text-center mb-8">Loading...</p>}
      {data && data.content?.length <= 0 && (
        <h2 className="text-center my-8 text-2xl text-neutral-400">
          You haven't added any {name} yet
        </h2>
      )}
      {data &&
        data.content?.map((item) => (
          <li
            key={item.slug}
            className="w-full h-20 rounded-full bg-thirdColor flex justify-between items-center mb-4"
          >
            <div
              className={`h-14 w-14 sm:h-16 sm:w-16 border-2 ${
                name === "incomes" ? "border-secondColor" : "border-red-500"
              } rounded-full ml-2 sm:ml-4 flex justify-center items-center`}
            >
              <CategoryCases category={item.category} />
            </div>
            <div className="pl-4 flex flex-col gap-4 grow">
              <h3 className="text-2xl">
                <TruncateText text={item.title} />
              </h3>
              <div className="flex">
                <p>
                  <span
                    className={`${
                      name === "incomes" ? "text-secondColor" : "text-red-500"
                    } font-bold text-[17px]`}
                  >
                    {name === "incomes"
                      ? item.amount.toFixed(2)
                      : item.price.toFixed(2)}
                    $
                  </span>{" "}
                  - <DateTransaction date={item.date} />
                </p>
              </div>
            </div>
            <Link
              to={`/${name}/${item.slug}`}
              className="w-12 h-12 xsm:w-14 lg:w-16 xsm:h-14 lg:h-16 mr-2 sm:mr-4 bg-secondColor rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#28bf8a]"
            >
              <FontAwesomeIcon
                icon={faEye}
                className="text-lg xsm:text-xl lg:text-2xl"
              />
            </Link>
          </li>
        ))}
      {isError && <p>{error}</p>}
    </ul>
  );
};

export default TransactionList;
