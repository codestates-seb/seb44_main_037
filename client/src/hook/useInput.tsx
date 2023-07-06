import { useState } from "react";

function useInput(initialForm: object) {
  const [form, setForm] = useState<any>(initialForm);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const reset = () => {
    setForm(initialForm);
  };

  return [form, onChange, reset, setForm];
}

export default useInput;
