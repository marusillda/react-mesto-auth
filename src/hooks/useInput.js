import { useState } from 'react';
import useValidation from './useValidation';

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);


  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onFocus = (e) => {
    setIsDirty(true);
  }

  return {
    value,
    isDirty,
    onChange,
    onFocus,
    ...valid
  }
}

export default useInput;
