import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modal-slice";

function Modal({ children, open, className = "" }) {
  const dialog = useRef();

  const dispatch = useDispatch()

  function handleCloseModal(){
    dispatch(modalActions.closeModal())
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
      className={`${classes.modal} ${className}`}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
