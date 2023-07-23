import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import useInput from "../../hook/useInput";

import UserAPI from "../../api/user";
import displayAttachedImage from "../../utils/displayAttachedImage";
import validateRegister from "../../utils/validateRegister";
import {
  FAILED_USER_REGISTER,
  EXCESSIVE_IMAGE_SIZE,
  INVALID_REQUEST,
  OK,
} from "../../constants/messages";
import exampleImage from "../../assets/images/example_profile.png";
import { showToast } from "../common/Toast";
import { ERROR } from "../../constants/toast";

import RegisterInput from "../common/RegisterInput";
import ProfileImage from "../userRegister/ProfileImage";
import HalfButton from "../common/HalfButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 4.2rem);
  padding: 1.5rem 1rem;
  background-color: var(--background);
`;

const AlignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 800px; */
  padding: 1.5rem 1rem;

  > * {
    &:nth-child(3) {
      margin-top: 3rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const Title = styled.h1`
  color: #474747;
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const ButtonBar = styled.div`
  margin-top: 7rem;
`;

const userAPI = new UserAPI();

type UserRegisterProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

export default function UserRegister({
  isLogin,
  setIsLogin,
  setAccessToken,
  setUser,
}: UserRegisterProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState<any>(exampleImage);
  const [imageFile, setImageFile] = useState<null | File>(null);
  const [form, onChange, reset, setForm] = useInput({
    nickname: "",
    email: location.state.email,
  });
  const [failureReason, setFailureReason] = useState({
    nickname: "",
  });

  const validateForm = () => {
    const { isValid, failureReason } = validateRegister(form);

    if (!isValid) {
      setFailureReason(failureReason);
      return false;
    }

    setFailureReason({ ...failureReason, nickname: "" });
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files?.length) return;

    const maxSize = 0.5 * 1024 * 1024;
    const fileSize = files[0].size;

    if (fileSize > maxSize) {
      showToast({ type: ERROR, message: EXCESSIVE_IMAGE_SIZE });
      return;
    }

    displayAttachedImage(e, setThumbnail);
    setImageFile(files[0]);
  };

  const handleSubmitClick = async () => {
    const isFormValid = validateForm();

    if (isFormValid && imageFile && form.email) {
      const body = {
        nickname: form.nickname,
        image: imageFile,
        email: form.email,
      };

      const response: any = await userAPI.register(body);

      if (response.result === OK) {
        setIsLogin(true);
        setAccessToken(response.payload.accessToken);
        setUser(response.payload.user);

        navigate("/");
        return;
      }

      showToast({ type: ERROR, message: FAILED_USER_REGISTER });
      return;
    }

    showToast({ type: ERROR, message: INVALID_REQUEST });
  };

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <>
      <Container>
        <AlignWrapper>
          <Title>회원가입</Title>
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
          <ButtonBar>
            <HalfButton
              name="회원가입"
              onClick={handleSubmitClick}
              backgroundColor="var(--green)"
            />
            <HalfButton
              name="취소하기"
              onClick={handleCancelClick}
              backgroundColor="var(--red)"
            />
          </ButtonBar>
        </AlignWrapper>
      </Container>
    </>
  );
}
