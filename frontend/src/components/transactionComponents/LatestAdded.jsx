import { useQuery } from "@tanstack/react-query";
import React from "react";
import { latestAddedIncome } from "../../http/incomeHttp";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import DateTransaction from "../dateTransaction/DateTransaction";
import TruncateText from "../../util/TruncateText";
import CategoryCases from "../category/CategoryCases";
import { Link } from "react-router-dom";
import { latestAddedExpense } from "../../http/expenseHttp";

const LatestAdded = ({ name }) => {
  const userId = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");

  const { data, isPending } = useQuery({
    queryKey:
      name === "incomes"
        ? ["incomes", { userId, token }]
        : ["expenses", { userId, token }],
    queryFn:
      name === "incomes"
        ? () => latestAddedIncome({ userId, token })
        : () => latestAddedExpense({ userId, token }),
    enabled: !!userId,
  });

  if (isPending) {
    return (
      <div className="w-[95%] sm:w-3/4 lg:w-1/2 mt-8">
        <span className="text-white block mx-auto text-center text-4xl my-8">
          Loading...
        </span>
      </div>
    );
  }

  if (!data && !isPending) {
    return null;
  }

  return (
    <div className="w-[95%] sm:w-3/4 lg:w-1/2 mt-8">
      <span className="text-white block mx-auto text-center text-4xl my-8">
        Latest added
      </span>

      <div className="w-full h-20 rounded-full bg-thirdColor shadow-lg shadow-neutral-800 flex justify-between items-center mb-4">
        <div
          className={`h-14 w-14 sm:h-16 sm:w-16 border-2 ${
            name === "incomes" ? "border-secondColor" : "border-red-500"
          } rounded-full ml-2 sm:ml-4 flex justify-center items-center`}
        >
          <CategoryCases category={data.category} />
        </div>
        <div className="pl-4 flex flex-col gap-4 grow">
          <h3 className="text-2xl">
            <TruncateText text={data.title} />
          </h3>
          <div className="flex">
            <p>
              <span
                className={`${
                  name === "incomes" ? "text-secondColor" : "text-red-500"
                } font-bold text-[17px]`}
              >
                {name === "incomes"
                  ? data.amount.toFixed(2)
                  : data.price.toFixed(2)}
                $
              </span>{" "}
              - <DateTransaction date={data.date} />
            </p>
          </div>
        </div>
        <Link
          to={`/${name}/${data.slug}`}
          className="w-12 h-12 xsm:w-14 lg:w-16 xsm:h-14 lg:h-16 mr-2 sm:mr-4 bg-secondColor rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#28bf8a]"
        >
          <FontAwesomeIcon
            icon={faEye}
            className="text-lg xsm:text-xl lg:text-2xl"
          />
        </Link>
      </div>
    </div>
  );
};

export default LatestAdded;
