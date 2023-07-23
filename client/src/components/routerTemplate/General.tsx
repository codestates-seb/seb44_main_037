import { useEffect } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { FAILED, OK } from "../../constants/messages";
import UserAPI from "../../api/user";
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
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  user: any;
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
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const userAPI = new UserAPI();

export default function General({
  isLogin,
  setIsLogin,
  accessToken,
  setAccessToken,
  user,
  setUser,
}: GeneralProps) {
  const navigate = useNavigate();

  const requestUserData = async (code: string) => {
    const body = { authorizationCode: code };
    const response: any = await userAPI.login(body);

    if (response.result === FAILED) {
      navigate("/user/register", {
        state: {
          email: response.payload.email,
        },
      });

      return;
    }

    if (response.result === OK) {
      setIsLogin(true);
      setAccessToken(response.payload.accessToken);
      setUser(response.payload.user);

      navigate("/");
      return;
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    if (authorizationCode) {
      requestUserData(authorizationCode);
    }
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
      </BodyWrapper>
    </>
  );
}

export function useGlobalContext() {
  return useOutletContext<ContextType>();
}
