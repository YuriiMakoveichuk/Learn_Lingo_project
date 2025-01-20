import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../redux/auth/slice.js";
import { closeModal } from "../../redux/modal.js";

import sprite from "../../assets/img/sprite.svg";

import css from "./LoginForm.module.css";

const validateSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must contain '@' and '.'")
    .required("Email is required"),
  password: yup
    .string()
    .min(
      6,
      "Password must be at least 6 characters, with at least 2 of them being uppercase letters"
    )
    .matches(
      /(?=.*[A-Z].*[A-Z])/,
      "Password must contain at least 2 uppercase letters"
    )
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validateSchema),
  });

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleLogin = async ({ email, password }) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
    dispatch(closeModal());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} autoComplete="off" noValidate>
      <div className={css.box}>
        <label htmlFor="email">
          <input
            id="email"
            className={css.input}
            {...register("email")}
            placeholder="Email"
          />
        </label>
        {errors.email && <p className={css.error}>{errors.email.message}</p>}

        <label className={css.boxBtn} htmlFor="password">
          <input
            id="password"
            className={css.input}
            type={isPasswordVisible ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={css.btnSvg}
          >
            {isPasswordVisible ? (
              <svg className={css.svg} width={20} height={20}>
                <use href={`${sprite}#icon-eye`}></use>
              </svg>
            ) : (
              <svg className={css.svg} width={20} height={20}>
                <use href={`${sprite}#icon-eye-off`}></use>
              </svg>
            )}
          </button>
        </label>

        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>
      <button className={css.btn} type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
