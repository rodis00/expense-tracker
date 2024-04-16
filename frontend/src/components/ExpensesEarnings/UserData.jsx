import React, { useState } from "react";
import classes from "./UserData.module.css";
import ListData from "./ListData";
import Chart from "../Chart/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import YearFilter from "./YearFilter";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import Modal from "../Modal/Modal";
import UserForm from "./UserForm";

function UserData({
  items,
  name,
  secondName,
  upperName,
  amountName,
  secondAmountName,
}) {
  const [selectedYear, setSelectedYear] = useState("2024");

  const version = useSelector((state) => state.modal.modalVersion);
  const dispatch = useDispatch();

  function handleOpenModalForm() {
    dispatch(modalActions.showForm());
  }

  const handleFilteredYear = (year) => {
    setSelectedYear(year);
  };

  const filteredItems = items.filter((item) => {
    return item.date.getFullYear().toString() === selectedYear;
  });

  let amount = 0;

  for (const element of filteredItems) {
    amount += element.amount;
  }

  return (
    <>
      <Modal open={version}>
        <UserForm
          // onSaveUserData={handleNewExpense}
          httpName={name}
          name={secondName}
          secondName={upperName}
          amount={amountName}
          httpAmount={secondAmountName}
        />
      </Modal>
      <main className={classes.main}>
        <h2 className={classes.total}>
          Total {name}:
          {amount <= 0 ? (
            ""
          ) : (
            <span
              className={`${
                name === "expenses" ? classes.total__span : classes.total__span2
              }`}
            >
              {name === "expenses" ? "-" : ""}
              {amount} <FontAwesomeIcon icon={faDollarSign} />
            </span>
          )}
        </h2>
        <Chart items={filteredItems} name={name} />
        <div className={classes.options}>
          <button
            className={classes.modalOpenBtn}
            onClick={handleOpenModalForm}
          >
            Add new {secondName}
            <span>
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </button>
          <YearFilter
            selected={selectedYear}
            onYearChange={handleFilteredYear}
          />
        </div>
        <div className={classes.section}>
          <ListData items={filteredItems} name={name} />
        </div>
      </main>
    </>
  );
}

export default UserData;
