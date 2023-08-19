import { Outlet, useOutletContext } from "react-router-dom";
import { ContextType } from "context";
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
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default function ForAuth({
  isLogin,
  setIsLogin,
  accessToken,
  setAccessToken,
  user,
  setUser,
}: ContextType) {
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
            <Outlet
              context={
                {
                  isLogin,
                  setIsLogin,
                  accessToken,
                  setAccessToken,
                  user,
                  setUser,
                } satisfies ContextType
              }
            />
          </PageContainer>
        </Body>
      </BodyWrapper>
    </>
  );
}

export function useAuthContext() {
  return useOutletContext<ContextType>();
}
