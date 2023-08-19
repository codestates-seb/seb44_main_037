import * as S from "./ProductRegister.style";
import { FailureReason, Form } from "form";
import { DESCRIPTION_GUIDE, TITLE_GUIDE } from "../../constants/info";
import RegisterInput from "../common/RegisterInput";
import RegisterTextarea from "../common/RegisterTextarea";

type DetailInfoSectionProps = {
  validateForm: () => boolean;
  form: Form;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  failureReason: FailureReason;
};

export default function DetailInfoSection({
  validateForm,
  form,
  onChange,
  failureReason,
}: DetailInfoSectionProps) {
  return (
    <S.StepBox>
      <h2>Step 3. 세부 정보 작성하기</h2>
      <RegisterInput
        form={form}
        label={"제목"}
        name={"title"}
        onChange={onChange}
        onBlur={validateForm}
        message={failureReason["title"]}
        description={TITLE_GUIDE}
      />
      <RegisterTextarea
        form={form}
        label={"상품 설명"}
        name={"description"}
        onChange={onChange}
        onBlur={validateForm}
        message={failureReason["description"]}
        description={DESCRIPTION_GUIDE}
      />
    </S.StepBox>
  );
}
