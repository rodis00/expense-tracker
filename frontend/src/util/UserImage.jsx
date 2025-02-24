import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserImage = ({ className, image, userImage }) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  const bg = localStorage.getItem("bg");
  const username = token ? jwtDecode(token).sub : "";
  const [preview, setPreview] = useState(null);
  let ObjectURL;
  let imageURL;

  if (userImage && isAuthenticated) {
    imageURL = URL.createObjectURL(userImage);
  }

  useEffect(() => {
    if (image) {
      ObjectURL = URL.createObjectURL(image);
      setPreview(ObjectURL);
    }

    return () => URL.revokeObjectURL(ObjectURL);
  }, [image]);

  return (
    <>
      {!token && (
        <div className="flex justify-center">
          <div
            className={`flex items-center justify-center rounded-full font-bold text-white bg-secondColor ${className}`}
          >
            L
          </div>
        </div>
      )}

      {bg && !image && !userImage && (
        <div className="flex justify-center">
          <div
            className={`flex items-center justify-center rounded-full font-bold text-white ${
              bg ? "" : "bg-secondColor"
            } ${className}`}
            style={{
              backgroundColor: bg,
            }}
          >
            {username.charAt(0).toUpperCase()}
          </div>
        </div>
      )}

      {bg && !image && userImage && (
        <div className="flex justify-center">
          <div
            className={`flex items-center justify-center rounded-full font-bold ${className}`}
          >
            <img
              key={user}
              src={imageURL}
              className={`w-full h-full bg-main rounded-full object-cover`}
            />
          </div>
        </div>
      )}

      {bg && image && (userImage || !userImage) && (
        <div className="flex justify-center">
          <div
            className={`flex items-center justify-center rounded-full font-bold ${className}`}
          >
            <img
              src={preview}
              className={`w-full h-full bg-main rounded-full object-cover`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserImage;
