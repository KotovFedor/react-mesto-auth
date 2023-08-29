import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsINputValid] = useState({});

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });

    setErrors((prevErrors) => {
      return { ...prevErrors, [name]: validationMessage };
    });

    setIsINputValid((prevIsINputValid) => {
      return { ...prevIsINputValid, [name]: valid };
    });

    setIsValid(form.checkValidity());
  }

  function reset(data = {}) {
    setValues(data);
    setErrors({});
    setIsValid(false);
    setIsINputValid({});
  }

  const setValue = useCallback((name, value) => {
    setValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  }, []);

  return {
    values,
    errors,
    isValid,
    isInputValid,
    handleChange,
    reset,
    setValue,
  };
}
