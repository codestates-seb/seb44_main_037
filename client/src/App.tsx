import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import ErrorPage from "./components/pages/ErrorPage";
import General from "./components/routerTemplate/General";
import ForAuth from "./components/routerTemplate/ForAuth";
import Main from "./components/pages/Main";
import ProductDetail from "./components/pages/ProductDetail";
import PointPage from "./components/pages/PointPage";
import ForMyPage from "./components/routerTemplate/ForMyPage";
import ProductRegister from "./components/pages/ProductRegister";
import UserRegister from "./components/pages/UserRegister";
import Login from "./components/pages/Login";
import UserAPI from "./api/user";
import { OK } from "./constants/messages";
import SuccessPage from "./components/mypage/pointPage/SuccessPage";
import FailPage from "./components/mypage/pointPage/FailPage";
import ChatPage from "./components/mypage/chatPage/ChatPage";

axios.defaults.withCredentials = true;

const userAPI = new UserAPI();

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: (data: any) => void;
  bid: (data: any) => void;
  auctionClose: (data: any) => void;
}

export interface ClientToServerEvents {
  message: (myMessage: any, callback: (e: any) => void) => void;
  bid: (myBid: any, callback: (e: any) => void) => void;
  auctionClose: (data: any, callback: (e: any) => void) => void;
}

export default function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const refreshSilently = async () => {
      const response: any = await userAPI.refreshToken();

      if (response.result === OK) {
        setIsLogin(true);
        setAccessToken(response.payload.accessToken);
        setUser(response.payload.user);
      }
    };

    refreshSilently();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <General
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          user={user}
          setUser={setUser}
        />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "products/new",
          element: (
            <ProductRegister
              user={user}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
            />
          ),
        },
        {
          path: "products/:id",
          element: <ProductDetail />,
        },
      ],
    },
    {
      path: "/user",
      element: (
        <ForAuth
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setAccessToken={setAccessToken}
          setUser={setUser}
        />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: (
            <UserRegister
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setAccessToken={setAccessToken}
              setUser={setUser}
            />
          ),
        },
      ],
    },
    {
      path: "/mypage",
      element: (
        <ForMyPage
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          setUser={setUser}
        />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <PointPage />,
        },
        {
          path: "point",
          element: <PointPage />,
        },
        {
          path: "point/success",
          element: <SuccessPage />,
        },
        {
          path: "point/fail",
          element: <FailPage />,
        },
        {
          path: "chat",
          element: <ChatPage />,
        },
      ],
    },
    {
      path: "/error",
      children: [{ index: true, element: <ErrorPage /> }],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
