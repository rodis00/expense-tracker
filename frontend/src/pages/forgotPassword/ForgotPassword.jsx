import React, { useState } from "react";
import Input from "../../components/form/Input";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../http/auth";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [emailError, setEmailError] = useState("");
  const [informationAboutSentEmail, setInformationAboutSentEmail] =
    useState("");
  const [changeEmail, setEmailChange] = useState({
    email: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setEmailError("");
      setInformationAboutSentEmail(
        "A password reset code has been sent to your email"
      );
    },
    onError: (error) => {
      setEmailError(error);
    },
  });

  const handleChangeEmail = (event) => {
    setEmailChange(() => ({
      email: event.target.value,
    }));
    setEmailError("");
  };

  const handleSubmit = () => {
    mutate(changeEmail);
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div
        className={`sm:bg-thirdColor w-full md:w-3/4 lg:w-1/2 min-h-60 rounded-3xl flex flex-col items-center pb-8`}
      >
        <h1 className="text-white text-4xl text-center py-8">
          Forgot password
        </h1>
        <div className="w-3/4 mx-auto">
          {!informationAboutSentEmail && !isPending && (
            <Input
              icon={faEnvelope}
              placeholder="Enter your email"
              type="text"
              inputId="email"
              value={changeEmail.email}
              onChange={handleChangeEmail}
            />
          )}
          {!informationAboutSentEmail && isPending && (
            <p className="text-yellow-500 text-xl text-center mt-8">Loading...</p>
          )}
          {informationAboutSentEmail && !isPending && (
            <p className="text-secondColor text-xl text-center mt-8">
              {informationAboutSentEmail}
            </p>
          )}
          {emailError && (
            <p className="h-4 text-red-500 mb-4 text-center">
              {emailError.error || emailError}
            </p>
          )}
        </div>
        {!informationAboutSentEmail && !isPending ? (
          <div className="flex items-center gap-20">
            <Link
              to={"/login"}
              className="text-neutral-400 mt-4 border-b-2 border-neutral-400 transition-all duration-300 hover:text-white hover:border-white"
            >
              Go back
            </Link>
            <button
              onClick={handleSubmit}
              className="text-white w-28 h-12 bg-secondColor font-semibold rounded-full mt-4 transition-all duration-300 hover:bg-[#28bf8a]"
            >
              Submit
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
