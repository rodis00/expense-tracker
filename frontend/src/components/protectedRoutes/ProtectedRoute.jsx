import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (
    token &&
    (location.pathname === "/login" || location.pathname === "/signup")
  ) {
    return <Navigate to={"/"} replace />;
  }

  if (
    !token &&
    (location.pathname === "/login" || location.pathname === "/signup")
  ) {
    return <Outlet />;
  }

  if (
    !token &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup"
  ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
