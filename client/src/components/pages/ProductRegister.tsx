import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {
  categoryRegisterList,
  deadlineList,
  typeRegisterist,
} from "../../constants/products";
import {
  DESCRIPTION_GUIDE,
  IMAGE_GUIDE,
  TITLE_GUIDE,
  PRICE_GUIDE,
} from "../../constants/info";
import { OK } from "../../constants/messages";
import displayAttachedImages from "../../utils/displayAttachedImages";
import checkFileSize from "../../utils/checkFileSize";
import validateProductRegister from "../../utils/validateProductRegister";
import useInput from "../../hook/useInput";

import DropDown from "../common/DropDown";
import InfoText from "../common/InfoText";
import RegisterInput from "../common/RegisterInput";
import RegisterTextarea from "../common/RegisterTextarea";
import HalfButton from "../common/HalfButton";
import ProductImage from "../productRegister/ProductImage";
import ProductAPI from "../../api/product";
import changeTermsToKorean from "../../utils/changeTermsToEnglish";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
  background-color: var(--background);
`;

const BigTitle = styled.h1`
  margin-top: 5rem;
  color: var(--dark-gray);
  font-size: 1.7rem;
  font-weight: bold;
`;

const StepBox = styled.div`
  margin: 3rem 0;

  h2 {
    margin-bottom: 1rem;
    color: var(--dark-gray);
    font-size: 1.1rem;
    font-weight: bold;
  }

  & > div {
    width: 60rem;
    padding-left: 2rem;
  }
`;

const DropDownWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const ButtonBar = styled.div`
  margin-top: 7rem;
`;

const productAPI = new ProductAPI();

export default function ProductRegister() {
  const [selectedCategory, setSelectedCategory] = useState(
    categoryRegisterList[0]
  );
  const [imageFiles, setImageFiles] = useState<any>([]);
  const [selectedType, setSelectedType] = useState(typeRegisterist[0]);
  const [displayingImages, setDisplayingImages] = useState([]);
  const [deadline, setDeadline] = useState<string>(deadlineList[0]);

  const [form, onChange, reset, setForm] = useInput({
    title: "",
    description: "",
    price: 0,
    instantBidPrice: 0,
    startPrice: 0,
    bidUnit: 0,
  });
  const [failureReason, setFailureReason] = useState({
    title: "",
    description: "",
    price: "",
    instantBidPrice: "",
    startPrice: "",
    bidUnit: "",
  });

  const navigate = useNavigate();

  const isGeneralType = selectedType === typeRegisterist[0];
  const isAuctionType = selectedType === typeRegisterist[1];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setDisplayingImages([]);

    const files = Array.from(e.target.files);
    const maxSize = 0.5 * 1024 * 1024;
    const sizeWarning = checkFileSize(files, maxSize);

    if (sizeWarning !== "") {
      alert(sizeWarning);

      return;
    }

    files.forEach((imageFile: any) => {
      displayAttachedImages(imageFile, setDisplayingImages);
    });

    setImageFiles(files);
  };

  const validateForm = () => {
    const { isValid, failureReason } = validateProductRegister(form);

    if (!isValid) {
      setFailureReason(failureReason);
      return false;
    }

    setFailureReason({
      ...failureReason,
      title: "",
      description: "",
      price: "",
      instantBidPrice: "",
      startPrice: "",
      bidUnit: "",
    });

    return true;
  };

  const handleSubmitClick = async () => {
    const isFormValid = validateForm();

    if (isFormValid && imageFiles.length > 0) {
      const body = {
        ...form,
        saleType: changeTermsToKorean(selectedType),
        category: changeTermsToKorean(selectedCategory),
        images: imageFiles,
        deadline,
      };

      const response = await productAPI.registerProduct(body);
      console.log(response);
      if (response.result === OK) {
        navigate(`/products/${response.productId}`);
        return;
      }

      alert("상품 등록에 실패했습니다.");
      return;
    }

    alert("잘못된 요청...");
  };

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <Background>
      <BigTitle>판매상품 등록하기</BigTitle>
      <StepBox>
        <h2>Step 1. 카테고리 선택하기</h2>
        <DropDownWrapper>
          <DropDown
            optionList={categoryRegisterList}
            state={selectedCategory}
            setState={setSelectedCategory}
          />
        </DropDownWrapper>
      </StepBox>
      <StepBox>
        <h2>Step 2. 사진 첨부하기</h2>
        <InfoText text={IMAGE_GUIDE} />
        <ProductImage
          imageUrlList={displayingImages}
          handleFileChange={handleFileChange}
        />
      </StepBox>
      <StepBox>
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
      </StepBox>
      <StepBox>
        <h2>Step 4. 판매유형 및 가격 설정하기</h2>
        <DropDownWrapper>
          <DropDown
            optionList={typeRegisterist}
            state={selectedType}
            setState={setSelectedType}
          />
        </DropDownWrapper>
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
            <RegisterInput
              form={form}
              label={"즉시 낙찰가"}
              name={"instantBidPrice"}
              onChange={onChange}
              onBlur={validateForm}
              message={failureReason["instantBidPrice"]}
              size="15rem"
              isPrice={true}
            />
            <RegisterInput
              form={form}
              label={"시작 금액"}
              name={"startPrice"}
              onChange={onChange}
              onBlur={validateForm}
              message={failureReason["startPrice"]}
              size="15rem"
              isPrice={true}
            />
            <RegisterInput
              form={form}
              label={"입찰 단위"}
              name={"bidUnit"}
              onChange={onChange}
              onBlur={validateForm}
              message={failureReason["bidUnit"]}
              size="15rem"
              isPrice={true}
            />
            <DropDownWrapper>
              <DropDown
                optionList={deadlineList}
                state={deadline}
                setState={setDeadline}
              />
            </DropDownWrapper>
          </>
        )}
      </StepBox>
      <ButtonBar>
        <HalfButton name="회원가입" onClick={handleSubmitClick} />
        <HalfButton
          name="취소하기"
          onClick={handleCancelClick}
          backgroundColor="var(--red)"
        />
      </ButtonBar>
    </Background>
  );
}
