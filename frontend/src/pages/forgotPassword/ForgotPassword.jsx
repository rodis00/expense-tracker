import React, { useState } from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../http/auth";
import ResetForgottenPassword from "../../components/resetForgottenPassword/ResetForgottenPassword";

const ForgotPassword = () => {
  const [emailError, setEmailError] = useState("");
  const [informationAboutSentEmail, setInformationAboutSentEmail] =
    useState("");
  const [changeEmail, setChangeEmail] = useState({
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
    setChangeEmail(() => ({
      email: event.target.value,
    }));
    setEmailError("");
  };

  const handleSubmit = () => {
    mutate(changeEmail);
  };

  return (
    <ResetForgottenPassword
      displayInformation={informationAboutSentEmail}
      isPending={isPending}
      handleChange={handleChangeEmail}
      placeholder={"Enter your email"}
      type={"text"}
      inputId={"email"}
      title={"Forgot password"}
      icon={faEnvelope}
      value={changeEmail.email}
      error={emailError.error}
      handleSubmit={handleSubmit}
    />
  );
};

export default ForgotPassword;
