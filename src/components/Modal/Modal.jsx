import { useEffect } from "react";
import { createPortal } from "react-dom";

import sprite from "../../assets/img/sprite.svg";

import css from "./Modal.module.css";

export const Modal = ({ children, onCloseModal, top, transform, width }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  const modalStyle = {
    width: width || "200px",
    top: top || "50%",
    transform: transform || "translate(-50%,-50%)",
  };

  return createPortal(
    <div onClick={handleBackDropClick} className={css.backdrop}>
      <div className={css.modal} style={modalStyle}>
        <button type="button" className={css.btn} onClick={onCloseModal}>
          <svg className={css.svg} width={32} height={32}>
            <use href={`${sprite}#icon-x`}></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
