import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logoIcon from "../assets/GoodsHub.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid var(--line-gray);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
`;

const Image = styled.img`
  width: 8rem;
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
`;

export default function Header() {
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
        <Link to="/user/login">
          <SmallMenu>로그인/회원가입</SmallMenu>
        </Link>
      </div>
    </Container>
  );
}
