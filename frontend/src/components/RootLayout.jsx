import React from "react";
import Nav from "./Nav/Nav";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { jwtDecode } from "jwt-decode";
import { expenseActions } from "../store/expense-slice";
import { earningsActions } from "../store/earnings-slice";

function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (token) {
    const userId = jwtDecode(token).userId;
    const exp = jwtDecode(token).exp;
    const currentDate = new Date();
    const tokenDate = new Date(exp * 1000);
    if (currentDate > tokenDate) {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      dispatch(expenseActions.setInitialStateOnLogout());
      dispatch(earningsActions.setInitialStateOnLogout());
      navigate("/login");
    } else {
      dispatch(authActions.login(userId));
    }
  }

  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
