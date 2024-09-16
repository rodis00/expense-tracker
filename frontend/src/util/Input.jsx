import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({ labelText, icon, placeholder, type, inputId, children, className='' }) => {
  return (
    <>
      <label
        htmlFor={inputId}
        className="text-white text-nowrap font-semibold text-xl lg:text-base mt-8"
      >
        {labelText}
      </label>
      <div className="w-full relative flex items-center text-white mt-2 mb-4 mx-auto">
        <span className="absolute left-4">
          <FontAwesomeIcon icon={icon} />
        </span>
        <input
          id={inputId}
          name={inputId}
          type={type}
          placeholder={placeholder}
          className={`w-full border-none h-12 lg:h-10 bg-neutral-800 sm:bg-main rounded-3xl pl-12 text-lg lg:text-base lg:focus:text-sm transition-all duration-200 focus:ring-1 focus:ring-white focus:text-base ${className}`}
        />
        {children}
      </div>
    </>
  );
};

export default Input;
