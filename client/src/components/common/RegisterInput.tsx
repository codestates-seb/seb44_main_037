import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
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

const InputElement = styled.input`
  width: ${props => props.size || "100%"};
  padding: 14px 15px;
  margin: 2px auto;
  border: 1px solid #dadada;
  border-radius: 6px;
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

type RegisterInputProps = {
  form: any;
  name: string;
  label: string;
  message?: string;
  onChange?: any;
  description?: string;
  placeholder?: string;
  onBlur?: () => void;
  size?: any;
  isReadOnly?: boolean;
};

function RegisterInput({
  form,
  name,
  label,
  message,
  description,
  placeholder,
  onChange,
  onBlur,
  size,
  isReadOnly,
}: RegisterInputProps) {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <InputContainer>
        <InputElement
          id={name}
          name={name}
          value={form[name]}
          onBlur={onBlur}
          onChange={onChange}
          type={name === "password" ? "password" : "text"}
          placeholder={placeholder}
          size={size}
          readOnly={isReadOnly}
        />
        <Description>{description}</Description>
        <Message>{message}</Message>
      </InputContainer>
    </Wrapper>
  );
}

export default RegisterInput;
