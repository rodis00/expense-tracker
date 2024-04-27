import React from "react";
import Date from "../Date/Date";
import classes from "./ItemData.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ItemData({ title, amount, date, onDelete }) {
  return (
    <li className={classes.listItem}>
      <Date date={date} />
      <h2 className={classes.listItem__title}>{title}</h2>
      <div className={classes.listItem__price}>
        <FontAwesomeIcon icon={faDollarSign} />
        <span>{amount}</span>
      </div>
      <button className={classes.listItem__btn} onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
}

export default ItemData;
