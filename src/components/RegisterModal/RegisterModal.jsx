import css from "./RegisterModal.module.css";
import Modal from "../Modal/Modal.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modal.js";

const RegisterModal = () => {
  const dispatch = useDispatch();

  const isOpenModal = useSelector((state) => state.modal.isOpen);

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {isOpenModal && (
        <Modal onCloseModal={onCloseModal} width={566}>
          <h2 className={css.title}>Registration</h2>
          <p className={css.text}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information
          </p>
          <RegisterForm />
        </Modal>
      )}
    </>
  );
};

export default RegisterModal;
