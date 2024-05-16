import React from "react";
import Date from "../Date/Date";
import classes from "./ItemData.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal-slice";

function ItemData({
  title,
  amount,
  date,
  secondName,
  onShowModal,
  onDelete,
  selectedItem,
}) {
  const dispatch = useDispatch();
  const version = useSelector((state) => state.modal.modalVersion);

  function handleCloseModal() {
    dispatch(modalActions.closeModal());
  }

  return (
    <>
      <Modal open={version === "delete"}>
        <p className={classes.modal__p}>
          Are you sure you want to remove this {secondName}:{" "}
          <span className={classes.modal__selectedItem}>{selectedItem && selectedItem.title}</span> ?
        </p>
        <div className={classes.modal__div}>
          <button
            className={classes.modal__closeBtn}
            onClick={handleCloseModal}
          >
            No
          </button>
          <button
            className={classes.modal__deleteBtn}
            onClick={() => onDelete(selectedItem.id)}
          >
            Yes
          </button>
        </div>
      </Modal>
      <li className={classes.listItem}>
        <Date date={date} />
        <h2 className={classes.listItem__title}>{title}</h2>
        <div className={classes.listItem__price}>
          <FontAwesomeIcon icon={faDollarSign} />
          <span>{amount}</span>
        </div>
        <button className={classes.listItem__btn} onClick={onShowModal}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
    </>
  );
}

export default ItemData;
