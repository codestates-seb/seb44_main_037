import * as S from "./RegisterTextarea.style";

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
    <S.Wrapper>
      <S.Label htmlFor={name}>{label}</S.Label>
      <S.InputContainer>
        <S.Textarea
          id={name}
          name={name}
          value={form[name]}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          rows={12}
        />
        <S.Description>{description}</S.Description>
        <S.Message>{message}</S.Message>
      </S.InputContainer>
    </S.Wrapper>
  );
}

export default RegisterTextarea;
