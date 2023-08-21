import React, { useState } from "react";
import { useLocation } from "react-router";
import * as S from "./UserRegister.style";
import useInput from "../../hook/useInput";
import displayAttachedImage from "../../utils/displayAttachedImage";
import validateRegister from "../../utils/validateRegister";
import exampleImage from "../../assets/images/example_profile.png";
import RegisterInput from "../common/RegisterInput";
import ProfileImage from "../userRegister/ProfileImage";
import ButtonBar from "../userRegister/ButtonBar";
import { BodyOfRegisterUser } from "userAPI";
import { Images } from "../../class/Images";

const initialFailureReason = { nickname: "" };

export default function UserRegister() {
  const location = useLocation();

  const [thumbnail, setThumbnail] = useState<any>(exampleImage);
  const [imageFile, setImageFile] = useState<null | File>(null);
  const [form, onChange] = useInput({
    nickname: "",
    email: location.state.email,
  });
  const [failureReason, setFailureReason] = useState(initialFailureReason);

  const requestBody: BodyOfRegisterUser = {
    nickname: form.nickname,
    image: imageFile,
    email: form.email,
  };

  const validateForm = () => {
    const { isValid, failureReason } = validateRegister(form);

    if (!isValid) {
      setFailureReason(failureReason);
      return false;
    }

    setFailureReason(initialFailureReason);
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const { fileList, checkSizeError } = new Images(e.target.files);
    const isValidate = checkSizeError();

    if (isValidate) {
      displayAttachedImage(e, setThumbnail);
      setImageFile(fileList[0]);
    }
  };

  return (
    <>
      <S.Container>
        <S.AlignWrapper>
          <S.Title>회원가입</S.Title>
          <ProfileImage
            imageUrl={thumbnail}
            handleFileChange={handleFileChange}
          />
          <RegisterInput
            form={form}
            label={"닉네임"}
            name={"nickname"}
            onChange={onChange}
            onBlur={validateForm}
            message={failureReason["nickname"]}
            description="닉네임은 2자 이상 20자 이내여야 합니다."
            size="20rem"
          />
          <RegisterInput
            form={form}
            label={"이메일"}
            name={"email"}
            description="내가 판매하거나 참여 중인 경매 관련 알림이 수신됩니다."
            size="20rem"
            isReadOnly={true}
          />
          <ButtonBar validateForm={validateForm} requestBody={requestBody} />
        </S.AlignWrapper>
      </S.Container>
    </>
  );
}
