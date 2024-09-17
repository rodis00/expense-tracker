import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faDollar,
  faCalendar,
  faList,
  faFloppyDisk,
  faBan,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../AddTransactionForm.css";

const TransactionElementLayoutForm = ({
  data,
  name,
  startEditting,
  closeEditting,
  isEditting,
}) => {
  const dateWithoutHours = data.date.split("T")[0];
  const [formData, setFormData] = useState({
    title: data.title,
    value: name === "incomes" ? data.amount : data.price,
    date: dateWithoutHours,
    description: data.description,
  });
  const dateInputRef = useRef();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleShowPicker = () => {
    dateInputRef.current.showPicker();
  };
  return (
    <form className="w-[85%] mt-8 mx-auto flex flex-col text-white">
      {isEditting ? (
        <div className="text-white flex justify-end gap-8 mt-4 mr-4">
          <button
            type="button"
            className="bg-main rounded-xl w-28 h-12 flex items-center justify-center gap-4 text-lg text-yellow-500 font-semibold "
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
            <span>Save</span>
          </button>
          <button
            type="button"
            onClick={closeEditting}
            className="bg-main rounded-xl w-28 h-12 flex items-center justify-center gap-4 text-lg text-red-500 font-semibold "
          >
            <FontAwesomeIcon icon={faBan} />
            <span>Cancel</span>
          </button>
        </div>
      ) : (
        <div className="text-white flex justify-end gap-8 mt-4 mr-4">
          <button
            type="button"
            onClick={startEditting}
            className="bg-main rounded-xl w-28 h-12 flex items-center justify-center gap-4 text-lg text-yellow-500 font-semibold "
          >
            <FontAwesomeIcon icon={faPencil} />
            <span>Edit</span>
          </button>
          <button
            type="button"
            className="bg-main rounded-xl w-28 h-12 flex items-center justify-center gap-4 text-lg text-red-500 font-semibold "
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Delete</span>
          </button>
        </div>
      )}

      <h2 className="text-center text-white mt-12 mb-8 text-2xl font-semibold">
        {name} - {data.title}
      </h2>

      <label
        htmlFor="title"
        className="text-white text-nowrap font-semibold text-xl lg:text-base"
      >
        Title
      </label>
      <div className="w-full h-12 mb-4 mt-2 relative flex items-center">
        <span className="absolute pl-4">
          <FontAwesomeIcon icon={faPencil} />
        </span>
        <input
          disabled={!isEditting}
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          value={formData.title}
          placeholder="Enter yout title"
          className="w-full h-full bg-main rounded-full flex items-center pl-12"
        />
      </div>
      <label
        htmlFor="value"
        className="text-white text-nowrap font-semibold text-xl lg:text-base"
      >
        {name === "incomes" ? "Amount" : "Price"}
      </label>
      <div className="w-full h-12 mb-4 mt-2 relative flex items-center">
        <span className="absolute pl-4">
          <FontAwesomeIcon icon={faDollar} />
        </span>
        <input
          disabled={!isEditting}
          type="number"
          id="value"
          name="value"
          onChange={handleChange}
          value={formData.value}
          placeholder="Enter yout amount"
          className="w-full h-full bg-main rounded-full flex items-center pl-12"
        />
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex flex-col w-1/2">
          <label
            htmlFor="date"
            className="text-white text-nowrap font-semibold text-xl lg:text-base"
          >
            Date
          </label>
          <div className="w-full h-12 mt-2 relative flex items-center">
            <span className="absolute pl-4">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <input
              disabled={!isEditting}
              type="date"
              name="date"
              id="date"
              onChange={handleChange}
              value={formData.date}
              ref={dateInputRef}
              onFocus={handleShowPicker}
              className="w-full h-full bg-main rounded-full flex items-center pl-12"
            />
          </div>
        </div>

        <div className="flex flex-col w-5/12">
          <label
            htmlFor="category"
            className="text-white text-nowrap font-semibold text-xl lg:text-base"
          >
            Category
          </label>
          <div className="w-full h-12 mt-2 relative flex items-center">
            <span className="absolute pl-4">
              <FontAwesomeIcon icon={faList} />
            </span>
            <select
              disabled={!isEditting}
              type="text"
              id="category"
              name="category"
              className="w-full h-full bg-main rounded-full flex items-center pl-12"
            >
              <option value="work">Work</option>
              <option value="sell">Sell</option>
              <option value="trade">Trade</option>
              <option value="survey">Survey</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-white text-nowrap font-semibold text-xl lg:text-base"
        >
          Description
        </label>
        <textarea
          disabled={!isEditting}
          id="description"
          name="description"
          onChange={handleChange}
          value={formData.description}
          className="bg-main w-full min-h-28 max-h-28 p-2 mt-2"
          placeholder="Enter your description"
        />
      </div>

      <Link
        to={"/incomes"}
        className="mx-auto w-28 h-12 font-semibold rounded-full flex items-center justify-center my-8 bg-secondColor transition-all duration-300 hover:bg-[#28bf8a]"
      >
        Go back
      </Link>
    </form>
  );
};

export default TransactionElementLayoutForm;
