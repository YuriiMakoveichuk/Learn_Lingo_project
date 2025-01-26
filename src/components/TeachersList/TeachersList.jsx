import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTeachers } from "../../redux/teachers/operations.js";
import { Container } from "../Container/Container.jsx";
import Loader from "../Loader/Loader.jsx";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import {
  selectError,
  selectLastVisible,
  selectLoading,
  selectTeachers,
} from "../../redux/teachers/selectors.js";

import css from "./TeachersList.module.css";

const PAGE_SIZE = 4;

const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const lastVisible = useSelector(selectLastVisible);

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (teachers.length === 0) {
      dispatch(fetchTeachers({ startAfter: 0, limit: PAGE_SIZE })).unwrap();
    }
  }, [dispatch, teachers]);

  const loadMore = () => {
    dispatch(fetchTeachers({ startAfter: lastVisible, limit: PAGE_SIZE }))
      .unwrap()
      .then((response) => {
        if (response.teachers.length < PAGE_SIZE) {
          setHasMore(false);
        }
      });
  };

  return (
    <>
      {loading && <Loader />}
      {error && <div>Error: {error}</div>}
      <Container>
        <ul className={css.list}>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard teacher={teacher} />
            </li>
          ))}
        </ul>
        {hasMore && (
          <div className={css.boxBtn}>
            <button className={css.btn} onClick={loadMore}>
              Load more
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default TeachersList;
