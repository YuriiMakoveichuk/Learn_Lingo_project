import clsx from "clsx";
import sprite from "../../assets/img/sprite.svg";

import { useState } from "react";

import css from "./TeacherCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
  selectIsOpenModal,
  selectModalType,
} from "../../redux/modal.js";
import BookModal from "../BookModal/BookModal.jsx";

const TeacherCard = ({ teacher }) => {
  const dispatch = useDispatch();

  const isOpenModal = useSelector(selectIsOpenModal);
  const modalType = useSelector(selectModalType);

  const [readLoad, setReadLoad] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleReadMoreClick = () => {
    setReadLoad(!readLoad);
  };

  const isOpenModalBook = () => {
    setSelectedTeacher(teacher);
    dispatch(openModal("book"));
  };

  const onCloseModal = () => {
    setSelectedTeacher(null);
    dispatch(closeModal("book"));
  };

  return (
    <>
      <div className={clsx(css.boxTeacher, readLoad ? "css.readLoad" : "")}>
        <div className={css.boxImg}>
          <img
            className={css.img}
            src={teacher.avatar_url}
            alt="Photo teacher"
            width={96}
            height={96}
          />
        </div>
        <div className={css.boxTeacherInfo}>
          <div className={css.boxInfo}>
            <div className={css.boxName}>
              <p>Languages</p>
              <h3 className={css.title}>
                {teacher.name}&nbsp;
                {teacher.surname}
              </h3>
            </div>
            <div className={css.boxListInfo}>
              <ul className={css.listInfo}>
                <li className={clsx(css.item, css.itemSvg)}>
                  <svg className={css.svg} width={16} height={16}>
                    <use href={`${sprite}#icon-book-open`}></use>
                  </svg>
                  <p className={css.textInfo}>Lessons online</p>
                </li>
                <span className={css.line}></span>
                <li className={css.item}>
                  <p className={css.textInfo}>
                    Lessons done:&nbsp;{teacher.lessons_done}
                  </p>
                </li>
                <span className={css.line}></span>
                <li className={clsx(css.item, css.itemSvg)}>
                  <svg className={css.svg} width={16} height={16}>
                    <use href={`${sprite}#icon-star`}></use>
                  </svg>
                  <p className={css.textInfo}>Rating:&nbsp;{teacher.rating}</p>
                </li>
                <span className={css.line}></span>
                <li className={css.item}>
                  <p className={css.textInfo}>
                    Price / 1 hour:&nbsp;
                    <span className={css.spanPrice}>
                      {teacher.price_per_hour}$
                    </span>
                  </p>
                </li>
              </ul>
              <svg className={css.svg} width={26} height={26}>
                <use href={`${sprite}#icon-heart`}></use>
              </svg>
            </div>
          </div>
          <ul className={css.listSpeak}>
            <li>
              Speaks:&nbsp;
              <span className={clsx(css.spanSpeak, css.spanLine)}>
                {teacher.languages.join(", ")}
              </span>
            </li>
            <li>
              Lesson Info:&nbsp;
              <span className={css.spanSpeak}>{teacher.lesson_info}</span>
            </li>
            <li>
              Conditions:&nbsp;
              <span className={css.spanSpeak}>
                {teacher.conditions.join(" ")}
              </span>
            </li>
          </ul>
          {!readLoad ? (
            <>
              <button
                className={css.btnInfo}
                type="button"
                onClick={handleReadMoreClick}
              >
                Read more
              </button>
              <ul className={css.listLevel}>
                {teacher.levels.map((level, index) => (
                  <li className={css.itemLevel} key={index}>
                    {level}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className={css.readLoadText}>{teacher.experience}</p>
              <ul className={css.listReviewUser}>
                {teacher.reviews.map((review, index) => (
                  <li className={css.itemReviewUser} key={index}>
                    <div className={css.boxReviewAvatar}>
                      <div className={css.boxReviewUser}>
                        {review.reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4>{review.reviewer_name}</h4>
                        <div className={css.boxReviewRating}>
                          <svg className={css.svg} width={16} height={16}>
                            <use href={`${sprite}#icon-star`}></use>
                          </svg>
                          <p>{review.reviewer_rating.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                    <p className={css.textReviewUser}>{review.comment}</p>
                  </li>
                ))}
              </ul>
              <ul className={css.listLevel}>
                {teacher.levels.map((level, index) => (
                  <li className={css.itemLevel} key={index}>
                    {level}
                  </li>
                ))}
              </ul>
              <button
                onClick={isOpenModalBook}
                className={css.readLoadBtn}
                type="button"
              >
                Book trial lesson
              </button>
            </>
          )}
        </div>
        {isOpenModal && modalType === "book" && (
          <BookModal teacher={selectedTeacher} onCloseModal={onCloseModal} />
        )}
      </div>
    </>
  );
};

export default TeacherCard;
