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

    dispatch(authActions.login(userId));
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
