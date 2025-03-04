import React from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TransactionUpdateInfoModal = ({ version, icon, name, closeModal }) => {
  return (
    <Modal open={version === "updateInfo"}>
      <div className="w-full h-60 flex flex-col justify-center items-center gap-8 text-white rounded-3xl border-2 border-white">
        <FontAwesomeIcon icon={icon} className="text-[50px] text-secondColor" />
        <p className="text-lg px-2">
          Your {name === "incomes" ? "income" : "expense"} has been updated
          successfully
        </p>
        <button
          className="bg-secondColor w-28 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default TransactionUpdateInfoModal;
