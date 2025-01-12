import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <>
      <header className={css.header}>
        <div>
          <img src="" alt="" />
          <p></p>
        </div>
        <nav>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/teachers"
          >
            Teachers
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
