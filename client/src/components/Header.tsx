import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserAPI from "../api/user";
import logoIcon from "../assets/images/GoodsHub.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1264px;
  padding: 1.5rem 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Image = styled.img`
  height: 1.2rem;
`;

const BigMenu = styled.div`
  color: #474747;
  font-size: 1rem;
  font-weight: bold;
`;

const SmallMenu = styled.div`
  color: #474747;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
`;

const userAPI = new UserAPI();

type HeaderProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

export default function Header({
  isLogin,
  setIsLogin,
  setAccessToken,
  setUser,
}: HeaderProps) {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await userAPI.logout();

    setUser(null);
    setAccessToken("");
    setIsLogin(false);

    navigate("/");
  };

  const handleLogoClick = async () => {
    window.location.replace("/");
  };

  return (
    <Container>
      <Wrapper>
        <LogoWrapper onClick={handleLogoClick}>
          <Image src={logoIcon} />
        </LogoWrapper>
        <Link to="/products/new">
          <BigMenu>판매하기</BigMenu>
        </Link>
      </Wrapper>
      <Wrapper>
        {!isLogin && (
          <Link to="/user/login">
            <SmallMenu>로그인/회원가입</SmallMenu>
          </Link>
        )}
        {isLogin && (
          <Link to="/mypage">
            <SmallMenu>마이페이지</SmallMenu>
          </Link>
        )}
        {isLogin && <SmallMenu onClick={handleLogoutClick}>로그아웃</SmallMenu>}
      </Wrapper>
    </Container>
  );
}
