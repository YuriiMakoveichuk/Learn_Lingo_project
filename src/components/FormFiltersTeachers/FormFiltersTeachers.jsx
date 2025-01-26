import { Container } from "../Container/Container.jsx";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import Select from "../Select/Select.jsx";

import css from "./FormFiltersTeachers.module.css";

const FormFiltersTeachers = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = (data) => console.log(data);

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

  const languagesOptions = [
    { value: "French", label: "French" },
    { value: "English", label: "English" },
    { value: "German", label: "German" },
    { value: "Ukrainian", label: "Ukrainian" },
    { value: "Polish", label: "Polish" },
  ];

  const levelsOptions = [
    { value: "A1", label: "A1 Beginner" },
    { value: "A2", label: "A2 Elementary" },
    { value: "B1", label: "B1 Intermediate" },
    { value: "B2", label: "B2 Upper-Intermediate" },
  ];

  const priceOptions = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
    { value: "40", label: "40" },
  ];

  return (
    <Container>
      <FormProvider {...methods}>
        <form className={css.boxForm} onSubmit={handleSubmit(onSubmit)}>
          <Select
            name="languages"
            label="Languages"
            options={languagesOptions}
            selectedValue={selectedOptions.languages}
            onChange={handleChange}
            classStyle={css.selectLanguages}
          />
          <Select
            name="levels"
            label="Level of knowledge"
            options={levelsOptions}
            selectedValue={selectedOptions.levels}
            onChange={handleChange}
            classStyle={css.selectLevels}
          />
          <Select
            name="price_per_hour"
            label="Price"
            options={priceOptions}
            selectedValue={selectedOptions.price_per_hour}
            onChange={handleChange}
            classStyle={css.selectPrice}
          />
          <div className={css.boxBtn}>
            <button className={css.btnForm} type="submit">
              Search
            </button>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default FormFiltersTeachers;
