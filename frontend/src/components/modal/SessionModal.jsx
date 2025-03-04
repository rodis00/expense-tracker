import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SessionModal = () => {
  const version = useSelector((state) => state.modal.modalVersion);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };
  return (
    <Modal open={version === "sessionExpired"}>
      <div className="w-full h-60 flex flex-col justify-center items-center gap-8 text-white rounded-3xl border-2 border-white">
        <FontAwesomeIcon
          icon={faHourglassEnd}
          className="text-[50px] text-red-500"
        />
        <p className="text-lg px-2">
          Your session has expired! Please login again.
        </p>
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

export default SessionModal;
