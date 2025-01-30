import { useDispatch, useSelector } from "react-redux";

import LoginForm from "../LoginForm/LoginForm.jsx";
import Modal from "../Modal/Modal.jsx";

import { closeModal } from "../../redux/modal.js";

import css from "./LoginModal.module.css";

const LoginModal = () => {
  const dispatch = useDispatch();

  const isOpenModal = useSelector((state) => state.modal.isOpen);

  const onCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <>
      {isOpenModal && (
        <Modal onCloseModal={onCloseModal} width={566}>
          <h1 className={css.title}>Log In</h1>
          <p className={css.text}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for an teacher.
          </p>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
