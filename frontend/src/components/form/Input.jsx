import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = forwardRef(
  (
    {
      labelText,
      icon,
      placeholder,
      type,
      inputId,
      children,
      className = "",
      textSize,
      textLgSize,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <label
          htmlFor={inputId}
          className={`text-white text-nowrap font-semibold ${
            textSize ? textSize : "text-xl"
          } ${textLgSize ? textLgSize : "lg:text-base"} mt-8`}
        >
          {labelText}
        </label>
        <div className="w-full relative flex items-center text-white mt-2 mb-4 mx-auto">
          <span className="absolute left-4">
            <FontAwesomeIcon icon={icon} />
          </span>
          <input
            ref={ref}
            id={inputId}
            name={inputId}
            type={type}
            placeholder={placeholder}
            {...props}
            className={`w-full border-none h-12 bg-neutral-800 sm:bg-main rounded-3xl pl-12 text-lg lg:text-base lg:focus:text-sm transition-all duration-200 focus:ring-1 focus:ring-white focus:text-base ${className} disabled:cursor-not-allowed`}
          />
          {children}
        </div>
      </>
    );
  }
);

export default Input;
