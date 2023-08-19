import { useState } from "react";
import * as S from "./ProductRegister.style";
import { IMAGE_GUIDE } from "../../constants/info";
import displayAttachedImages from "../../utils/displayAttachedImages";
import { showToast } from "../common/Toast";
import { ERROR } from "../../constants/toast";
import InfoText from "../common/InfoText";
import ProductImage from "../productRegister/ProductImage";
import { Images } from "../../class/Images";

type ImageAttachmentSectionProps = {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function ImageAttachmentSection({
  setImageFiles,
}: ImageAttachmentSectionProps) {
  const [displayingImages, setDisplayingImages] = useState([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return false;

    const { sizeErrorMessage, fileList } = new Images(e.target.files);
    const isValidate = checkSizeError(sizeErrorMessage);

    if (isValidate) {
      attachImages(fileList);
      displayImages(fileList);
    }
  };

  const checkSizeError = (errorMessage: string | null) => {
    if (errorMessage) {
      showToast({ type: ERROR, message: errorMessage });

      return false;
    }

    return true;
  };

  const attachImages = (files: Array<File>) => {
    resetAttachedImages();
    setImageFiles(files);
  };

  const resetAttachedImages = () => {
    setDisplayingImages([]);
  };

  const displayImages = (files: Array<File>) => {
    files.forEach((imageFile: File) => {
      displayAttachedImages(imageFile, setDisplayingImages);
    });
  };

  return (
    <S.StepBox>
      <h2>Step 2. 사진 첨부하기</h2>
      <InfoText text={IMAGE_GUIDE} />
      <ProductImage
        imageUrlList={displayingImages}
        handleFileChange={handleFileChange}
      />
    </S.StepBox>
  );
}
