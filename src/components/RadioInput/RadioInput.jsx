import { useFormContext } from "react-hook-form";

import css from "./RadioInput.module.css";

const RadioInput = ({ options }) => {
  const { register } = useFormContext();
  return (
    <>
      {options.map((option) => (
        <div className={css.boxRadio} key={option.value}>
          <input {...register("radio")} type="radio" value={option.value} />
          <label className={css.labelRadio} htmlFor={option.value}>
            {option.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default RadioInput;
