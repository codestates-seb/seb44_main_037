import styled from "styled-components";

const Wrapper = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  color: var(--dark-gray);
  border: none;
  border-radius: 0.3rem;
  background: var(--input-gray);
`;

type RegisterInputProps = {
  form: any;
  name: string;
  onChange?: any;
  placeholder?: string;
};

export default function GrayInput({
  form,
  onChange,
  name,
  placeholder,
}: RegisterInputProps) {
  return (
    <Wrapper
      name={name}
      value={form[name]}
      onChange={onChange}
      type="text"
      placeholder={placeholder || ""}
    />
  );
}
