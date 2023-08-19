import { FailureReason, Form } from "form";
import * as S from "./ProductRegister.style";
import { deadlineList, typeRegisterist } from "../../constants/products";
import { PRICE_GUIDE } from "../../constants/info";

import DropDown from "../common/DropDown";
import InfoText from "../common/InfoText";
import RegisterInput from "../common/RegisterInput";

type PriceSectionProps = {
  validateForm: () => boolean;
  form: Form;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  failureReason: FailureReason;
  deadline: string;
  setDeadline: React.Dispatch<React.SetStateAction<string>>;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
};

export default function PriceSection({
  validateForm,
  form,
  onChange,
  failureReason,
  deadline,
  setDeadline,
  selectedType,
  setSelectedType,
}: PriceSectionProps) {
  const isGeneralType = selectedType === typeRegisterist[0];
  const isAuctionType = selectedType === typeRegisterist[1];

  const auctionOptionList = [
    { ko: "즉시 낙찰가", en: "instantBidPrice" },
    { ko: "시작 금액", en: "startPrice" },
    { ko: "입찰 단위", en: "bidUnit" },
  ];

  return (
    <S.StepBox>
      <h2>Step 4. 판매유형 및 가격 설정하기</h2>
      <S.DropDownWrapper>
        <DropDown
          optionList={typeRegisterist}
          state={selectedType}
          setState={setSelectedType}
        />
      </S.DropDownWrapper>
      {isGeneralType && (
        <RegisterInput
          form={form}
          label={"가격"}
          name={"price"}
          onChange={onChange}
          onBlur={validateForm}
          message={failureReason["price"]}
          size="15rem"
          isPrice={true}
        />
      )}
      {isAuctionType && (
        <>
          <InfoText text={PRICE_GUIDE} />
          {auctionOptionList.map(option => (
            <RegisterInput
              form={form}
              label={option.ko}
              name={option.en}
              onChange={onChange}
              onBlur={validateForm}
              message={failureReason[option.en]}
              size="15rem"
              isPrice={true}
            />
          ))}
          <S.DropDownWrapper>
            <DropDown
              optionList={deadlineList}
              state={deadline}
              setState={setDeadline}
            />
          </S.DropDownWrapper>
        </>
      )}
    </S.StepBox>
  );
}
