import React from "react";
import classes from "./Nav.module.css";


function Nav() {

  const navElements = [`Home`, "Expenses", "Earnings", "Summaries"];

  return (
    <nav className={`${classes.navbar}`}>
      <h2 className={classes.navbar__h2}>A&A</h2>
      <ul className={classes.navbar__list}>
        {navElements.map(elem=>(
          <li key={elem} className={classes.navbar__list__elem}>{elem}</li>
        ))}
      </ul>
      <span className={classes.navbar__span}></span>
      <button className={classes.navbar__btn}>Login</button>
    </nav>
  );
}

export default Nav;
