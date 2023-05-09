import { useState, useEffect } from 'react';

const useValidation = (value, validations) => {
  const [inputValid, setInputValid] = useState(false);
  const [inputErrors, setInputErrors] = useState([]);

  useEffect(() => {
    const emailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const rules = {
      minLength: {
        test: (value, validation) => value.length >= validations[validation],
        message: 'Некорректная длина.'
      },
      isEmpty: {
        test: (value) => value,
        message: 'Поле не может быть пустым.'
      },
      isEmail: {
        test: (value) => emailRegExp.test(String(value).toLowerCase()),
        message: 'Неверный email.'
      }
    };
    const errors = Object.keys(validations)
      .map(validation => {
        const rule = rules[validation];
        return rule.test(value, validation) ? '' : rule.message;
      })
      .filter(msg => msg);

    setInputErrors(errors);
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    setInputValid(inputErrors.length === 0);
  }, [inputErrors]);

  return {
    inputErrors,
    inputValid
  }
}

export default useValidation;
