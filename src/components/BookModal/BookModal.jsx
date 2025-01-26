import { useSelector } from "react-redux";
import Modal from "../Modal/Modal.jsx";
// import css from "./BookModal.module.css";

const BookModal = ({ teacher, onCloseModal }) => {
  const isOpenModal = useSelector((state) => state.modal.isOpen);

  return (
    <>
      {isOpenModal && teacher && (
        <Modal
          onCloseModal={onCloseModal}
          top={80}
          transform="translateX(-50%)"
          width={566}
        >
          {teacher.name}
          <img src={teacher.avatar_url} alt={`Photo teacher ${teacher.name}`} />
        </Modal>
      )}
    </>
  );
};

export default BookModal;
