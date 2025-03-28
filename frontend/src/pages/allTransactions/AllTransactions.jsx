import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchAllIncomes } from "../../http/incomeHttp";
import { fetchAllExpenses } from "../../http/expenseHttp";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import DateTransaction from "../../components/dateTransaction/DateTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/form/Input";
import TruncateText from "../../util/TruncateText";
import "./AllTransactions.css";
import CategoryCases from "../../components/category/CategoryCases";
import FullScreenLoader from "../../components/fullScreenLoader/FullScreenLoader";
import useLoader from "../../hooks/useLoader";

const AllTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState({
    id: null,
    expanded: false,
  });
  const [visibleItems, setVisibleItems] = useState(10);
  const token = localStorage.getItem("token");
  const userId = useSelector((state) => state.auth.user);
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const resourceType = pathParts[1];
  const year = "";
  const month = "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isPending, isError, error } = useQuery({
    queryKey:
      resourceType === "incomes"
        ? ["incomes", { userId, token, year, month }]
        : ["expenses", { userId, token, year, month }],
    queryFn:
      resourceType === "incomes"
        ? () => fetchAllIncomes({ userId, token, year, month })
        : () => fetchAllExpenses({ userId, token, year, month }),
    enabled: !!userId,
  });

  const loadAdditionalElements = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
      if (data?.length < visibleItems) {
        return;
      } else {
        loadAdditionalElements();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleItems]);

  const filteredItems = data?.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  const isLoading = useLoader(isPending);

  if (isLoading) {
    return <FullScreenLoader />;
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const groupedData = filteredItems.reduce((result, item) => {
    const date = new Date(item.date).toLocaleDateString();

    if (!result[date]) {
      result[date] = [];
    }

    result[date].push(item);

    return result;
  }, {});

  const dates = Object.keys(groupedData);

  const getItemsToDisplay = () => {
    const items = [];
    let counter = 0;

    for (let date of dates) {
      if (counter >= visibleItems) break;
      items.push({
        date,
        items: groupedData[date].slice(0, visibleItems - counter),
      });
      counter += groupedData[date].length;
    }
    return items;
  };

  const itemsToDisplay = getItemsToDisplay();

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-white">
      <h1 className="text-center font-semibold text-3xl mb-12 mt-8">
        All {resourceType}
      </h1>
      <div className="w-[95%] sm:w-3/4 lg:w-1/2 mb-8 bg-thirdColor p-4 rounded-2xl">
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
      {itemsToDisplay
        .sort((a, b) => {
          const dateA = a.date.split(".").reverse().join("-");
          const dateB = b.date.split(".").reverse().join("-");
          return new Date(dateB) - new Date(dateA);
        })
        .map((group, index) => (
          <div className="w-[95%] sm:w-3/4 lg:w-1/2" key={index}>
            <h3 className="text-neutral-400 font-semibold flex items-center mb-6 mt-2">
              {group.date}
              <span className="w-48 h-1 block bg-neutral-600 ml-4"></span>
            </h3>
            <ul className="w-full flex flex-col mt-4">
              {group.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <li className="w-full h-20 rounded-full bg-thirdColor flex justify-between items-center relative z-10 mb-10 xlg:mb-4">
                    <div
                      className={`h-14 w-14 sm:h-16 sm:w-16 border-2 ${
                        resourceType === "incomes"
                          ? "border-secondColor"
                          : "border-red-500"
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
                              resourceType === "incomes"
                                ? "text-secondColor"
                                : "text-red-500"
                            } font-bold text-[17px]`}
                          >
                            {resourceType === "incomes"
                              ? item.amount.toFixed(2)
                              : item.price.toFixed(2)}
                            $
                          </span>{" "}
                          - <DateTransaction date={item.date} />
                        </p>
                        {isExpanded.id !== item.slug && (
                          <button
                            onClick={() =>
                              setIsExpanded(() => ({
                                id: item.slug,
                                expanded: true,
                              }))
                            }
                            className="absolute left-[calc(50%-5rem)] bg-thirdColor rounded-b-3xl top-full h-6 xlg:-mt-7 w-40 text-neutral-500 font-semibold transition-all duration-300 hover:text-neutral-400"
                          >
                            show details
                          </button>
                        )}
                      </div>
                    </div>
                    <Link
                      to={`/${resourceType}/all-transactions/${item.slug}`}
                      className="w-12 h-12 xsm:w-14 lg:w-16 xsm:h-14 lg:h-16 mr-2 sm:mr-4 bg-secondColor rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#28bf8a]"
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-lg xsm:text-xl lg:text-2xl"
                      />
                    </Link>
                  </li>
                  <div
                    className={`w-[85%] bg-thirdColor ${
                      isExpanded.id === item.slug && isExpanded.expanded
                        ? "block"
                        : "hidden"
                    } mx-auto relative -top-10 xlg:-top-4 pt-2 px-8 rounded-b-3xl pb-8`}
                    id="expandedElement"
                  >
                    <p className="bg-main p-4">{item.description}</p>
                    <button
                      onClick={() =>
                        setIsExpanded(() => ({
                          id: null,
                          expanded: false,
                        }))
                      }
                      className="absolute left-[calc(50%-4rem)] bottom-1 w-32 text-neutral-500 font-semibold transition-all duration-300 hover:text-neutral-400"
                    >
                      hide details
                    </button>
                  </div>
                </React.Fragment>
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
