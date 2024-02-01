import React from "react";
import ItemData from "./ItemData";
import classes from "./ListData.module.css";

function ListData({ items }) {
  if (items.length === 0) {
    return <h2 className={classes.list}>Found no expenses.</h2>;
  }

  return (
    <ul className={classes.list}>
      {items.map((prev) => (
        <ItemData
          key={Math.random.toString()}
          title={prev.title}
          price={prev.price}
          date={prev.date}
        />
      ))}
    </ul>
  );
}

export default ListData;
