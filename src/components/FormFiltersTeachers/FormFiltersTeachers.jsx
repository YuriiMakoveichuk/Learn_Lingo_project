import clsx from "clsx";
import { Container } from "../Container/Container.jsx";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import css from "./FormFiltersTeachers.module.css";

const FormFiltersTeachers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const [selectedOptions, setSelectedOptions] = useState({
    languages: "French",
    levels: "A1",
    price_per_hour: "10",
  });

  useEffect(() => {
    setSelectedOptions({
      languages: "French",
      levels: "A1",
      price_per_hour: "10",
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSelectedOptions((prevSelectedOptions) => {
      return {
        ...prevSelectedOptions,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Container>
        <form className={css.boxForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.boxSelect}>
            <label className={css.label} htmlFor="languages">
              Languages
            </label>
            <select
              name="languages"
              className={css.select}
              {...register("languages", { required: true })}
              onChange={handleChange}
            >
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.languages === "French",
                })}
                value="French"
              >
                French
              </option>
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.languages === "English",
                })}
                value="English"
              >
                English
              </option>
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.languages === "German",
                })}
                value="German"
              >
                German
              </option>
              <option
                className={clsx(css.option, {
                  [css.selectedOption]:
                    selectedOptions.languages === "Ukrainian",
                })}
                value="Ukrainian"
              >
                Ukrainian
              </option>
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.languages === "Polish",
                })}
                value="Polish"
              >
                Polish
              </option>
            </select>
          </div>
          <div className={css.boxSelect}>
            <label className={css.label} htmlFor="levels">
              Level of knowledge
            </label>
            <select
              name="levels"
              className={css.select}
              {...register("levels", { required: true })}
              onChange={handleChange}
            >
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.levels === "A1",
                })}
                value="A1"
              >
                A1 Beginner
              </option>
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.levels === "A2",
                })}
                value="A2"
              >
                A2 Elementary
              </option>
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.levels === "B1",
                })}
                value="B1"
              >
                B1 Intermediate
              </option>
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.levels === "B2",
                })}
                value="B2"
              >
                B2 Upper-Intermediate
              </option>
            </select>
          </div>
          <div className={css.boxSelect}>
            <label className={css.label} htmlFor="price_per_hour">
              Price
            </label>
            <select
              name="price_per_hour"
              className={css.select}
              {...register("price_per_hour", { required: true })}
              onChange={handleChange}
            >
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.price_per_hour === "10",
                })}
                value="10"
              >
                10
              </option>
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.price_per_hour === "20",
                })}
                value="20"
              >
                20
              </option>
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.price_per_hour === "30",
                })}
                value="30"
              >
                30
              </option>
              <option
                className={clsx(css.option, {
                  [css.selectedOption]: selectedOptions.price_per_hour === "40",
                })}
                value="40"
              >
                40
              </option>
            </select>
          </div>
          <div className={css.boxBtn}>
            <button className={css.btnForm} type="submit">
              Search
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default FormFiltersTeachers;
