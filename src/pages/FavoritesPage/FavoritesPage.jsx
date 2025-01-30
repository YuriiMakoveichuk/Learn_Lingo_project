import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Container } from "../../components/Container/Container.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";

import {
  selectError,
  selectLoading,
  selectTeachers,
} from "../../redux/teachers/selectors.js";
import { fetchAllTeachers } from "../../redux/teachers/operations.js";

import css from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const likes = useSelector((state) => state.user.likes);

  useEffect(() => {
    dispatch(fetchAllTeachers());
  }, [dispatch]);

  const savedTeachers = teachers.filter((teacher) =>
    likes.includes(teacher.id)
  );

  return (
    <>
      {loading && <Loader />}
      {error && <div>Error: {error}</div>}
      <Container>
        <ul className={css.list}>
          {savedTeachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard teacher={teacher} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default FavoritesPage;
