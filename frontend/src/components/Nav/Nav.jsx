import React, { useState } from "react";
import classes from "./Nav.module.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Expenses from "../Expenses/Expenses";
import Earnings from "../Earnings/Earnings";
import Home from "../Home/Home";
import Summaries from "../Summaries/Summaries";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";

function Nav() {
  const [menuActive, setMenuActive] = useState(false);

  const navElements = [
    { icon: <FontAwesomeIcon icon={faHouse} />, title: "Home" },
    { icon: <FontAwesomeIcon icon={faDollarSign} />, title: "Expenses" },
    { icon: <FontAwesomeIcon icon={faDollarSign} />, title: "Earnings" },
    { icon: <FontAwesomeIcon icon={faDollarSign} />, title: "Summaries" },
  ];

  function handleMenuActiveChange() {
    setMenuActive((elem) => !elem);
  }

  return (
    <Router>
      <nav className={classes.navbar}>
        {menuActive ? (
          <h2 className={classes.navbar__h2}>A&A</h2>
        ) : (
          <button onClick={handleMenuActiveChange}>click</button>
        )}
        <ul className={classes.navbar__list}>
          {navElements.map((elem) => {
            return menuActive ? (
              <li key={elem.title} className={classes.navbar__list__elem}>
                <Link
                  to={`/${elem.title}`}
                  className={classes.navbar__list__elem__link}
                >
                  <span className={classes.navbar__list__elem__link__icon}>
                    {elem.icon}
                  </span>
                  <span>{elem.title}</span>
                </Link>
              </li>
            ) : (
              <li key={elem.title} className={classes.navbar__list__elem}>
                <Link
                  to={`/${elem.title}`}
                  className={classes.navbar__list__elem__link}
                >
                  <span className={classes.navbar__list__elem__link__icon}>
                    {elem.icon}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
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
