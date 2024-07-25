import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import googleIcon from "../../assets/google-color-icon.png";
import Input from "../../util/Input";
import { Link } from "react-router-dom";

const Login = () => {
  const [typePassword, setTypePassword] = useState("password");

  function handleShowPassword() {
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        action=""
        className="bg-main sm:bg-fourthColor w-full sm:w-2/3 md:w-1/2 lg:w-1/3 min-h-[35rem] flex flex-col rounded-3xl"
      >
        <h1 className="text-center text-3xl text-white my-8 h-[10%] lg:text-2xl">Login</h1>
        <div className="w-[80%] mx-auto">
          <Input
            labelText="Username"
            icon={faUser}
            placeholder="Enter your username"
            type="text"
            inputId="username"
          />

          <Input
            labelText="Password"
            icon={faLock}
            placeholder="Enter your password"
            type={typePassword}
            inputId="password"
          >
            <button
              type="button"
              className="absolute right-4"
              onClick={handleShowPassword}
            >
              <FontAwesomeIcon
                icon={typePassword === "password" ? faEyeSlash : faEye}
              />
            </button>
          </Input>

          <button className="text-neutral-500 -mt-3 transition-all duration-300 hover:text-red-500 relative float-right lg:text-sm">
            Forgot your password?
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 mt-12">
          <button
            type="button"
            className="h-10 lg:h-9 w-40 text-white text-lg lg:text-base bg-secondColor rounded-3xl border-none transition-all duration-300 hover:bg-[#28bf8a]"
          >
            Login
          </button>
          <div>
            <span className="text-white pr-2">Don't have an account?</span>
            <Link
              to={'/signup'}
              className="text-secondColor transition-all duration-300 hover:text-red-600"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="h-[3px] w-[45%] bg-neutral-500"></div>
          <p className="text-neutral-500 text-xl">or</p>
          <div className="h-[3px] w-[45%] bg-neutral-500"></div>
        </div>

        <button
          type="button"
          className="h-10 flex items-center gap-4 mx-auto my-6 rounded-3xl bg-neutral-700 p-4 text-white transition-all duration-300 hover:bg-neutral-600"
        >
          <img src={googleIcon} width={20} height={40} />
          <span>Login with Google Account</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
