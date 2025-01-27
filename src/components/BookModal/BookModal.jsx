import { useSelector } from "react-redux";
import Modal from "../Modal/Modal.jsx";
import css from "./BookModal.module.css";
import BookForm from "../BookForm/BookForm.jsx";

const BookModal = ({ teacher, onCloseModal }) => {
  const isOpenModal = useSelector((state) => state.modal.isOpen);

  return (
    <>
      {isOpenModal && teacher && (
        <Modal
          onCloseModal={onCloseModal}
          top={20}
          transform="translateX(-50%)"
          width={600}
        >
          <h2 className={css.titleBook}>Book trial lesson</h2>
          <p className={css.textBook}>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>
          <div className={css.boxTeacher}>
            <img
              className={css.imgTeacher}
              src={teacher.avatar_url}
              alt={`Photo teacher ${teacher.name}`}
              width={44}
              height={44}
            />
            <div className={css.boxNameTeacher}>
              <p className={css.textNameTeachers}>Your teacher</p>
              <h4 className={css.titleNameTeacher}>
                {teacher.name}&nbsp;{teacher.surname}
              </h4>
            </div>
          </div>
          <BookForm />
        </Modal>
      )}
    </>
  );
};

export default BookModal;
