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
  faArrowLeft,
  faHeader,
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
import TransactionDeleteModal from "./TransactionDeleteModal";
import TransactionUpdateInfoModal from "./TransactionUpdateInfoModal";
import TransactionActions from "./TransactionActions";
import TransactionElementLayoutFormList from "./TransactionElementLayoutFormList";
import SelectCategory from "../SelectCategory";

const TransactionElementLayoutForm = ({
  id,
  data,
  token,
  name,
  startEditting,
  closeEditting,
  isEditting,
  url,
}) => {
  const dateWithoutHours = data.date.split("T")[0];
  const value = name === "incomes" ? "amount" : "price";
  const initialState = {
    title: data.title,
    [value]:
      name === "incomes" ? data.amount.toFixed(2) : data.price.toFixed(2),
    date: dateWithoutHours,
    category: data.category,
    description: data.description,
  };
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [elementToEdit, setElementToEdit] = useState("");
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
      setElementToEdit("");
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
    setElementToEdit("");
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

  function chooseElementToEdit(name) {
    setElementToEdit(name);
  }

  return (
    <>
      <TransactionUpdateInfoModal
        version={version}
        icon={faCircleCheck}
        name={name}
        closeModal={closeModal}
      />

      <TransactionDeleteModal
        version={version}
        icon={faTrash}
        deletePending={deletePending}
        handleDelete={handleDelete}
        closeModal={closeModal}
      />

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

      <Link
        to={
          url === "all-transactions" ? `/${name}/all-transactions` : `/${name}`
        }
        className="absolute text-white text-3xl top-4 pl-4 transition-all duration-300 hover:text-[#28bf8a]"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>

      <div
        className={`w-11/12 sm:w-3/5 xlg:w-1/2 mx-auto rounded-3xl flex flex-col justify-center text-white mt-20 xlg:mt-12 border-2 bg-thirdColor ${
          name === "incomes" ? "border-secondColor" : "border-red-500"
        }`}
      >
        <h1 className="text-2xl my-4 px-6 min-h-[10vh] flex items-center">
          {formData.title}
        </h1>
        <p
          className={`${
            name === "incomes" ? "text-secondColor" : "text-red-500"
          } text-3xl px-6 mb-4`}
        >
          {name === "incomes" ? formData.amount : "-" + formData.price}$
        </p>
        <hr className="border-neutral-700 border-dashed border-1 w-11/12 mx-auto" />
        <div className="flex justify-between items-center text-gray-400">
          <p className="px-6 py-6">Category</p>
          <p className="px-6 py-6">
            {formData.category !== null &&
              formData.category.charAt(0).toUpperCase() +
                formData.category.slice(1).toLowerCase()}
          </p>
        </div>
        <div className="flex justify-between text-gray-400">
          <p className="px-6 pb-6">Operation Date</p>
          <p className="px-6 pb-6">{formData.date}</p>
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-8 min-h-[20vh] border-2 border-neutral-700 rounded-3xl text-white bg-thirdColor">
        <h3 className="text-2xl p-6">Description</h3>
        <p className="px-6 pb-6 whitespace-pre-line">{formData.description}</p>
      </div>

      <form className="w-full mt-12 md:mt-4 mx-auto flex flex-col justify-center text-white">
        <TransactionActions
          isEditting={isEditting}
          isPending={isPending}
          handleSubmit={handleSubmit}
          closeEdditingWithoutSave={closeEdditingWithoutSave}
          startEditting={startEditting}
          handleDeleteModal={handleDeleteModal}
          saveIcon={faFloppyDisk}
          closeIcon={faBan}
          deleteIcon={faTrash}
          editIcon={faPencil}
        />

        {isEditting && elementToEdit !== "" && (
          <div className="h-auto mb-8 mt-8 rounded-3xl flex justify-center items-center">
            {isEditting && elementToEdit === "title" && (
              <div className="w-[95%] flex flex-col">
                <label
                  htmlFor="title"
                  className="text-white text-nowrap font-semibold text-2xl lg:text-xl text-center"
                >
                  Title
                </label>
                <div className="w-full relative flex items-center text-white mt-2 mb-4 mx-auto">
                  <span className="absolute left-4">
                    <FontAwesomeIcon icon={faHeader} />
                  </span>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter yout title"
                    onChange={handleChange}
                    value={formData.title}
                    disabled={!isEditting}
                    className={`w-full border-2 border-secondColor min-h-12 text-wrap bg-main rounded-3xl pl-12 text-lg lg:text-base lg:focus:text-sm transition-all duration-200 focus:ring-1 focus:ring-white focus:text-base disabled:cursor-not-allowed`}
                  />
                </div>
                {formErrors && (
                  <p className="h-4 -mt-2 mb-4 text-red-500 text-center">
                    {formErrors.title}
                  </p>
                )}
              </div>
            )}

            {isEditting && elementToEdit === value && (
              <div className="w-1/2 md:w-1/3 xlg:w-1/4 flex flex-col">
                <label
                  htmlFor={value}
                  className="text-white text-nowrap font-semibold text-2xl lg:text-xl text-center"
                >
                  {name === "incomes" ? "Amount" : "Price"}
                </label>
                <div className="w-full relative flex items-center text-white mt-2 mb-4 mx-auto">
                  <span className="absolute left-4">
                    <FontAwesomeIcon icon={faDollar} />
                  </span>
                  <input
                    id={value}
                    name={value}
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder={`Enter yout ${value}`}
                    disabled={!isEditting}
                    onChange={handleChange}
                    value={
                      name === "incomes" ? formData.amount : formData.price
                    }
                    className={`w-full border-2 border-secondColor min-h-12 text-wrap bg-main rounded-3xl pl-12 text-lg lg:text-base lg:focus:text-sm transition-all duration-200 focus:ring-1 focus:ring-white focus:text-base disabled:cursor-not-allowed`}
                  />
                </div>
                {formErrors && (
                  <p className="h-4 -mt-2 mb-4 text-red-500 text-center">
                    {name === "incomes" ? formErrors.amount : formErrors.price}
                  </p>
                )}
              </div>
            )}

            {isEditting && elementToEdit === "date" && (
              <div className="flex flex-col w-1/2 md:w-1/3 xlg:w-1/4">
                <label
                  htmlFor="date"
                  className="text-white text-nowrap font-semibold text-2xl lg:text-xl text-center"
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
                    className="w-full h-full bg-main rounded-full flex items-center pl-12 border-2 border-secondColor"
                  />
                </div>
                {formErrors && (
                  <p className="h-4 mt-2 mb-4 text-red-500 text-center">
                    {formErrors.date}
                  </p>
                )}
              </div>
            )}

            {isEditting && elementToEdit === "category" && (
              <div className="flex flex-col w-1/2 md:w-1/3 xlg:w-1/4">
                <label
                  htmlFor="category"
                  className="text-white text-nowrap font-semibold text-2xl lg:text-xl text-center"
                >
                  Category
                </label>
                <div className="w-full h-12 mt-2 relative flex items-center">
                  <span className="absolute pl-4">
                    <FontAwesomeIcon icon={faList} />
                  </span>
                  <SelectCategory
                    resource={name}
                    disabled={!isEditting}
                    onChange={handleChange}
                    value={formData.category}
                    type="text"
                    id="category"
                    name="category"
                    className="w-full h-full bg-main rounded-full flex items-center pl-12 border-2 border-secondColor"
                  />
                </div>
                <p className="h-4 mt-2 mb-4"></p>
              </div>
            )}

            {isEditting && elementToEdit === "description" && (
              <>
                <div className="flex flex-col w-11/12">
                  <label
                    htmlFor="description"
                    className="text-white text-nowrap font-semibold text-2xl lg:text-xl text-center"
                  >
                    Description
                  </label>
                  <textarea
                    disabled={!isEditting}
                    id="description"
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                    className="bg-main w-full min-h-48 max-h-48 p-4 mt-2 border-2 border-secondColor rounded-3xl"
                    placeholder="Enter your description"
                  />
                </div>
                {formErrors ? (
                  <p className="h-6 text-red-500 text-center">
                    {formErrors.description}
                  </p>
                ) : (
                  <p className="h-6 mb-4"></p>
                )}
              </>
            )}
          </div>
        )}

        {isEditting && (
          <TransactionElementLayoutFormList
            nameValue={name}
            elementToEdit={elementToEdit}
            chooseElementToEditFn={chooseElementToEdit}
          />
        )}
      </form>
    </>
  );
};

export default TransactionElementLayoutForm;
