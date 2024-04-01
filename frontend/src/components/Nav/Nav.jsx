import React, { useState } from "react";
import classes from "./Nav.module.css";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Expenses from "../Expenses/Expenses";
import Earnings from "../Earnings/Earnings";
import Home from "../Home/Home";
import Summaries from "../Summaries/Summaries";
import Login from "../Login/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const [menuActive, setMenuActive] = useState(false);
  const [chosenLink, setChosenLink] = useState("Home");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(authActions.logout());  
  }

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
        <div className={classes.navbar__logo}>
          <div className={classes.navbar__logo__container}>
            <span className={classes.logo__first}>A</span>
            <span className={classes.logo__second}>A</span>
            <span className={classes.logo__third}>A</span>
            <span className={classes.logo__fourth}>A</span>
          </div>
          <p className={classes.navbar__logo__p}>A&A</p>
        </div>
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
        {isAuthenticated ? (
          <button className={classes.navbar__logoutBtn} onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} className={classes.navbar__logoutBtn__icon}/>
            <span className={classes.navbar__logoutBtn__text}>Logout</span>
            </button>
        ) : (
          // <button className={classes.navbar__loginBtn}>
            <Link to={"/Login"} className={classes.navbar__loginBtn}>
              <FontAwesomeIcon
                icon={faRightToBracket}
                className={classes.navbar__loginBtn__icon}
              />
              <span className={classes.navbar__loginBtn__text}>Login</span>
            </Link>

        )}
      </nav>
      <Routes>
        <Route path="Home" exact={true} element={<Home />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="summaries" element={<Summaries />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Nav;
