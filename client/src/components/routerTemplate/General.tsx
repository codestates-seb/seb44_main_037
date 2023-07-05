import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const BodyWrapper = styled(HeaderWrapper)`
  min-height: 100vh;
`;

const Body = styled.div`
  display: flex;
  width: 100%;
`;

const PageContainer = styled.div`
  width: 100%;
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
        <Body>
          <PageContainer>
            <Outlet />
          </PageContainer>
        </Body>
      </BodyWrapper>
    </>
  );
}
