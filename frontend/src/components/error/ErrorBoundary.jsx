import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  const navigate = useNavigate();

  let title = "500";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "404";
    message = "Could not find resource or page.";
  }

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full flex flex-col items-center">
        <div className="text-3xl flex flex-col sm:flex-row items-center justify-center gap-4 w-[90%]">
          <span className="">{title}</span>
          <span className="block h-1 w-1/3 sm:h-10 sm:w-1 bg-white"></span>
          <span>{message}</span>
        </div>
        <button className="mt-20 w-36 h-12 bg-neutral-600 rounded-full transition-all duration-300 hover:bg-neutral-500" onClick={handleBack}>Go back!</button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
