import React, { useState } from "react";
import ResetForgottenPassword from "../../components/resetForgottenPassword/ResetForgottenPassword";
import { useMutation } from "@tanstack/react-query";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../../http/auth";

const ResetPassword = () => {
  const location = useLocation();
  const pathParts = location.search.split("=");
  const resetPasswordToken = pathParts[1];
  const [passwordError, setPasswordError] = useState("");
  const [informationAboutChangePassword, setInformationAboutChangePassword] =
    useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [changePassword, setChangePassword] = useState({
    resetToken: resetPasswordToken,
    newPassword: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setPasswordError("");
      setInformationAboutChangePassword(
        "Password has been updated successfully"
      );
    },
    onError: (error) => {
      setPasswordError(error);
    },
  });

  const handleChangePassword = (event) => {
    setChangePassword((prev) => ({
      ...prev,
      newPassword: event.target.value,
    }));
    setPasswordError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(changePassword);
  };

  function handleShowPassword() {
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  }

  return (
    <ResetForgottenPassword
      isPassword={true}
      displayInformation={informationAboutChangePassword}
      handleShowPassword={handleShowPassword}
      isPending={isPending}
      handleChange={handleChangePassword}
      placeholder={"Enter your new password"}
      type={typePassword}
      inputId={"password"}
      title={"Set your new password"}
      icon={faLock}
      value={changePassword.newPassword}
      error={passwordError.token || passwordError.newPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default ResetPassword;
