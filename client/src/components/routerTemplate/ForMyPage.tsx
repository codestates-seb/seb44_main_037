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
  width: 1264px;
`;

const PageContainer = styled.div`
  width: 100%;
`;

type ForMyPageProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

export default function ForMyPage({
  isLogin,
  setIsLogin,
  setAccessToken,
  setUser,
}: ForMyPageProps) {
  return (
    <>
      <HeaderWrapper>
        <Header
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setAccessToken={setAccessToken}
          setUser={setUser}
        />
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
