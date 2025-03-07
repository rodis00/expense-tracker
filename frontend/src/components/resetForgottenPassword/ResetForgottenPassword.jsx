import React from "react";
import Input from "../form/Input";
import { Link } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResetForgottenPassword = ({
  isPassword,
  displayInformation,
  handleShowPassword,
  isPending,
  handleChange,
  placeholder,
  type,
  inputId,
  title,
  icon,
  value,
  error,
  handleSubmit,
}) => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="sm:bg-thirdColor w-full md:w-3/4 lg:w-1/2 min-h-60 rounded-3xl flex flex-col items-center pb-8">
        <h1 className="text-white text-4xl text-center py-8">{title}</h1>
        <div className="w-3/4 mx-auto">
          {!displayInformation && !isPending && (
            <Input
              icon={icon}
              placeholder={placeholder}
              type={type}
              inputId={inputId}
              value={value}
              onChange={handleChange}
            >
              {isPassword && (
                <button
                  type="button"
                  className="absolute right-4"
                  onClick={handleShowPassword}
                >
                  <FontAwesomeIcon
                    icon={type === "password" ? faEyeSlash : faEye}
                  />
                </button>
              )}
            </Input>
          )}
          {!displayInformation && isPending && (
            <p className="text-yellow-500 text-xl text-center mt-8">
              Loading...
            </p>
          )}
          {displayInformation && !isPending && (
            <p className="text-secondColor text-xl text-center mt-8">
              {displayInformation}
            </p>
          )}
          {error && (
            <p className="h-4 text-red-500 mb-4 text-center">{error}</p>
          )}
        </div>
        {!displayInformation && !isPending ? (
          <div className="flex items-center gap-20">
            <Link
              to={"/login"}
              className="text-neutral-400 mt-4 border-b-2 border-neutral-400 transition-all duration-300 hover:text-white hover:border-white"
            >
              Go back
            </Link>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white w-28 h-12 bg-secondColor font-semibold rounded-full mt-4 transition-all duration-300 hover:bg-[#28bf8a]"
            >
              Submit
            </button>
          </div>
        ) : (
          ""
        )}
        {displayInformation && !isPending && isPassword && (
          <Link
            to={"/login"}
            className="min-w-44 h-12 text-white rounded-full flex justify-center items-center bg-secondColor mt-12 transition-all duration-300 hover:bg-[#28bf8a]"
          >
            Go to the login page
          </Link>
        )}
      </div>
    </div>
  );
};

export default ResetForgottenPassword;
