import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import css from "./Select.module.css";

const Select = ({
  name,
  label,
  options,
  selectedValue,
  onChange,
  classStyle,
}) => {
  const { register } = useFormContext();

  return (
    <div className={css.boxSelect}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        className={clsx(css.select, classStyle)}
        {...register(name, { required: true })}
        onChange={onChange}
        value={selectedValue}
      >
        {options.map((option) => (
          <option
            key={option.value}
            className={clsx(
              css.option,
              selectedValue === option.value && css.selectedOption
            )}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
