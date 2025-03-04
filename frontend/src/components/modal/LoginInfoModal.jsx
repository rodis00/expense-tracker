import React from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const LoginInfoModal = ({ loginCounter, version }) => {
  const dispatch = useDispatch();

  const info = [
    "Hey you are already logged in :)",
    "Hey you are really logged in, go and check it out :)",
    "Dear user, why are you doing this? no need, you are already logged in",
    "Okay, you think this is funny, right? Leave it!",
    "Okay, I understand, you just want to test our patience...",
    "You won't make it, I'm telling the truth!",
    "LEAVE THIS DAMN BUTTON ALREADY!!!",
    "Okay, you're asking for it...",
  ];

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };
  return (
    <Modal open={version === "loginInfo"}>
      <div className="w-full h-60 flex flex-col justify-center items-center gap-8 text-white rounded-3xl border-2 border-white">
        <FontAwesomeIcon
          icon={faInfo}
          className="text-[50px] text-secondColor"
        />
        <p className="text-lg px-8">{info[loginCounter]}</p>
        <button
          className="bg-secondColor w-28 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default LoginInfoModal;
