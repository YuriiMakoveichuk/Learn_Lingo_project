import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchTeachers } from "../../redux/teachers/operations.js";
import { Container } from "../Container/Container.jsx";
import Loader from "../Loader/Loader.jsx";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import {
  selectError,
  selectFilters,
  selectLastVisible,
  selectLoading,
  selectTeachers,
  selectHasMore,
} from "../../redux/teachers/selectors.js";

import css from "./TeachersList.module.css";

const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const lastVisible = useSelector(selectLastVisible);
  const filters = useSelector(selectFilters);
  const hasMore = useSelector(selectHasMore);

  useEffect(() => {
    dispatch({ type: "teachers/setClear" });
    dispatch(fetchTeachers({ startAfter: 0, filters })).unwrap();
  }, [dispatch, filters]);

  const loadMore = () => {
    dispatch(fetchTeachers({ startAfter: lastVisible, filters })).unwrap();
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
