import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

type GeneralProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function General({ isLogin, setIsLogin }: GeneralProps) {
  return (
    <>
      <HeaderWrapper>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      </HeaderWrapper>
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
    </>
  );
}
