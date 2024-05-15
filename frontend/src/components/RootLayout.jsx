import React from "react";
import Nav from "./Nav/Nav";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { jwtDecode } from "jwt-decode";

function RootLayout() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  if (token) {
    const userId = jwtDecode(token).userId;
    const exp = jwtDecode(token).exp;
    const currentDate = new Date();
    const tokenDate = new Date(exp * 1000);
    if (currentDate > tokenDate) {
      localStorage.removeItem("token");
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
