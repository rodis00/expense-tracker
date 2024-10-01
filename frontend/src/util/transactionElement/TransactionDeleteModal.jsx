import React from "react";
import Modal from "../../components/modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TransactionDeleteModal = ({
  version,
  icon,
  name,
  deletePending,
  handleDelete,
  closeModal,
}) => {
  return (
    <Modal open={version === "delete"}>
      <div className="w-full h-60 flex flex-col justify-center items-center gap-8 text-white rounded-3xl border-2 border-white">
        <FontAwesomeIcon icon={icon} className="text-[50px] text-red-500" />
        <p className="text-lg px-2">
          Are you sure you want to remove this{" "}
          {name === "incomes" ? "income" : "expense"} ?
        </p>
        {deletePending ? (
          <p>Deleting...</p>
        ) : (
          <div className="flex gap-8">
            <button
              className="bg-red-500 w-28 h-12 rounded-full transition-all duration-300 hover:bg-red-700"
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className="bg-secondColor w-28 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TransactionDeleteModal;
