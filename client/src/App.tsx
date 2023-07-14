import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import ErrorPage from "./components/pages/ErrorPage";
import General from "./components/routerTemplate/General";
import ForAuth from "./components/routerTemplate/ForAuth";
import Main from "./components/pages/Main";
import ProductDetail from "./components/pages/ProductDetail";
import MyPage from "./components/pages/MyPage";
import ForMyPage from "./components/routerTemplate/ForMyPage";
import ProductRegister from "./components/pages/ProductRegister";
import UserRegister from "./components/pages/UserRegister";
import Login from "./components/pages/Login";
import UserAPI from "./api/user";
import { OK } from "./constants/messages";

axios.defaults.withCredentials = true;

const userAPI = new UserAPI();

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
          setAccessToken={setAccessToken}
          setUser={setUser}
        />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Main isLogin={isLogin} setIsLogin={setIsLogin} />,
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
          setAccessToken={setAccessToken}
          setUser={setUser}
        />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <MyPage />,
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
