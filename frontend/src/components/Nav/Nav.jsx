import React, { useState } from "react";
import classes from "./Nav.module.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Expenses from "../Expenses/Expenses";
import Earnings from "../Earnings/Earnings";
import Home from "../Home/Home";
import Summaries from "../Summaries/Summaries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const [menuActive, setMenuActive] = useState(false);
  const [chosenLink, setChosenLink] = useState("Home");

  const navElements = [
    { icon: <FontAwesomeIcon icon={faHouse} />, title: "Home" },
    { icon: <FontAwesomeIcon icon={faDollarSign} />, title: "Expenses" },
    { icon: <FontAwesomeIcon icon={faDollarSign} />, title: "Earnings" },
    { icon: <FontAwesomeIcon icon={faDollarSign} />, title: "Summaries" },
  ];

  function handleMenuActiveChange() {
    setMenuActive((active) => !active);
  }

  return (
    <Router>
      <button
        onClick={handleMenuActiveChange}
        className={`${classes.toogleNav} ${
          menuActive ? classes.toogleActive : ""
        }`}
      ></button>
      <nav
        className={`${classes.navbar} ${
          menuActive ? classes.navbarActive : ""
        }`}
      >
        <h2>A&A</h2>
        <ul className={classes.navbar__list}>
          {navElements.map((elem) => (
            <li
              key={elem.title}
              className={`${classes.navbar__list__elem} ${
                chosenLink === elem.title
                  ? classes.navbar__list__elem__active
                  : ""
              }`}
            >
              <Link
                onClick={() => setChosenLink(elem.title)}
                to={`/${elem.title}`}
                className={`${classes.navbar__list__elem__link}`}
              >
                <span className={classes.navbar__list__elem__link__icon}>
                  {elem.icon}
                </span>
                <span className={classes.navbar__list__elem__link__title}>
                  {elem.title}
                </span>
              </Link>
            </li>
          ))}
          <div className={classes.navbar__list__indicator}></div>
        </ul>
        <button className={classes.navbar__loginBtn}>
          <FontAwesomeIcon
            icon={faRightToBracket}
            className={classes.navbar__loginBtn__icon}
          />
          <span className={classes.navbar__loginBtn__text}>Login</span>
        </button>
      </nav>
      <Routes>
        <Route path="Home" exact={true} element={<Home />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="summaries" element={<Summaries />} />
      </Routes>
    </Router>
  );
}

export default Nav;
