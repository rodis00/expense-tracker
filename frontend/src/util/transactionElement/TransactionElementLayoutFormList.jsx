import {
  faCalendar,
  faDollar,
  faHeading,
  faList,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TransactionElementLayoutFormList = ({
  nameValue,
  elementToEdit,
  chooseElementToEditFn,
}) => {
  let resource = nameValue === "incomes" ? "amount" : "price";

  return (
    <div className="w-11/12 xlg:w-3/4 min-h-[10vh] mx-auto mb-8">
      <h3 className="text-center font-semibold text-2xl mb-8">
        Choose element to edit
      </h3>
      <ul className="flex justify-center md:justify-around flex-wrap ">
        <li className="w-1/3 md:w-1/5 flex flex-col items-center">
          <button
            type="button"
            onClick={() => chooseElementToEditFn("title")}
            className={`w-16 h-16 border-2 border-secondColor rounded-full text-white text-2xl flex justify-center items-center ${
              elementToEdit === "title" ? "bg-secondColor" : "bg-transparent"
            } transition-all duration-300 hover:cursor-pointer hover:bg-secondColor`}
          >
            <FontAwesomeIcon icon={faHeading} />
          </button>
          <span className="mt-2">Title</span>
        </li>
        <li className="w-1/3 md:w-1/5 flex flex-col items-center">
          <button
            type="button"
            onClick={() =>
              chooseElementToEditFn(
                nameValue === "incomes" ? "amount" : "price"
              )
            }
            className={`w-16 h-16 border-2 border-secondColor rounded-full text-white text-2xl flex justify-center items-center ${
              elementToEdit === resource ? "bg-secondColor" : "bg-transparent"
            } transition-all duration-300 hover:cursor-pointer hover:bg-secondColor`}
          >
            <FontAwesomeIcon icon={faDollar} />
          </button>
          <span className="mt-2">
            {nameValue === "incomes" ? "Amount" : "Price"}
          </span>
        </li>
        <li className="w-1/3 md:w-1/5 flex flex-col items-center">
          <button
            type="button"
            onClick={() => chooseElementToEditFn("date")}
            className={`w-16 h-16 border-2 border-secondColor rounded-full text-white text-2xl flex justify-center items-center ${
              elementToEdit === "date" ? "bg-secondColor" : "bg-transparent"
            } transition-all duration-300 hover:cursor-pointer hover:bg-secondColor`}
          >
            <FontAwesomeIcon icon={faCalendar} />
          </button>
          <span className="mt-2">Date</span>
        </li>
        <li className="w-1/3 md:w-1/5 flex flex-col items-center">
          <button
            type="button"
            name="category"
            onClick={() => chooseElementToEditFn("category")}
            className={`w-16 h-16 border-2 border-secondColor rounded-full text-white text-2xl flex justify-center items-center ${
              elementToEdit === "category" ? "bg-secondColor" : "bg-transparent"
            } transition-all duration-300 hover:cursor-pointer hover:bg-secondColor`}
          >
            <FontAwesomeIcon icon={faList} />
          </button>
          <span className="mt-2">Category</span>
        </li>
        <li className="w-1/3 md:w-1/5 flex flex-col items-center">
          <button
            type="button"
            name="description"
            onClick={() => chooseElementToEditFn("description")}
            className={`w-16 h-16 border-2 border-secondColor rounded-full text-white text-2xl flex justify-center items-center ${
              elementToEdit === "description"
                ? "bg-secondColor"
                : "bg-transparent"
            } transition-all duration-300 hover:cursor-pointer hover:bg-secondColor`}
          >
            <FontAwesomeIcon icon={faNewspaper} />
          </button>
          <span className="mt-2">Description</span>
        </li>
      </ul>
    </div>
  );
};

export default TransactionElementLayoutFormList;
