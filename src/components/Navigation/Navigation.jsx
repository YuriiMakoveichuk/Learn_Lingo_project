import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";

import {
  openModal,
  selectIsOpenModal,
  selectModalType,
} from "../../redux/modal.js";

import { useAuth } from "../../hooks/user.auth.js";

import { removeUser } from "../../redux/auth/slice.js";

import logo from "../../assets/img/ukraine.svg";
import sprite from "../../assets/img/sprite.svg";

import css from "./Navigation.module.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();
  const isOpenModal = useSelector(selectIsOpenModal);

  const modalType = useSelector(selectModalType);

  const isOpenModalRegister = () => {
    dispatch(openModal("register"));
  };

  const isOpenModalLogin = () => {
    dispatch(openModal("login"));
  };
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
            {isAuth && (
              <NavLink
                className={({ isActive }) =>
                  clsx(css.link, isActive && css.active)
                }
                to="/favorites"
              >
                Favorites
              </NavLink>
            )}
          </nav>
          <div className={css.boxBtn}>
            {isAuth ? (
              <>
                <p className={css.textEmail}>
                  Email&nbsp;:&nbsp;
                  <span className={css.textEmailSpan}>{email}</span>
                </p>
                <button
                  className={css.btnLogin}
                  type="button"
                  onClick={() => dispatch(removeUser())}
                >
                  <svg className={css.svg} width={20} height={20}>
                    <use href={`${sprite}#icon-log_out`}></use>
                  </svg>
                  <p>Logout</p>
                </button>
              </>
            ) : (
              <>
                <button
                  className={css.btnLogin}
                  type="button"
                  onClick={isOpenModalLogin}
                >
                  <svg className={css.svg} width={20} height={20}>
                    <use href={`${sprite}#icon-log_in`}></use>
                  </svg>
                  <p>Log in</p>
                </button>
                <button
                  className={css.btnRegister}
                  type="button"
                  onClick={isOpenModalRegister}
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      {isOpenModal && modalType === "register" && <RegisterModal />}

      {isOpenModal && modalType === "login" && <LoginModal />}
    </>
  );
};

export default Navigation;
