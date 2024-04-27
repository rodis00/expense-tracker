import React, { useState } from "react";
import ItemData from "./ItemData";
import classes from "./ListData.module.css";
import { json } from "react-router-dom";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-slice";
import { earningsActions } from "../../store/earnings-slice";
import { modalActions } from "../../store/modal-slice";

function ListData({ items, name, onDelete, secondName }) {
  const [selectedItem, setSelectedItem] = useState();

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

  return (
    <>
      <ul className={classes.list}>
        {items.map((item) => (
          <ItemData
            key={item.id}
            title={item.title}
            amount={item.amount}
            date={item.date}
            secondName={secondName}
            onShowModal={() => handleShowModal(item)}
            onDelete={handleDelete}
            selectedItem={selectedItem}
          />
        ))}
      </ul>
    </>
  );
}

export default ListData;
