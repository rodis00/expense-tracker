import React from "react";
import classes from "./UserData.module.css";
import ListData from "./ListData";
import Chart from "../Chart/Chart";

function UserData({ items }) {
  return (
    <>
      <h2 className={classes.total}>Total expenses: </h2>
      <Chart items={items} />
      <div className={classes.section}>
        <ListData items={items} />
      </div>
    </>
  );
}

export default UserData;
