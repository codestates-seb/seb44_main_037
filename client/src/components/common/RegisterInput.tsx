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
  margin: 2px 0;
  border: 1px solid #dadada;
  border-radius: 6px;
  font-size: 0.9rem;
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
  isPrice?: boolean;
};

const UnitInfo = styled.div`
  position: absolute;
  left: 13rem;
  color: var(--dark-gray);
  font-size: 0.9rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* width: 100%; */
`;

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
  isPrice,
}: RegisterInputProps) {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <InputContainer>
        <InputWrapper>
          {isPrice && <UnitInfo>원</UnitInfo>}
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
        </InputWrapper>
        <Description>{description}</Description>
        <Message>{message}</Message>
      </InputContainer>
    </Wrapper>
  );
}

export default RegisterInput;
