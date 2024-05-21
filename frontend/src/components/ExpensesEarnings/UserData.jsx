import React, { useEffect, useState } from "react";
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
  const [newItems, setNewItems] = useState([]);

  const version = useSelector((state) => state.modal.modalVersion);
  const dispatch = useDispatch();

  const earningItemToUpdate = useSelector(
    (state) => state.earning.itemToUpdate
  );

  const expenseItemToUpdate = useSelector(
    (state) => state.expense.itemToUpdate
  );

  useEffect(() => {
    const modifiedElements = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        amount: secondAmountName === "price" ? item.price : item.amount,
        date: new Date(item.date),
      };
    });
    setNewItems(modifiedElements);
  }, [secondAmountName, items]);

  function handleOpenModalForm() {
    dispatch(modalActions.showForm());
  }

  const handleFilteredYear = (year) => {
    setSelectedYear(year);
  };

  const filteredItems = newItems.filter((item) => {
    return item.date.getFullYear().toString() === selectedYear;
  });

  let amount = 0;

  for (const element of filteredItems) {
    amount += element.amount;
  }

  function handleDelete(id) {
    const updatedItems = newItems.filter((item) => item.id !== id);
    setNewItems(updatedItems);
  }

  function handleUpdate(item) {
    const newItem = {
      id: item.id,
      title: item.title,
      amount: name === "expenses" ? item.price : item.amount,
      date: new Date(item.date),
    };
    const updatedItems = newItems.map((elem) =>
      elem.id === item.id ? newItem : elem
    );
    setNewItems(updatedItems);
  }

  return (
    <>
      <Modal open={version === "form"}>
        <UserForm
          name={name}
          secondName={secondName}
          upperName={upperName}
          amount={amountName}
          httpAmount={secondAmountName}
        />
      </Modal>
      <Modal open={version === "updateForm"}>
        <UserForm
          name={name}
          secondName={secondName}
          upperName={upperName}
          amount={amountName}
          httpAmount={secondAmountName}
          selectedItem={
            name === "expenses" ? expenseItemToUpdate : earningItemToUpdate
          }
          onUpdate={handleUpdate}
          update={true}
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
              {amount.toFixed(2)} <FontAwesomeIcon icon={faDollarSign} />
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
          <ListData
            items={filteredItems}
            name={name}
            secondName={secondName}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </>
  );
}

export default UserData;
