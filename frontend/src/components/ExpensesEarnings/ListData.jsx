import React from "react";
import ItemData from "./ItemData";
import classes from "./ListData.module.css";
import { json } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-slice";
import { earningsActions } from "../../store/earnings-slice";

function ListData({ items, name, onDelete }) {
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expense.items);
  console.log(expenses);

  const token = localStorage.getItem("token");

  async function handleDelete(id) {
    const response = await fetch(
      `http://localhost:8080/expense-tracker/api/v1/${name}/${id}`,
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
      dispatch(expenseActions.deleteExpense(id));
    }
    if (name === "earnings") {
      dispatch(earningsActions.deleteEarning(id));
    }
    onDelete(id);
  }

  if (items.length === 0) {
    return <h2 className={classes.list}>Found no {name}.</h2>;
  }

  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <ItemData
          key={item.id}
          title={item.title}
          amount={item.amount}
          date={item.date}
          onDelete={() => handleDelete(item.id)}
        />
      ))}
    </ul>
  );
}

export default ListData;
