import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faDollar,
  faCalendar,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";
import "./AddTransactionForm.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newIncome } from "./http/incomeHttp";
import { newExpense } from "./http/expenseHttp";
import SelectCategory from "./SelectCategory";

const AddTransactionForm = ({ value, upperValue }) => {
  const [formErrors, setFormErrors] = useState({});
  const dateInputRef = useRef();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userId = useSelector((state) => state.auth.user);
  const buttonText = value === "amount" ? "Add income" : "Add expense";
  const pending = value === "amount" ? "Adding income..." : "Adding expense...";
  const queryClient = useQueryClient();
  const resource = value === "amount" ? "incomes" : "expenses";

  const { mutate, isPending } = useMutation({
    mutationFn: value === "amount" ? newIncome : newExpense,
    onSuccess: () => {
      value === "amount"
        ? queryClient.invalidateQueries({
            queryKey: ["incomes", { userId, token }],
          })
        : queryClient.invalidateQueries({
            queryKey: ["expenses", { userId, token }],
          });
      value === "amount"
        ? queryClient.invalidateQueries({
            queryKey: ["incomes", token, userId],
          })
        : queryClient.invalidateQueries({
            queryKey: ["expenses", token, userId],
          });
      dispatch(modalActions.closeModal());
      setTimeout(() => {
        dispatch(modalActions.showAddInfo());
      }, 10);
    },
    onError: (error) => {
      setFormErrors(error);
    },
  });

  const handleCloseForm = () => {
    dispatch(modalActions.closeModal());
  };

  const handleShowPicker = () => {
    dateInputRef.current.showPicker();
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    const values = {
      ...formValues,
      date: new Date(formValues.date),
    };
    setFormErrors({});
    mutate({ userId, values, token });
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="w-[95%] sm:w-3/4 flex flex-col">
      <h2 className="text-center text-white my-8 xsm:my-4 text-2xl font-semibold">
        Add your {value === "amount" ? "income" : "expense"}
      </h2>
      <div>
        <Input
          labelText="Title"
          icon={faPencil}
          placeholder="Enter your title"
          type="text"
          inputId="title"
          minLength="3"
          maxLength="80"
        />
        {formErrors && (
          <p className="h-4 text-red-500 -mt-4 mb-4">{formErrors.title}</p>
        )}
        <Input
          labelText={upperValue}
          icon={faDollar}
          placeholder={`Enter your ${value}`}
          type="number"
          min="0.01"
          step="0.01"
          inputId={value}
          className="pr-2"
        />
        {formErrors && (
          <p className="h-4 text-red-500 -mt-4 mb-4">
            {value === "amount" ? formErrors.amount : formErrors.price}
          </p>
        )}
        <div className="flex justify-between mb-4">
          <div className="w-full xsm:w-1/2">
            <label
              htmlFor="date"
              className="text-white text-nowrap font-semibold text-xl lg:text-base mt-8"
            >
              Date
            </label>
            <div className="w-full relative flex items-center text-white mt-2">
              <span className="absolute left-4">
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              <input
                type="date"
                id="date"
                name="date"
                ref={dateInputRef}
                onFocus={handleShowPicker}
                className={`w-full border-none h-12 lg:h-10 bg-neutral-800 appearance-none sm:bg-main rounded-3xl pl-12 pr-2 text-lg lg:text-base lg:focus:text-sm transition-all duration-200 focus:ring-white focus:text-base`}
              />
            </div>
            {formErrors && (
              <p className="h-4 mb-4 text-red-500">{formErrors.date}</p>
            )}
          </div>
          <div className="mt-4 xsm:mt-0 w-full xsm:w-5/12">
            <label
              htmlFor="category"
              className="text-white text-nowrap font-semibold text-xl lg:text-base mt-8"
            >
              Category
            </label>
            <div className="w-full bg-neutral-800 sm:bg-main rounded-3xl relative flex items-center text-white mt-2">
              <span className="pl-4">
                <FontAwesomeIcon icon={faList} />
              </span>
              <SelectCategory
                resource={resource}
                name="category"
                id="category"
                className="bg-neutral-800 sm:bg-main focus:outline-none w-full h-12 lg:h-10 pl-4 rounded-3xl border-none focus:ring-0"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-white text-nowrap font-semibold text-xl lg:text-base"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter your description"
            className="text-white mt-2 bg-main mb-8 min-h-28 max-h-28 px-4 py-2 border-none focus:ring-white"
          />
        </div>
        <div className="mb-8 xsm:mb-4 lg:mb-8 flex justify-center gap-8">
          <button
            type="button"
            className="bg-neutral-700 w-28 h-12 rounded-full transition-all duration-300 hover:bg-neutral-500 text-white font-semibold"
            onClick={handleCloseForm}
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-secondColor w-40 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a] text-white font-semibold disabled:cursor-not-allowed disabled:bg-[#014029]"
            disabled={isPending}
          >
            {isPending ? pending : buttonText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTransactionForm;
