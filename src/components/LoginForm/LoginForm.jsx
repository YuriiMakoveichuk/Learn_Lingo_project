import css from "./LoginForm.module.css";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useState } from "react";

import sprite from "../../assets/img/sprite.svg";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modal.js";

const validateSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
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

  const onSubmit = (data) => {
    console.log(data);
    dispatch(closeModal());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <div className={css.box}>
        <label htmlFor="email">
          <input
            id="email"
            className={css.input}
            {...register("email")}
            placeholder="Email"
          />
        </label>
        {errors.email && <p>{errors.email.message}</p>}

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

        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button className={css.btn} type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
