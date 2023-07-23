import { Outlet, useOutletContext } from "react-router-dom";
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
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const userAPI = new UserAPI();

type ForMyPageProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

type PointHistory = {
  title: string;
  price: number;
  balance: number;
  createdAt: number;
  productId?: string;
  paymentId?: string;
};

type User = {
  _id: string;
  email: string;
  nickname: string;
  image: string;
  salesList: Array<string>;
  shoppingList: Array<string>;
  point: number;
  pointHistory: Array<PointHistory>;
};

type ContextType = {
  userInfo: User;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

export default function ForMyPage({
  isLogin,
  setIsLogin,
  accessToken,
  setAccessToken,
  setUser,
}: ForMyPageProps) {
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
                      userInfo,
                      setUserInfo,
                      accessToken,
                      setAccessToken,
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
