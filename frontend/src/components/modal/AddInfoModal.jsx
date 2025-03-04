import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import Modal from "./Modal";

const AddInfoModal = ({ name, version }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };
  return (
    <Modal open={version === "info"}>
      <div className="w-full h-60 flex flex-col justify-center items-center gap-8 text-white rounded-3xl border-2 border-white">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-[50px] text-secondColor"
        />
        <p className="text-lg px-2">
          Your {name === "incomes" ? "income" : "expense"} has been updated
          successfully
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

export default AddInfoModal;
