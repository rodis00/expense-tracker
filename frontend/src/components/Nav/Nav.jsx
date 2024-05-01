import React, { useEffect, useRef, useState } from "react";
import classes from "./Nav.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@react-hook/media-query";
import { expenseActions } from "../../store/expense-slice";
import { earningsActions } from "../../store/earnings-slice";

function Nav() {
  const [menuActive, setMenuActive] = useState(false);

  const divRef = useRef();

  const location = useLocation();

  const isSmallScreen = useMediaQuery(
    "(min-width: 601px) and (max-width: 1000px)"
  );

  useEffect(() => {
    const indicator = divRef.current;

    if (indicator) {
      switch (location.pathname) {
        case "/":
          indicator.style.transform = isSmallScreen
            ? "translateY(calc(2.5rem * 0))"
            : "translateY(calc(3rem * 0))";
          break;
        case "/expenses":
          indicator.style.transform = isSmallScreen
            ? "translateY(calc(2.5rem * 1 + 10px))"
            : "translateY(calc(3rem * 1 + 10px))";
          break;
        case "/earnings":
          indicator.style.transform = isSmallScreen
            ? "translateY(calc(2.5rem * 2 + 20px))"
            : "translateY(calc(3rem * 2 + 20px))";
          break;
        case "/summaries":
          indicator.style.transform = isSmallScreen
            ? "translateY(calc(2.5rem * 3 + 30px))"
            : "translateY(calc(3rem * 3 + 30px))";
          break;
        case "/login":
          indicator.style.transform = isSmallScreen
            ? "translateY(34.5rem)"
            : "translateY(34.05rem)";
          break;
        case "/signup":
          indicator.style.transform = isSmallScreen
            ? "translateY(34.5rem)"
            : "translateY(34.05rem)";
          break;
        default:
          console.log("wrong pathname");
          break;
      }
    }
  }, [location.pathname, isSmallScreen]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    dispatch(expenseActions.setInitialStateOnLogout());
    dispatch(earningsActions.setInitialStateOnLogout());
  }

  function handleMenuActiveChange() {
    setMenuActive((active) => !active);
  }

  return (
    <>
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
          <li className={classes.navbar__list__elem}>
            <NavLink to={"/"} className={classes.navbar__list__elem__link} end>
              <FontAwesomeIcon
                icon={faHouse}
                className={classes.navbar__list__elem__link__icon}
              />
              <span className={classes.navbar__list__elem__link__title}>
                home
              </span>
            </NavLink>
          </li>

          <li className={classes.navbar__list__elem}>
            <NavLink
              to={"expenses"}
              className={classes.navbar__list__elem__link}
            >
              <FontAwesomeIcon
                icon={faDollarSign}
                className={classes.navbar__list__elem__link__icon}
              />
              <span className={classes.navbar__list__elem__link__title}>
                expenses
              </span>
            </NavLink>
          </li>

          <li className={classes.navbar__list__elem}>
            <NavLink
              to={"earnings"}
              className={classes.navbar__list__elem__link}
            >
              <FontAwesomeIcon
                icon={faDollarSign}
                className={classes.navbar__list__elem__link__icon}
              />
              <span className={classes.navbar__list__elem__link__title}>
                earnings
              </span>
            </NavLink>
          </li>

          <li className={classes.navbar__list__elem}>
            <NavLink
              to={"summaries"}
              className={classes.navbar__list__elem__link}
            >
              <FontAwesomeIcon
                icon={faDollarSign}
                className={classes.navbar__list__elem__link__icon}
              />
              <span className={classes.navbar__list__elem__link__title}>
                summaries
              </span>
            </NavLink>
          </li>
        </ul>
        {isAuthenticated ? (
          <button className={classes.navbar__logoutBtn} onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={classes.navbar__logoutBtn__icon}
            />
            <span className={classes.navbar__logoutBtn__text}>Logout</span>
          </button>
        ) : (
          <NavLink to={"login"} className={classes.navbar__loginBtn}>
            <span className={classes.navbar__login__link}>
              <FontAwesomeIcon
                icon={faRightToBracket}
                className={classes.navbar__loginBtn__icon}
              />
              <span className={classes.navbar__loginBtn__text}>Login</span>
            </span>
          </NavLink>
        )}
        <div className={classes.navbar__list__indicator} ref={divRef}></div>
      </nav>
    </>
  );
}

export default Nav;
