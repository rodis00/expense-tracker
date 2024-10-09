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
import Input from "../Input";
import TransactionDeleteModal from "./TransactionDeleteModal";
import TransactionUpdateInfoModal from "./TransactionUpdateInfoModal";
import TransactionActions from "./TransactionActions";

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

      <form className="w-[85%] mt-20 md:mt-8 mx-auto flex flex-col text-white">
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

        <div className="mt-8">
          <Input
            labelText="Title"
            icon={faPencil}
            placeholder="Enter yout title"
            type="text"
            inputId="title"
            onChange={handleChange}
            value={formData.title}
            disabled={!isEditting}
          />

          {formErrors && (
            <p className="h-6 text-red-500 ">{formErrors.title}</p>
          )}

          <Input
            labelText={name === "incomes" ? "Amount" : "Price"}
            icon={faDollar}
            placeholder={`Enter yout ${value}`}
            type="number"
            inputId={value}
            disabled={!isEditting}
            onChange={handleChange}
            value={name === "incomes" ? formData.amount : formData.price}
          />

          {formErrors && (
            <p className="h-6 text-red-500 ">
              {name === "incomes" ? formErrors.amount : formErrors.price}
            </p>
          )}
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
          to={
            url === "all-transactions"
              ? `/${name}/all-transactions`
              : `/${name}`
          }
          className="mx-auto w-28 h-12 font-semibold rounded-full flex items-center justify-center mb-8 bg-secondColor transition-all duration-300 hover:bg-[#28bf8a]"
        >
          Go back
        </Link>
      </form>
    </>
  );
};

export default TransactionElementLayoutForm;
