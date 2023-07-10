import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  categoryRegisterList,
  typeRegisterist,
} from "../../constants/products";
import { IMAGE_GUIDE } from "../../constants/info";
import DropDown from "../common/DropDown";
import InfoText from "../common/InfoText";
import ProductImage from "../productRegister/ProductImage";
import displayAttachedImages from "../../utils/displayAttachedImages";
import checkFileSize from "../../utils/checkFileSize";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 1.5rem 1rem;
  background-color: var(--background);
`;

const BigTitle = styled.h1`
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
`;

export default function ProductRegister() {
  const [selectedCategory, setSelectedCategory] = useState(
    categoryRegisterList[0]
  );
  const [selectedType, setSelectedType] = useState(typeRegisterist[0]);
  const [imageFiles, setImageFiles] = useState<any>([]);
  const [displayingImages, setDisplayingImages] = useState([]);

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
    </Background>
  );
}
