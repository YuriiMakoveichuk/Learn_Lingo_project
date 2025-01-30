import FormFiltersTeachers from "../../components/FormFiltersTeachers/FormFiltersTeachers.jsx";
import TeachersList from "../../components/TeachersList/TeachersList.jsx";

import css from "./TeachersPage.module.css";

const TeachersPage = () => {
  return (
    <div className={css.box}>
      <FormFiltersTeachers />
      <TeachersList />
    </div>
  );
};

export default TeachersPage;
