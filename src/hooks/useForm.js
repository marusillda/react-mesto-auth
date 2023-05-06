import { useState } from "react";

export default function useForm(initialState) {
  const [form, setForm] = useState(initialState);

  const handleChange = (evt) => {
    const input = evt.target;

    setForm({
      ...form,
      [input.name]: input.value,
    })
  };
  return { form, handleChange };
}
