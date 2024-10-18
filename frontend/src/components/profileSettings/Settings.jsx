import React, { useEffect, useState } from "react";
import Input from "../../util/Input";
import {
  faBan,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFloppyDisk,
  faLock,
  faPencil,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData, updateUserData } from "../../util/http/user";
import { useSelector } from "react-redux";

const Settings = () => {
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [isEditing, setIsEditing] = useState(false);
  const userId = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const queryClient = useQueryClient();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["user", { userId, token }],
    queryFn: () => getUserData({ userId, token }),
    enabled: !!userId,
  });

  const { mutate } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", { userId, token }]);
      setIsEditing(false);
    },
    onError: (error) => {
      setFormErrors(error);
    },
  });

  useEffect(() => {
    if (data) {
      setUserData((prev) => ({
        ...prev,
        username: data.username,
        email: data.email,
      }));
    }
  }, [data]);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <p>{error}</p>;
  }

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

  function handleChange(event) {
    const { name, value } = event.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setPasswordError("");
  }

  function handleConfirmPassword(event) {
    setConfirmPassword(event.target.value);
    setPasswordError("");
  }

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleCloseEditing = () => {
    setUserData((prev) => ({
      ...prev,
      username: data.username,
      email: data.email,
    }));
    setIsEditing(false);
  };

  const handleSubmit = () => {
    if (userData.password !== confirmPassword) {
      setPasswordError("Passwords are not the same!");
      return;
    }

    const values = {};

    Object.keys(userData).forEach((key) => {
      if (key !== "id") {
        if (userData[key] !== data[key]) {
          if (key === "password" && userData[key] !== "") {
            values[key] = userData[key];
          } else if (key !== "password") {
            values[key] = userData[key];
          }
        }
      }
    });
    console.log(values);
    if (Object.keys(values).length === 0) {
      setPasswordError(`You haven't changed any data`)
      return;
    }
    mutate({ userId, token, values });
  };

  return (
    <div className="bg-fourthColor w-1/3 flex flex-col items-center pb-20 rounded-3xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-3xl font-semibold my-8">Your Profile</h2>
      <div className="h-24 w-24 rounded-full bg-red-600 flex justify-center items-center text-5xl mb-20">
        A
      </div>
      <div className="w-4/5">
        <Input
          labelText="Username"
          icon={faUser}
          placeholder="Enter your new username"
          type="text"
          inputId="username"
          disabled={!isEditing}
          value={userData.username}
          onChange={handleChange}
        />
        {formErrors && <p className="text-red-500">{formErrors.username}</p>}
        <Input
          labelText="Email"
          icon={faEnvelope}
          placeholder="Enter your new email"
          type="text"
          inputId="email"
          disabled={!isEditing}
          value={userData.email}
          onChange={handleChange}
        />
        {formErrors && <p className="text-red-500">{formErrors.email}</p>}
        {isEditing && (
          <Input
            labelText="Password"
            icon={faLock}
            placeholder="Enter your new password"
            type={typePassword}
            inputId="password"
            value={userData.password}
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
        )}
        {formErrors && <p className="text-red-500">{formErrors.password}</p>}

        {isEditing && (
          <Input
            labelText="Confirm password"
            icon={faLock}
            placeholder="Confirm your new password"
            type={typeConfirmPassword}
            inputId="confirmPassword"
            value={confirmPassword}
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
        )}

        {passwordError && <p className="text-red-500">{passwordError}</p>}
      </div>
      {isEditing ? (
        <div className="flex gap-8 mt-8">
          <button
            className="w-28 h-12 flex items-center justify-center text-lg rounded-3xl font-semibold bg-red-500 transition-all duration-300 hover:bg-red-700"
            onClick={handleCloseEditing}
          >
            <FontAwesomeIcon icon={faBan} className="w-1/3" />
            <span className="w-1/2 mr-2">Cancel</span>
          </button>
          <button
            onClick={handleSubmit}
            className="w-28 h-12 flex items-center justify-center text-lg rounded-3xl font-semibold bg-secondColor transition-all duration-300 hover:bg-[#28bf8a]"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="w-1/3" />
            <span className="w-1/2 mr-2">Submit</span>
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <button
            className="w-28 h-12 flex items-center justify-center text-lg rounded-3xl font-semibold bg-yellow-700 transition-all duration-300 hover:bg-yellow-500"
            onClick={handleEditing}
          >
            <FontAwesomeIcon icon={faPencil} className="w-1/3" />
            <span className="w-1/2">Edit</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
