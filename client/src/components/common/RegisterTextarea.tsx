import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  line-height: 2.5rem;
  flex-basis: 15%;
  margin: 2px auto;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const InputContainer = styled.div`
  flex-basis: 85%;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 14px 15px;
  margin: 2px auto;
  border: 1px solid #dadada;
  border-radius: 6px;
  font-size: 0.9rem;
  resize: none;
`;

const Message = styled.p`
  margin: 2px auto;
  font-size: 0.7rem;
  color: var(--pink);
`;

const Description = styled.p`
  margin: 5px auto;
  font-size: 0.7rem;
  color: var(--dark-gray);
`;

type RegisterTextareaProps = {
  form: any;
  name: string;
  label: string;
  message?: string;
  onChange?: any;
  description?: string;
  placeholder?: string;
  onBlur?: () => void;
};

function RegisterTextarea({
  form,
  name,
  label,
  message,
  description,
  placeholder,
  onChange,
  onBlur,
}: RegisterTextareaProps) {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <InputContainer>
        <Textarea
          id={name}
          name={name}
          value={form[name]}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          rows={12}
        />
        <Description>{description}</Description>
        <Message>{message}</Message>
      </InputContainer>
    </Wrapper>
  );
}

export default RegisterTextarea;
