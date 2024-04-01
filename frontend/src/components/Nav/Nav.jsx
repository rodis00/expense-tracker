import React, { useState } from "react";
import classes from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const [menuActive, setMenuActive] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
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
            <NavLink
              to={"/"}
              className={`${({ isActive }) =>
                isActive ? classes.navbar__active : undefined} ${
                classes.navbar__list__elem__link
              }`}
              end
            >
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
              className={`${({ isActive }) =>
                isActive ? classes.navbar__active : undefined} ${
                classes.navbar__list__elem__link
              }`}
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
              className={`${({ isActive }) =>
                isActive ? classes.navbar__active : undefined} ${
                classes.navbar__list__elem__link
              }`}
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
              className={`${({ isActive }) =>
                isActive ? classes.navbar__active : undefined} ${
                classes.navbar__list__elem__link
              }`}
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

          <div className={classes.navbar__list__indicator}></div>
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
            <FontAwesomeIcon
              icon={faRightToBracket}
              className={classes.navbar__loginBtn__icon}
            />
            <span className={classes.navbar__loginBtn__text}>Login</span>
          </NavLink>
        )}
      </nav>
    </>
  );
}

export default Nav;
