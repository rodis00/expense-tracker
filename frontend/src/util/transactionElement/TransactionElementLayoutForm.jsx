import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faDollar,
  faCalendar,
  faList,
  faFloppyDisk,
  faBan,
  faTrash,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../AddTransactionForm.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIncomeById, updateIncomesById } from "../http/incomeHttp";
import { deleteExpenseById, updateExpenseById } from "../http/expenseHttp";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";

const TransactionElementLayoutForm = ({
  id,
  data,
  token,
  name,
  startEditting,
  closeEditting,
  isEditting,
}) => {
  const dateWithoutHours = data.date.split("T")[0];
  const value = name === "incomes" ? "amount" : "price";
  const initialState = {
    title: data.title,
    [value]: name === "incomes" ? data.amount : data.price,
    date: dateWithoutHours,
    description: data.description,
  };
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(initialState);
  const dateInputRef = useRef();
  const queryClient = useQueryClient();
  const version = useSelector((state) => state.modal.modalVersion);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let deleteError = "";

  const { mutate, isPending } = useMutation({
    mutationFn: name === "incomes" ? updateIncomesById : updateExpenseById,
    onSuccess: () => {
      name === "incomes"
        ? queryClient.invalidateQueries({
            queryKey: ["incomes", { id, token }],
          })
        : queryClient.invalidateQueries({
            queryKey: ["expenses", { id, token }],
          });
      closeEditting();
      dispatch(modalActions.showUpdateInfo());
    },
    onError: (error) => {
      setFormErrors(error);
    },
  });

  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: name === "incomes" ? deleteIncomeById : deleteExpenseById,
    onSuccess: () => {
      name === "incomes" ? navigate("/incomes") : navigate("/expenses");
    },
    onError: () => {
      deleteError = `Your ${
        name === "incomes" ? "income" : "expense"
      } could not be removed, please try again later`;
    },
  });

  function closeEdditingWithoutSave() {
    setFormData(initialState);
    setFormErrors({});
    closeEditting();
  }

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

  function handleSubmit(event) {
    event.preventDefault();
    const values = {
      ...formData,
      date: new Date(formData.date),
    };
    setFormErrors({});
    mutate({ id, values, token });
  }

  function closeModal() {
    dispatch(modalActions.closeModal());
  }

  function handleDeleteModal() {
    dispatch(modalActions.showDeleteModal());
  }

  function handleDelete() {
    deleteMutate({ id, token });
  }

  return (
    <>
      <Modal open={version === "updateInfo"}>
        <div className="w-full h-60 flex flex-col justify-center items-center gap-8 text-white rounded-3xl border-2 border-white">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-[50px] text-secondColor"
          />
          <p className="text-lg px-2">
            Your {name === "incomes" ? "income" : "expense"} has been updated
            successfully
          </p>
          <button
            className="bg-secondColor w-28 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>

      <Modal open={version === "delete"}>
        <div className="w-full h-60 flex flex-col justify-center items-center gap-8 text-white rounded-3xl border-2 border-white">
          <FontAwesomeIcon
            icon={faTrash}
            className="text-[50px] text-red-500"
          />
          <p className="text-lg px-2">
            Are you sure you want to remove this{" "}
            {name === "incomes" ? "income" : "expense"} ?
          </p>
          {deletePending ? (
            <p>Deleting...</p>
          ) : (
            <div className="flex gap-8">
              <button
                className="bg-red-500 w-28 h-12 rounded-full transition-all duration-300 hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="bg-secondColor w-28 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </Modal>

      {deleteError && (
        <Modal open={version === "deleteInfo"}>
          <div className="w-full h-60 flex flex-col justify-center items-center gap-8 text-white rounded-3xl border-2 border-white">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-red-500"
            />
            <p>{deleteError}</p>
            <button
              className="bg-secondColor w-28 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      <form className="w-[85%] mt-20 md:mt-8 mx-auto flex flex-col text-white">
        {isEditting ? (
          <div className="text-white flex justify-end gap-8 mt-4 mr-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-main rounded-xl w-28 h-12 flex items-center justify-center gap-4 text-lg text-yellow-500 font-semibold "
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
              <span>{isPending ? "Saving..." : "Save"}</span>
            </button>
            <button
              type="button"
              onClick={closeEdditingWithoutSave}
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
              onClick={handleDeleteModal}
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
        <div className={`w-full h-12 mt-2 relative flex items-center`}>
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
        {formErrors ? (
          <p className="h-6 text-red-500 mb-4">{formErrors.title}</p>
        ) : (
          <p className="h-6 mb-4"></p>
        )}

        <label
          htmlFor="value"
          className="text-white text-nowrap font-semibold text-xl lg:text-base"
        >
          {name === "incomes" ? "Amount" : "Price"}
        </label>
        <div className={`w-full h-12 mt-2 relative flex items-center`}>
          <span className="absolute pl-4">
            <FontAwesomeIcon icon={faDollar} />
          </span>
          <input
            disabled={!isEditting}
            type="number"
            id={value}
            name={value}
            onChange={handleChange}
            value={name === "incomes" ? formData.amount : formData.price}
            placeholder={`Enter yout ${value}`}
            className="w-full h-full bg-main rounded-full flex items-center pl-12"
          />
        </div>
        {formErrors ? (
          <p className="h-6 text-red-500 mb-4">
            {name === "incomes" ? formErrors.amount : formErrors.price}
          </p>
        ) : (
          <p className="h-6 mb-4"></p>
        )}

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
            {formErrors ? (
              <p className="h-6 text-red-500">{formErrors.date}</p>
            ) : (
              <p className="h-6 mb-4"></p>
            )}
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
        {formErrors ? (
          <p className="h-6 text-red-500">{formErrors.description}</p>
        ) : (
          <p className="h-6 mb-4"></p>
        )}

        <Link
          to={name === "incomes" ? "/incomes" : "/expenses"}
          className="mx-auto w-28 h-12 font-semibold rounded-full flex items-center justify-center mb-8 bg-secondColor transition-all duration-300 hover:bg-[#28bf8a]"
        >
          Go back
        </Link>
      </form>
    </>
  );
};

export default TransactionElementLayoutForm;
