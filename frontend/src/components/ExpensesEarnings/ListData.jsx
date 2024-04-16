import React from "react";
import ItemData from "./ItemData";
import classes from "./ListData.module.css";

function ListData({ items, name }) {
  if (items.length === 0) {
    return <h2 className={classes.list}>Found no {name}.</h2>;
  }

  return (
    <ul className={classes.list}>
      {items.map((prev) => (
        <ItemData
          key={prev.id}
          title={prev.title}
          amount={prev.amount}
          date={prev.date}
        />
      ))}
    </ul>
  );
}

export default ListData;
