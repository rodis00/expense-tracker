import React, { useRef, useState } from "react";
import classes from "./UserForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";

function UserForm({ onSaveUserData, name, secondName, amount }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const dateInputRef = useRef();

  const dispatch = useDispatch();

  const version = useSelector((state) => state.modal.modalVersion);

  function handleCloseForm() {
    dispatch(modalActions.closeModal());
  }

  function handleTitleChange(event) {
    setEnteredTitle((title) => (title = event.target.value));
  }

  function handleAmountChange(event) {
    setEnteredAmount((price) => (price = event.target.value));
  }

  function handleDateChange(event) {
    setEnteredDate((date) => (date = event.target.value));
  }

  function handleFocus() {
    dateInputRef.current.showPicker();
  }

  function submitHandler(event) {
    event.preventDefault();

    const userData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    onSaveUserData(userData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  }

  return (
    <form onSubmit={submitHandler} className={classes.userForm}>
      <div className={classes.userForm__itemsData}>
        <div className={classes.userForm__itemData}>
          <label>{secondName} Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={handleTitleChange}
            placeholder="Enter Title"
            required
          />
        </div>
        <div className={classes.userForm__itemData}>
          <label>{amount}</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder={`Enter ${amount}`}
            value={enteredAmount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <div className={classes.userForm__itemData}>
          <label>Date</label>
          <input
            type="date"
            min="2021-01-01"
            value={enteredDate}
            onChange={handleDateChange}
            onFocus={handleFocus}
            ref={dateInputRef}
            required
          />
        </div>
      </div>
      <div className={classes.actions}>
        <button
          className={classes.userForm__closeBtn}
          onClick={handleCloseForm}
        >
          Close
        </button>
        <button type="submit" className={classes.userForm__btn}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Add {name}</span>
        </button>
      </div>
    </form>
  );
}

export default UserForm;
