import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "@react-hook/media-query";
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
  descriptionIcon,
  displayDescription,
  isDisplayedDescription,
}) => {
  const isLargeScreen = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      {isEditting ? (
        <div
          className={`text-white flex justify-center gap-8 ${
            isLargeScreen ? "relative mt-4" : "absolute mt-0"
          } bottom-4`}
        >
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={displayDescription}
              className="rounded-full w-16 h-16 flex items-center justify-center gap-4 text-2xl border-2 border-secondColor text-secondColor shadow-lg shadow-neutral-600 "
            >
              <FontAwesomeIcon icon={descriptionIcon} />
            </button>
            <span className="mt-2 w-20 text-center">
              {isDisplayedDescription ? "Hide" : "Show"}<p>description</p>
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-full w-16 h-16 flex items-center justify-center gap-4 text-2xl border-2 border-yellow-500 text-yellow-500 shadow-lg shadow-neutral-600 "
            >
              <FontAwesomeIcon icon={saveIcon} />
            </button>
            <span className="mt-2 w-20 text-center">{isPending ? "Saving..." : "Save"}</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={closeEdditingWithoutSave}
              className="rounded-full w-16 h-16 flex items-center justify-center gap-4 text-2xl border-2 border-red-500 text-red-500 shadow-lg shadow-neutral-600 "
            >
              <FontAwesomeIcon icon={closeIcon} />
            </button>
            <span className="mt-2 w-20 text-center">Cancel</span>
          </div>
        </div>
      ) : (
        <div
          className={`text-white flex justify-center gap-8 ${
            isLargeScreen ? "relative mt-4" : "absolute mt-0"
          } bottom-4`}
        >
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={displayDescription}
              className="rounded-full w-16 h-16 flex items-center justify-center gap-4 text-2xl border-2 border-secondColor text-secondColor shadow-lg shadow-neutral-600 "
            >
              <FontAwesomeIcon icon={descriptionIcon} />
            </button>
            <span className="mt-2 text-center w-20">
              {isDisplayedDescription ? "Hide" : "Show"} <p>description</p>
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={startEditting}
              className="rounded-full w-16 h-16 flex items-center justify-center gap-4 text-2xl border-2 border-yellow-500 text-yellow-500 shadow-lg shadow-neutral-600 "
            >
              <FontAwesomeIcon icon={editIcon} />
            </button>
            <span className="mt-2 w-20 text-center">Edit</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={handleDeleteModal}
              className="rounded-full w-16 h-16 flex items-center justify-center gap-4 text-2xl border-2 border-red-500 text-red-500 shadow-lg shadow-neutral-600 "
            >
              <FontAwesomeIcon icon={deleteIcon} />
            </button>
            <span className="mt-2 w-20 text-center">Delete</span>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionActions;
