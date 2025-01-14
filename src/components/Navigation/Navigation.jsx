import { NavLink } from "react-router-dom";
import clsx from "clsx";

import logo from "../../assets/img/ukraine.svg";
// import sprite from "../../assets/img/sprite.svg";

import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.containerHeader}>
          <div className={css.logo}>
            <img className={css.imgLogo} src={logo} alt="logo" />
            <p className={css.logoText}>LearnLingo</p>
          </div>
          <nav className={css.nav}>
            <NavLink
              className={({ isActive }) =>
                clsx(css.link, isActive && css.active)
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                clsx(css.link, isActive && css.active)
              }
              to="/teachers"
            >
              Teachers
            </NavLink>
          </nav>
          <div className={css.boxBtn}>
            <button className={css.btnLogin} type="button">
              <svg className={css.svg} width={20} height={20}>
                <use href={`../../assets/img/sprite.svg#icon-log_in`}></use>
              </svg>
              <p>Log in</p>
            </button>
            <button className={css.btnRegister} type="button">
              Registration
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navigation;
