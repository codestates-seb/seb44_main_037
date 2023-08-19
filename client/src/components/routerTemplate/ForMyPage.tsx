import { Outlet, useOutletContext } from "react-router-dom";
import { ContextType } from "context";
import styled from "styled-components";
import Header from "../Header";
import SideBar from "../mypage/SideBar";
import { useEffect, useState } from "react";
import UserAPI from "../../api/user";
import { FAILED, FAILED_GET_USER_INFO, OK } from "../../constants/messages";
import { showToast } from "../common/Toast";
import { ERROR } from "../../constants/toast";

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
  align-items: center;
  width: 100%;

  @media screen and (max-width: 1260px) {
    flex-direction: column;
  }
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const userAPI = new UserAPI();

export default function ForMyPage({
  isLogin,
  setIsLogin,
  accessToken,
  setAccessToken,
  user,
  setUser,
}: ContextType) {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await userAPI.getUserInfo(accessToken);

      if (response.result === OK) {
        setUserInfo(response.payload.user);
      }

      if (response.result === FAILED) {
        showToast({ type: ERROR, message: FAILED_GET_USER_INFO });
      }
    };

    fetchData();
  }, []);

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
          {userInfo && (
            <>
              <SideBar image={userInfo.image} nickname={userInfo.nickname} />
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
            </>
          )}
        </Body>
      </BodyWrapper>
    </>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
