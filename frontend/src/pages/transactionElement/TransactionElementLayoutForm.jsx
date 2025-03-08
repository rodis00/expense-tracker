import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faDollar,
  faCalendar,
  faFloppyDisk,
  faBan,
  faTrash,
  faCircleExclamation,
  faArrowLeft,
  faHeader,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../components/form/AddTransactionForm.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIncomeById, updateIncomesById } from "../../http/incomeHttp";
import { deleteExpenseById, updateExpenseById } from "../../http/expenseHttp";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import TransactionDeleteModal from "../../components/modal/TransactionDeleteModal";
import TransactionUpdateInfoModal from "../../components/modal/TransactionUpdateInfoModal";
import TransactionActions from "./TransactionActions";
import Input from "../../components/form/Input";
import { useMediaQuery } from "@react-hook/media-query";
import logo from "/et-logo.png";
import CustomSelect from "../../components/customSelect/CustomSelect";

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
  const [displayDescription, setDisplayDescription] = useState(false);
  const dateInputRef = useRef();
  const queryClient = useQueryClient();
  const version = useSelector((state) => state.modal.modalVersion);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user);
  let deleteError = "";
  const isLargeScreen = useMediaQuery("(max-width: 1024px)");
  const textRef = useRef();
  const [overflow, setOverflow] = useState("overflow-y-none");

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const isOverflowing = element.scrollHeight > element.clientHeight;

      setOverflow(isOverflowing ? "overflow-y-scroll" : "overflow-y-none");
    }
  }, [formData.description]);

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
      name === "incomes"
        ? queryClient.invalidateQueries({
            queryKey: ["incomes", token, userId],
          })
        : queryClient.invalidateQueries({
            queryKey: ["expenses", token, userId],
          });
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

  const handleDisplayDescription = () => {
    if (displayDescription === false) {
      setDisplayDescription(true);
    } else {
      setDisplayDescription(false);
    }
  };

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

      <div
        className={`bg-thirdColor w-full min-h-[40rem] lg:min-h-[45rem] xlg:min-h-[40rem] mx-auto md:rounded-3xl flex flex-col lg:flex-row overflow-hidden relative`}
      >
        <Link
          to={
            url === "all-transactions"
              ? `/${name}/all-transactions`
              : `/${name}`
          }
          className="absolute text-white text-3xl z-30 top-2 pl-4 transition-all duration-300 hover:text-[#28bf8a]"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="lg:w-1/2 flex flex-col items-center relative">
          <div
            className={`w-5/6 text-white relative top-8 items-center transition-all duration-300 ${
              !displayDescription ? "delay-0" : "delay-300"
            } ${displayDescription ? "opacity-100" : "opacity-0"}
            ${displayDescription ? "z-10" : "z-0"}`}
          >
            <h3 className="text-3xl p-6 text-center text-orange-500">
              Description
            </h3>
            <p
              ref={textRef}
              className={`px-6 pb-6 whitespace-pre-line min-h-[20rem] max-h-[20rem] border-2 border-neutral-700 ${overflow}`}
            >
              {formData.description}
            </p>
          </div>

          <div
            className={`text-white w-11/12 flex flex-col absolute items-center transition-all ${
              !displayDescription ? "delay-300" : "delay-0"
            } duration-300 ${displayDescription ? "opacity-0" : "opacity-100"}`}
          >
            <h1 className="text-2xl lg:text-2xl xlg:text-3xl mt-20 md:mt-12 mb-8 px-6 flex items-center justify-center font-semibold w-full md:w-10/12 text-orange-500">
              {formData.title}
            </h1>
            <div className="w-full md:w-10/12 mx-auto text-base md:text-xl lg:text-lg xlg:text-xl font-semibold">
              <hr className="border-neutral-700 border-dashed border-2 w-11/12 mx-auto" />
              <div className="flex justify-between items-center text-gray-400">
                <p className="px-6 pt-6">
                  {name === "incomes" ? "Amount" : "Price"}
                </p>
                <p
                  className={`${
                    name === "incomes" ? "text-secondColor" : "text-red-500"
                  } px-6 pt-6`}
                >
                  {name === "incomes" ? formData.amount : "-" + formData.price}$
                </p>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <p className="p-6">Category</p>
                <p className="p-6">
                  {formData.category !== null &&
                    formData.category.charAt(0).toUpperCase() +
                      formData.category
                        .slice(1)
                        .toLowerCase()
                        .replace("_", " ")}
                </p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p className="px-6 pb-6">Operation Date</p>
                <p className="px-6 pb-6">{formData.date}</p>
              </div>
              <hr className="border-neutral-700 border-dashed border-2 w-11/12 mx-auto" />
            </div>
          </div>

          {!isEditting && !isLargeScreen && (
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
              descriptionIcon={faQuoteLeft}
              displayDescription={handleDisplayDescription}
              isDisplayedDescription={displayDescription}
            />
          )}
        </div>

        <form className="w-full md:w-11/12 lg:w-1/2 mx-auto flex flex-col items-center text-white relative">
          {isEditting && !isLargeScreen && (
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
              descriptionIcon={faQuoteLeft}
              displayDescription={handleDisplayDescription}
              isDisplayedDescription={displayDescription}
            />
          )}

          <div
            className={`flex flex-col w-11/12 lg:w-5/6 relative lg:top-8 transition-all duration-300 ${
              !displayDescription ? "delay-0" : "delay-300"
            } ${displayDescription ? "opacity-100" : "opacity-0"}
            ${displayDescription ? "z-10" : "z-0"}`}
          >
            <label
              htmlFor="desription"
              className="mt-20 lg:mt-6 lg:pb-2 text-3xl text-center text-orange-500"
            >
              Edit description
            </label>
            <textarea
              disabled={!isEditting}
              id="description"
              name="description"
              onChange={handleChange}
              value={formData.description}
              className={`bg-main w-full p-4 mt-4 ${
                isLargeScreen && !displayDescription
                  ? "min-h-[30rem] max-h-[30rem]"
                  : "min-h-[20rem] max-h-[20rem]"
              } sm:min-h-[20rem] sm:max-h-[20rem] outline-none transition-all duration-150 focus:outline focus:outline-secondColor`}
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

          <div
            className={`w-5/6 rounded-3xl flex flex-col justify-center items-center mx-auto lg:mt-6 absolute transition-all duration-300 ${
              !displayDescription ? "delay-300" : "delay-0"
            } ${displayDescription ? "opacity-0" : "opacity-100"}`}
          >
            <div className="w-full flex flex-col">
              <Input
                textLgSize={"lg:text-xl"}
                labelText={"Title"}
                icon={faHeader}
                placeholder="Enter your title"
                type="text"
                inputId="title"
                onChange={handleChange}
                value={formData.title}
                disabled={!isEditting}
                maxLength="80"
              />
              {formErrors && (
                <p className="h-4 -mt-2 mb-4 text-red-500 text-center">
                  {formErrors.title}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xlg:flex-row w-full justify-between -mt-8">
              <div className="flex flex-col w-full sm:w-1/2 lg:w-full xlg:w-2/5">
                <Input
                  textLgSize={"lg:text-xl"}
                  labelText={"Date"}
                  disabled={!isEditting}
                  icon={faCalendar}
                  type="date"
                  inputId={"date"}
                  onChange={handleChange}
                  value={formData.date}
                  ref={dateInputRef}
                  onFocus={handleShowPicker}
                />

                {formErrors && (
                  <p className="h-4 -mt-2 mb-4 text-red-500 text-center">
                    {formErrors.date}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full sm:w-3/5 lg:w-full 2xl:w-1/2 -mt-8 sm:mt-0 lg:-mt-8 xlg:mt-0">
                <label
                  htmlFor="category"
                  className="text-white text-nowrap font-semibold text-xl mt-8"
                >
                  Category
                </label>
                <CustomSelect
                  divClass="w-full relative mt-2 "
                  buttonClass="rounded-3xl h-12"
                  bgClass="bg-neutral-800 sm:bg-main"
                  isCategory={true}
                  resource={name}
                  category={formData.category}
                  setCategoryUpdate={setFormData}
                />
                {formErrors && (
                  <p className="h-4 mt-2 mb-4 text-red-500 text-center">
                    {formErrors.category}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col -mt-8">
              <Input
                textLgSize={"lg:text-xl"}
                labelText={name === "incomes" ? "Amount" : "Price"}
                inputId={value}
                icon={faDollar}
                type="number"
                min="0.01"
                step="0.01"
                placeholder={`Enter yout ${value}`}
                disabled={!isEditting}
                onChange={handleChange}
                value={name === "incomes" ? formData.amount : formData.price}
              />

              {formErrors && (
                <p className="h-4 -mt-2 mb-4 text-red-500 text-center">
                  {name === "incomes" ? formErrors.amount : formErrors.price}
                </p>
              )}
            </div>
          </div>
          {isLargeScreen && (
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
              descriptionIcon={faQuoteLeft}
              displayDescription={handleDisplayDescription}
              isDisplayedDescription={displayDescription}
            />
          )}
        </form>
        {!isLargeScreen && (
          <div
            className={`absolute w-1/2 h-full bg-black z-20 transition-all duration-300 ${
              isEditting ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col justify-center -translate-y-1/2 relative top-1/2">
              <img
                src={logo}
                alt="expense tracker logo - money with wings"
                className="w-[30rem] mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionElementLayoutForm;
