import React from "react";
import classes from "./UserData.module.css";
import ListData from "./ListData";
import Chart from "../Chart/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

function UserData({ items }) {
  let amount = 0;

  for (const element of items) {
    amount += element.price;
  }

  return (
    <>
      <h2 className={classes.total}>
        Total expenses:
        {amount <= 0 ? (
          ""
        ) : (
          <span>
            -{amount} <FontAwesomeIcon icon={faDollarSign} />
          </span>
        )}
      </h2>
      <Chart items={items} />
      <div className={classes.section}>
        <ListData items={items} />
      </div>
    </>
  );
}

export default UserData;
