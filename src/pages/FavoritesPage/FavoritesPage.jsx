import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Loader from "../../components/Loader/Loader.jsx";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";
import { Container } from "../../components/Container/Container.jsx";

import css from "./FavoritesPage.module.css";
import {
  selectError,
  selectLoading,
  selectTeachersAll,
} from "../../redux/favorite/selector.js";
import { fetchTeachersAll } from "../../redux/favorite/operation.js";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const teachersAll = useSelector(selectTeachersAll);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const likes = useSelector((state) => state.user.likes);

  useEffect(() => {
    dispatch(fetchTeachersAll());
  }, [dispatch]);

  const savedTeachers = teachersAll.filter((teacher) =>
    likes.includes(teacher.id)
  );

  return (
    <>
      {loading && <Loader />}
      {error && <div>Error: {error}</div>}
      <Container>
        <ul className={css.list}>
          {savedTeachers.length !== 0 ? (
            savedTeachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherCard teacher={teacher} />
              </li>
            ))
          ) : (
            <p className={css.text}>You have no favorite teachers.</p>
          )}
        </ul>
      </Container>
    </>
  );
};

export default FavoritesPage;
