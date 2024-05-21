import React, { useEffect, useState } from "react";
import ItemData from "./ItemData";
import classes from "./ListData.module.css";
import { json } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-slice";
import { earningsActions } from "../../store/earnings-slice";
import { modalActions } from "../../store/modal-slice";

function ListData({ items, name, onDelete, secondName }) {
  const [selectedItem, setSelectedItem] = useState();

  const expensePageNumber = useSelector((state) => state.expense.pageNumber);
  const earningPageNumber = useSelector((state) => state.earning.pageNumber);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  async function handleDelete() {
    const response = await fetch(
      `http://localhost:8080/expense-tracker/api/v1/${name}/${selectedItem.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw json({ message: `Could not delete ${name}.` }, { status: 500 });
    }

    if (name === "expenses") {
      dispatch(expenseActions.deleteExpense(selectedItem.id));
    }
    if (name === "earnings") {
      dispatch(earningsActions.deleteEarning(selectedItem.id));
    }
    onDelete(selectedItem.id);
    dispatch(modalActions.closeModal());
  }

  function handleShowModal(item) {
    setSelectedItem(item);
    dispatch(modalActions.showDeleteModal());
  }

  if (items.length === 0) {
    return <h2 className={classes.list}>Found no {name}.</h2>;
  }

  function handlePrevPage() {
    if (name === "expenses") {
      dispatch(expenseActions.decreasePageNumber());
    }
    if (name === "earnings") {
      dispatch(earningsActions.decreasePageNumber());
    }
  }

  function handleNextPage() {
    if (name === "expenses") {
      dispatch(expenseActions.increasePageNumber());
      console.log(items)
    }
    if (name === "earnings") {
      dispatch(earningsActions.increasePageNumber());
    }
  }

  function handleShowUpdateForm(item) {
    if (name === "expenses") {
      dispatch(expenseActions.setItemToUpdate(item.id));
    }
    if (name === "earnings") {
      dispatch(earningsActions.setItemToUpdate(item.id));
    }
    dispatch(modalActions.showUpdateForm());
  }

  return (
    <>
      {items.length === 0 ? (
        <h2 className={classes.list}>Found no {name}.</h2>
      ) : (
        <ul className={classes.list}>
          {items.map((item) => (
            <ItemData
              key={item.id}
              title={item.title}
              amount={item.amount}
              date={item.date}
              secondName={secondName}
              onShowModal={() => handleShowModal(item)}
              onShowUpdateModal={() => handleShowUpdateForm(item)}
              onDelete={handleDelete}
              selectedItem={selectedItem}
            />
          ))}
        </ul>
      )}
      {name === "expenses" && (
        <div className={classes.pageActions}>
          <button
            className={classes.moreBtn}
            onClick={handlePrevPage}
            disabled={expensePageNumber <= 0}
          >
            prev
          </button>
          <span className={classes.pageNumber}>{expensePageNumber + 1}</span>
          <button
            className={classes.moreBtn}
            onClick={handleNextPage}
            disabled={items.length < 5}
          >
            next
          </button>
        </div>
      )}
      {name === "earnings" && (
        <div className={classes.pageActions}>
          <button
            className={classes.moreBtn}
            onClick={handlePrevPage}
            disabled={earningPageNumber <= 0}
          >
            prev
          </button>
          <span className={classes.pageNumber}>{earningPageNumber + 1}</span>
          <button
            className={classes.moreBtn}
            onClick={handleNextPage}
            disabled={items.length < 5}
          >
            next
          </button>
        </div>
      )}
    </>
  );
}

export default ListData;
