import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./Header.style";

import UserAPI from "../api/user";
import logoIcon from "../assets/images/GoodsHub.svg";

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
    <S.Container>
      <S.Wrapper>
        <S.LogoWrapper onClick={handleLogoClick}>
          <S.Image src={logoIcon} />
        </S.LogoWrapper>
        <Link to="/products/new">
          <S.BigMenu>판매하기</S.BigMenu>
        </Link>
      </S.Wrapper>
      <S.Wrapper>
        {!isLogin && (
          <Link to="/user/login">
            <S.SmallMenu>로그인/회원가입</S.SmallMenu>
          </Link>
        )}
        {isLogin && (
          <Link to="/mypage">
            <S.SmallMenu>마이페이지</S.SmallMenu>
          </Link>
        )}
        {isLogin && (
          <S.SmallMenu onClick={handleLogoutClick}>로그아웃</S.SmallMenu>
        )}
      </S.Wrapper>
    </S.Container>
  );
}
