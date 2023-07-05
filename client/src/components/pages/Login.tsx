import React from "react";
import styled from "styled-components";

import { GOOGLE_CLIENT_ID } from "../../config/envConfig";
import normalIcon from "../../assets/images/btn_google_signin_light_normal_web.png";

import BigTitle from "../common/BigTitle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 4.2rem);
  padding: 1.5rem 1rem;
  background-color: var(--background);
`;

const Icon = styled.img`
  width: 12rem;
  cursor: pointer;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 20rem;
  height: 24rem;
  margin-top: 1.5rem;
  background-color: white;
  border-radius: 0.4rem;
  box-shadow: var(--bs-sm);
`;

const Text = styled.div`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3;
  color: #474747;
  text-align: center;
`;

export default function Login() {
  const handleOnClick = async () => {
    const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

    return window.location.assign(oAuthURL);
  };

  return (
    <Container>
      <BigTitle label="로그인 / 회원가입" />
      <Box>
        <Text>
          <div>클릭 한 번으로</div>
          <div>간편하게 굿즈헙 시작하기</div>
        </Text>
        <Icon onClick={handleOnClick} src={normalIcon} />
      </Box>
    </Container>
  );
}
