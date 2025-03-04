import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedAuthRoute() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");

  return !isAuthenticated && !token ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace />
  );
}

export default ProtectedAuthRoute;
