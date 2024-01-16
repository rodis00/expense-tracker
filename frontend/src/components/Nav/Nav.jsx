import React from "react";
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

function Nav() {
  const navElements = [
    { icon: <FontAwesomeIcon icon={faDollarSign} />, title: "Expenses" },
    { icon: <FontAwesomeIcon icon={faDollarSign} />, title: "Earnings" },
    { icon: <FontAwesomeIcon icon={faDollarSign} />, title: "Summaries" },
  ];

  return (
    <Router>
      <nav className={classes.navbar}>
        <h2 className={classes.navbar__h2}>A&A</h2>
        <ul className={classes.navbar__list}>
          <li key="Home" className={`${classes.navbar__list__elem} `}>
            <Link to="/" className={classes.navbar__list__elem__link}>
              <FontAwesomeIcon icon={faHouse} className={classes.navbar__list__elem__link__icon}/>
              Home
            </Link>
          </li>
          {navElements.map((elem) => (
            <li key={elem.title} className={classes.navbar__list__elem}>
              <Link to={`/${elem.title}`} className={classes.navbar__list__elem__link}>
                <span className={classes.navbar__list__elem__link__icon}>{elem.icon}</span>
                <span>{elem.title}</span>
              </Link>
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
