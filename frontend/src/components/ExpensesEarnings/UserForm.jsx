import React, { useRef } from "react";
import classes from "./UserForm.module.css";
import { json } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import { expenseActions } from "../../store/expense-slice";
import { earningsActions } from "../../store/earnings-slice";

function UserForm({ httpName, httpAmount, name, secondName, amount }) {
  const dateInputRef = useRef();

  const dispatch = useDispatch();

  const version = useSelector((state) => state.modal.modalVersion);

  const user = useSelector((state) => state.auth.user);

  const token = localStorage.getItem("token");

  function handleCloseForm() {
    dispatch(modalActions.closeModal());
  }

  function handleFocus() {
    dateInputRef.current.showPicker();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const userData = {
      title: data.title,
      [httpAmount]: +data.amount,
      date: data.date,
    };

    const response = await fetch(
      `http://localhost:8080/expense-tracker/api/v1/${httpName}/users/${user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw json({ message: "Could not add data." }, { status: 500 });
    }

    const resData = await response.json();

    if (httpName === "expenses") {
      dispatch(expenseActions.addExpense(resData));
    } else {
      dispatch(earningsActions.addEarnings(resData));
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.userForm}>
      <div className={classes.userForm__itemsData}>
        <div className={classes.userForm__itemData}>
          <label>{secondName} Title</label>
          <input type="text" name="title" placeholder="Enter Title" required />
        </div>
        <div className={classes.userForm__itemData}>
          <label>{amount}</label>
          <input
            type="number"
            name="amount"
            min="0.01"
            step="0.01"
            placeholder={`Enter ${amount}`}
            required
          />
        </div>
        <div className={classes.userForm__itemData}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            min="2021-01-01"
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
          type="button"
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
