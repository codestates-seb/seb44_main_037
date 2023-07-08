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
  border-bottom: 1px solid var(--line-gray);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
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
};

export default function Header({ isLogin, setIsLogin }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await userAPI.logout();

    sessionStorage.removeItem("user");
    setIsLogin(false);
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <LogoWrapper>
            <Image src={logoIcon} />
          </LogoWrapper>
        </Link>
        <Link to="/products/new">
          <BigMenu>판매하기</BigMenu>
        </Link>
      </Wrapper>
      <div>
        {!isLogin && (
          <Link to="/user/login">
            <SmallMenu>로그인/회원가입</SmallMenu>
          </Link>
        )}
        {isLogin && <SmallMenu onClick={handleLogoutClick}>로그아웃</SmallMenu>}
      </div>
    </Container>
  );
}
