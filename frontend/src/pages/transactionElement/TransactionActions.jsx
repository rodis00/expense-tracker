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
        <div className="text-white flex justify-center gap-8 mt-4 mr-4 mb-8">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-full w-16 h-16 flex items-center justify-center gap-4 text-2xl border-2 border-yellow-500 text-yellow-500 shadow-lg shadow-neutral-600 "
            >
              <FontAwesomeIcon icon={saveIcon} />
            </button>
            <span className="mt-2">{isPending ? "Saving..." : "Save"}</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={closeEdditingWithoutSave}
              className="rounded-full w-16 h-16 flex items-center justify-center gap-4 text-2xl border-2 border-red-500 text-red-500 shadow-lg shadow-neutral-600 "
            >
              <FontAwesomeIcon icon={closeIcon} />
            </button>
            <span className="mt-2">Cancel</span>
          </div>
        </div>
      ) : (
        <div className="text-white flex justify-center gap-8 mt-4 mr-4 mb-8">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={startEditting}
              className="rounded-full w-16 h-16 flex items-center justify-center gap-4 text-2xl border-2 border-yellow-500 text-yellow-500 shadow-lg shadow-neutral-600 "
            >
              <FontAwesomeIcon icon={editIcon} />
            </button>
            <span className="mt-2">Edit</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={handleDeleteModal}
              className="rounded-full w-16 h-16 flex items-center justify-center gap-4 text-2xl border-2 border-red-500 text-red-500 shadow-lg shadow-neutral-600 "
            >
              <FontAwesomeIcon icon={deleteIcon} />
            </button>
            <span className="mt-2">Delete</span>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionActions;
