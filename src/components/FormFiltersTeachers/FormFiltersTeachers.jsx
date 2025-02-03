import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Container } from "../Container/Container.jsx";
import Select from "../Select/Select.jsx";
import css from "./FormFiltersTeachers.module.css";
import { getFilteredTeachers } from "../../firebase/firebaseConfig.js";

const FormFiltersTeachers = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const [selectedOptions, setSelectedOptions] = useState({
    languages: "French",
    price_per_hour: "10",
    levels: "A1 Beginner",
  });

  useEffect(() => {
    setSelectedOptions({
      languages: "French",
      price_per_hour: "10",
      levels: "A1 Beginner",
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSelectedOptions((prevSelectedOptions) => {
      const newOptions = {
        ...prevSelectedOptions,
        [name]: value,
      };
      return newOptions;
    });
  };

  const onSubmit = async (data) => {
    const filters = {
      price_range: data.price_per_hour,
      languages: data.languages,
      levels: data.levels,
    };
    try {
      const filteredTeachers = await getFilteredTeachers(filters);
      console.log(filteredTeachers);
    } catch (error) {
      console.error("Error fetching filtered teachers:", error);
    }
  };

  const languagesOptions = [
    { value: "French", label: "French" },
    { value: "English", label: "English" },
    { value: "German", label: "German" },
    { value: "Ukrainian", label: "Ukrainian" },
    { value: "Polish", label: "Polish" },
  ];

  const levelsOptions = [
    { value: "A1 Beginner", label: "A1 Beginner" },
    { value: "A2 Elementary", label: "A2 Elementary" },
    { value: "B1 Intermediate", label: "B1 Intermediate" },
    { value: "B2 Upper-Intermediate", label: "B2 Upper-Intermediate" },
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
