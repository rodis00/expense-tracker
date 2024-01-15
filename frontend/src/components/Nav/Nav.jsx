import React from "react";
import classes from "./Nav.module.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Expenses from "../Expenses/Expenses";
import Earnings from "../Earnings/Earnings";
import Home from "../Home/Home";
import Summaries from "../Summaries/Summaries"
import Button from "../Button/Button";

function Nav() {
  const navElements = ["Expenses", "Earnings", "Summaries"];

  return (
    <Router>
      <nav className={`${classes.navbar}`}>
        <h2 className={classes.navbar__h2}>A&A</h2>
        <ul className={classes.navbar__list}>
          <li key="Home" className={classes.navbar__list__elem}><Link to='/' className={classes.navbar__list__elem__link}>Home</Link></li>
          {navElements.map((elem) => (
            <li key={elem} className={classes.navbar__list__elem}>
              <Link to={elem} className={classes.navbar__list__elem__link}>{elem}</Link>
            </li>
          ))}
        </ul>
        <span className={classes.navbar__span}></span>
        <Button className={classes.navbar__btn}>Login</Button>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="summaries" element={<Summaries />} />
      </Routes>
    </Router>
  );
}

export default Nav;
