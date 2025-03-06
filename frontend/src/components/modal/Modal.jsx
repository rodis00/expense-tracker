import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import "./Modal.css";

function Modal({ children, open, className='' }) {
  const dialog = useRef();

  const dispatch = useDispatch();
  const version = useSelector((state) => state.modal.modalVersion);

  function handleCloseModal() {
    dispatch(modalActions.closeModal());
  }

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      onClose={handleCloseModal}
      className={`w-full max-w-none mx-0 ${className} xsm:mx-auto xsm:w-[95%] md:w-3/4 lg:w-1/2 xlg:w-1/3 xsm:min-h-20 bg-fourthColor flex justify-center ${className?'':'rounded-3xl'} backdrop:bg-black/50 ${
        version !== "" && open ? "block" : "hidden"
      }`}
      id="modalAnimation"
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
