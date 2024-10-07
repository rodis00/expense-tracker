import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchAllIncomes } from "./http/incomeHttp";
import { fetchAllExpenses } from "./http/expenseHttp";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import DateTransaction from "./DateTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faMagnifyingGlass,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";

const AllTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const userId = useSelector((state) => state.auth.user);
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const resourceType = pathParts[1];

  const { data, isPending, isError, error } = useQuery({
    queryKey:
      resourceType === "incomes"
        ? ["incomes", { userId, token }]
        : ["expenses", { userId, token }],
    queryFn:
      resourceType === "incomes"
        ? () => fetchAllIncomes({ userId, token })
        : () => fetchAllExpenses({ userId, token }),
    enabled: !!userId,
  });

  const filteredItems = data?.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  if (isPending) {
    return (
      <div className="w-full text-center text-2xl text-white">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="w-full text-center text-2xl text-white">
        Error: {error}
      </div>
    );
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const groupedData = filteredItems.reduce((result, item) => {
    const date = new Date(item.date).toLocaleDateString();

    if (!result[date]) {
      result[date] = [];
    }

    result[date].push(item);

    return result;
  }, {});

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-white">
      <h1 className="text-center font-semibold text-3xl mb-12 mt-8">
        All {resourceType}
      </h1>
      <div className="w-1/2 mb-8 bg-thirdColor p-4 rounded-2xl">
        <Input
          labelText="Search"
          icon={faMagnifyingGlass}
          placeholder="Search by title..."
          type="text"
          inputId="search"
          onChange={handleSearchTerm}
          value={searchTerm}
        />
      </div>
      <Link
        to={resourceType === "incomes" ? "/incomes" : "/expenses"}
        className="mx-auto w-28 h-12 font-semibold rounded-full flex items-center justify-center mb-4 bg-secondColor transition-all duration-300 hover:bg-[#28bf8a]"
      >
        Go back
      </Link>
      {Object.keys(groupedData)
        .reverse()
        .map((date) => (
          <div className="w-1/2" key={date}>
            <h3 className="text-neutral-400 font-semibold flex items-center">
              {date}
              <span className="w-48 h-1 block bg-neutral-600 ml-4"></span>
            </h3>
            <ul className="w-full flex flex-col mt-4">
              {groupedData[date].map((item) => (
                <li
                  key={item.id}
                  className="w-full h-20 rounded-full bg-thirdColor flex justify-between items-center mb-4"
                >
                  <div className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-secondColor rounded-full ml-2 sm:ml-4 flex justify-center items-center">
                    <FontAwesomeIcon icon={faShirt} className="text-2xl" />
                  </div>
                  <div className="pl-4 flex flex-col gap-4 grow">
                    <h3 className="text-2xl">{item.title}</h3>
                    <div className="flex">
                      <p>
                        <span
                          className={`${
                            resourceType === "incomes"
                              ? "text-secondColor"
                              : "text-red-500"
                          } font-bold text-[17px]`}
                        >
                          {resourceType === "incomes"
                            ? item.amount
                            : item.price}
                          $
                        </span>{" "}
                        - <DateTransaction date={item.date} />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

      {filteredItems.length > 5 && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-secondColor mb-4 transition-all duration-300 hover:bg-[#28bf8a]"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default AllTransactions;
