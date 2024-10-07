import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TransactionActions = ({
  isEditting,
  handleSubmit,
  isPending,
  closeEdditingWithoutSave,
  startEditting,
  handleDeleteModal,
  saveIcon,
  deleteIcon,
  closeIcon,
  editIcon,
}) => {
  return (
    <>
      {isEditting ? (
        <div className="text-white flex justify-end gap-8 mt-4 mr-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-main rounded-xl w-28 h-12 flex items-center justify-center gap-4 text-lg text-yellow-500 "
          >
            <FontAwesomeIcon icon={saveIcon} />
            <span>{isPending ? "Saving..." : "Save"}</span>
          </button>
          <button
            type="button"
            onClick={closeEdditingWithoutSave}
            className="bg-main rounded-xl w-28 h-12 flex items-center justify-center gap-4 text-lg text-red-500 "
          >
            <FontAwesomeIcon icon={closeIcon} />
            <span>Cancel</span>
          </button>
        </div>
      ) : (
        <div className="text-white flex justify-end gap-8 mt-4 mr-4">
          <button
            type="button"
            onClick={startEditting}
            className="bg-main rounded-xl w-28 h-12 flex items-center justify-center gap-4 text-lg text-yellow-500 "
          >
            <FontAwesomeIcon icon={editIcon} />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={handleDeleteModal}
            className="bg-main rounded-xl w-28 h-12 flex items-center justify-center gap-4 text-lg text-red-500 "
          >
            <FontAwesomeIcon icon={deleteIcon} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </>
  );
};

export default TransactionActions;
