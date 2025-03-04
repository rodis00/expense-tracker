import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/form/Input";
import {
  faBan,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFloppyDisk,
  faLock,
  faPencil,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData, updateUserData } from "../../http/user";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import UserImage from "../../components/userImage/UserImage";
import FullScreenLoader from "../../components/fullScreenLoader/FullScreenLoader";
import useLoader from "../../hooks/useLoader";
import { getImage, uploadImage } from "../../http/image";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const userId = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["user", { userId, token }],
    queryFn: () => getUserData({ userId, token }),
    enabled: !!userId,
  });

  const { data: dataImage, isPending: imagePending } = useQuery({
    queryKey: ["image", token, userData.profilePicture],
    queryFn: () => getImage(userData.profilePicture, token),
    enabled: !!userData.profilePicture && !!userId,
  });

  const { mutate } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", { userId, token }]);
      setIsEditing(false);
      setConfirmPassword("");
      setFormErrors("");
      setUserData((prev) => ({
        ...prev,
        password: "",
      }));
      if (userId === null) {
        navigate("/login");
      }
      dispatch(modalActions.showUserUpdateInfo());
    },
    onError: (error) => {
      setFormErrors(error);
    },
  });

  const { mutate: imageMutate } = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      setIsEditing(false);
      dispatch(modalActions.showUserUpdateInfo());
      queryClient.invalidateQueries(["image", token, userData.profilePicture]);
      queryClient.invalidateQueries(["user", { userId, token }]);
      setImageError("");
    },
    onError: (error) => {
      setImageError(error);
    },
  });

  useEffect(() => {
    if (data) {
      setUserData((prev) => ({
        ...prev,
        username: data.username,
        email: data.email,
        profilePicture: data.profilePicture,
      }));
    }
  }, [data]);

  const pending = isPending || (userData.profilePicture ? imagePending : null);
  const isLoading = useLoader(pending);

  if (isLoading) {
    return <FullScreenLoader />;
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
      profilePicture: data.profilePicture,
    }));
    setIsEditing(false);
    setImage(null);
    setImageError(null);
    setPasswordError("");
    setFormErrors({});
  };

  const hnadleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (userData.password !== confirmPassword) {
      setPasswordError("Passwords are not the same!");
      return;
    }

    const values = {};
    const keysToCheck = ["username", "password"];

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

    if (Object.keys(values).length === 0 && !image) {
      setPasswordError(`You haven't changed any data`);
      return;
    }

    if (Object.keys(values).length !== 0) {
      mutate({ userId, token, values });
      if (Object.keys(values).some((key) => keysToCheck.includes(key))) {
        dispatch(authActions.logout());
        localStorage.removeItem("token");
        localStorage.removeItem("bg");
      }
    }

    if (image) {
      imageMutate({ userId, token, image });
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="sm:bg-fourthColor w-full h-full sm:h-3/5 sm:w-3/4 md:w-1/2 xlg:w-1/3 flex flex-col items-center pb-8 sm:rounded-3xl text-white">
          <h2 className="text-3xl font-semibold my-4">Your Profile</h2>
          <UserImage
            className="h-24 w-24 mb-4 text-5xl"
            image={image}
            userImage={dataImage}
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept="image/*"
            onChange={hnadleFileChange}
          />
          {isEditing && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-neutral-500 rounded-full w-10 h-10 mb-4"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
          {imageError && (
            <p className="text-red-500 text-center">{imageError.error}</p>
          )}
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
            {formErrors && (
              <p className="text-red-500">{formErrors.username}</p>
            )}
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
            {formErrors && (
              <p className="text-red-500">{formErrors.password}</p>
            )}

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
                    icon={
                      typeConfirmPassword === "password" ? faEyeSlash : faEye
                    }
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
      </div>
    </>
  );
};

export default Settings;
