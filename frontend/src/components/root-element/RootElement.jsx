import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { authActions } from "../../store/auth-slice";
import SessionModal from "../../util/SessionModal";
import { modalActions } from "../../store/modal-slice";

const RootElement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      const currentDate = new Date();
      if (token) {
        const userId = jwtDecode(token).sub;
        const exp = jwtDecode(token).exp;
        const tokenDate = new Date(exp * 1000);
        if (currentDate > tokenDate) {
          localStorage.removeItem("token");
          dispatch(authActions.logout());
          navigate("/login");
          dispatch(modalActions.showSessionExpiredInfo());
        } else {
          dispatch(authActions.login(userId));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SessionModal />
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootElement;
