import React, { useState } from "react";
import Input from "../../components/form/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import googleIcon from "../../assets/google-color-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../http/auth";
import { generateRandomColor } from "../../util/ColorGenerator";
import InProgressModal from "../../components/modal/InProgressModal";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modal-slice";

const Signup = () => {
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPasswordData, setConfirmPasswordData] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/dashboard");
      localStorage.setItem("bg", generateRandomColor());
    },
    onError: (error) => {
      setFormErrors(error);
    },
  });

  function handleShowPassword() {
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  }

  function handleShowConfirmPassword() {
    if (typeConfirmPassword === "password") {
      setTypeConfirmPassword("text");
    } else {
      setTypeConfirmPassword("password");
    }
  }

  function handleConfirmPassword(event) {
    setConfirmPasswordData(event.target.value);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormErrors({});
    if (formData.password !== confirmPasswordData) {
      setPasswordError("Passwords are not the same!");
      return;
    }
    mutate(formData);
  }

  function showInProgressModal() {
    dispatch(modalActions.showInProgress());
  }

  return (
    <>
      <InProgressModal />
      <div className="w-full h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-main sm:bg-fourthColor w-full sm:w-2/3 md:w-1/2 xlg:w-1/3 min-h-[36rem] flex flex-col rounded-3xl"
        >
          <h1 className="text-center text-3xl lg:text-2xl text-white my-8 lg:my-4 h-[10%]">
            Signup
          </h1>
          <div className="w-[80%] mx-auto">
            <Input
              labelText={"Username"}
              icon={faUser}
              placeholder={"Enter your username"}
              type={"text"}
              inputId={"username"}
              value={formData.username}
              onChange={handleChange}
            />

            {formErrors && (
              <p className="text-red-500">{formErrors.username}</p>
            )}

            <Input
              labelText={"Email"}
              icon={faEnvelope}
              placeholder={"Enter your email"}
              type={"text"}
              inputId={"email"}
              value={formData.email}
              onChange={handleChange}
            />

            {formErrors && <p className="text-red-500">{formErrors.email}</p>}

            <Input
              labelText="Password"
              icon={faLock}
              placeholder="Enter your password"
              type={typePassword}
              inputId="password"
              value={formData.password}
              onChange={handleChange}
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
            <p className="text-neutral-500 -mt-3 relative float-right lg:text-sm">
              Password must contain 8 charatcters.
            </p>

            {formErrors && (
              <p className="text-red-500">{formErrors.password}</p>
            )}

            <Input
              labelText="Confirm password"
              icon={faLock}
              placeholder="Confirm your password"
              type={typeConfirmPassword}
              inputId="Confirm password"
              value={confirmPasswordData}
              onChange={handleConfirmPassword}
            >
              <button
                type="button"
                className="absolute right-4"
                onClick={handleShowConfirmPassword}
              >
                <FontAwesomeIcon
                  icon={typeConfirmPassword === "password" ? faEyeSlash : faEye}
                />
              </button>
            </Input>

            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            <button
              type="submit"
              className="h-10 w-40 text-white text-lg lg:text-base bg-secondColor rounded-3xl border-none transition-all duration-300 hover:bg-[#28bf8a]"
            >
              Signup
            </button>
            <div>
              <span className="text-white pr-2">Already have an account?</span>
              <Link
                to={"/login"}
                className="text-secondColor transition-all duration-300 hover:text-red-600"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="h-[3px] w-[45%] bg-neutral-500"></div>
            <p className="text-neutral-500 text-xl">or</p>
            <div className="h-[3px] w-[45%] bg-neutral-500"></div>
          </div>

          <button
            type="button"
            className="h-10 flex items-center gap-4 mx-auto my-6 rounded-3xl bg-neutral-700 p-4 text-white transition-all duration-300 hover:bg-neutral-600"
            onClick={showInProgressModal}
          >
            <img src={googleIcon} width={20} height={40} />
            <span>Signup with Google Account</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
