import { useState } from "react";
import * as S from "./ProductRegister.style";
import {
  categoryRegisterList,
  deadlineList,
  typeRegisterist,
} from "../../constants/products";
import validateProductRegister from "../../utils/validateProductRegister";
import useInput from "../../hook/useInput";
import changeTermsToKorean from "../../utils/changeTermsToEnglish";
import CategorySection from "../productRegister/CategorySection";
import ImageAttachmentSection from "../productRegister/ImageAttachmentSection";
import DetailInfoSection from "../productRegister/DetailInfoSection";
import PriceSection from "../productRegister/PriceSection";
import ButtonBar from "../productRegister/ButtonBar";

const initialForm = {
  title: "",
  description: "",
  price: 0,
  instantBidPrice: 0,
  startPrice: 0,
  bidUnit: 0,
};

const initialFailureReason = {
  title: "",
  description: "",
  price: "",
  instantBidPrice: "",
  startPrice: "",
  bidUnit: "",
};

export default function ProductRegister() {
  const [selectedCategory, setSelectedCategory] = useState(
    categoryRegisterList[0]
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedType, setSelectedType] = useState(typeRegisterist[0]);
  const [deadline, setDeadline] = useState<string>(deadlineList[0]);
  const [form, onChange] = useInput(initialForm);
  const [failureReason, setFailureReason] = useState(initialFailureReason);

  const validateForm = () => {
    const { isValid, failureReason } = validateProductRegister(form);

    if (!isValid) {
      setFailureReason(failureReason);
      return false;
    }

    setFailureReason(initialFailureReason);
    return true;
  };

  const requestBody = {
    ...form,
    saleType: changeTermsToKorean(selectedType),
    category: changeTermsToKorean(selectedCategory),
    images: imageFiles,
    deadline,
  };

  return (
    <S.Background>
      <S.BigTitle>판매상품 등록하기</S.BigTitle>
      <CategorySection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ImageAttachmentSection setImageFiles={setImageFiles} />
      <DetailInfoSection
        validateForm={validateForm}
        form={form}
        onChange={onChange}
        failureReason={failureReason}
      />
      <PriceSection
        validateForm={validateForm}
        form={form}
        onChange={onChange}
        failureReason={failureReason}
        deadline={deadline}
        setDeadline={setDeadline}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <ButtonBar validateForm={validateForm} requestBody={requestBody} />
    </S.Background>
  );
}
