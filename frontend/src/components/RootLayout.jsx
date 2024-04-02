import React from "react";
import Nav from "./Nav/Nav";
import { Outlet } from "react-router-dom";

function RootLayout() {
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
