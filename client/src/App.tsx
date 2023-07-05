import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import ErrorPage from "./components/pages/ErrorPage";
import General from "./components/routerTemplate/General";
import Main from "./components/pages/Main";
import ProductDetail from "./components/pages/ProductDetail";
import MyPage from "./components/pages/MyPage";
import ForMyPage from "./components/routerTemplate/ForMyPage";
import ProductRegister from "./components/pages/ProductRegister";
import UserRegister from "./components/pages/UserRegister";
import Login from "./components/pages/Login";

axios.defaults.withCredentials = true;

export default function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <General isLogin={isLogin} setIsLogin={setIsLogin} />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Main isLogin={isLogin} setIsLogin={setIsLogin} />,
        },
        {
          path: "products/new",
          element: <ProductRegister />,
        },
        {
          path: "products/:id",
          element: <ProductDetail />,
        },
      ],
    },
    {
      path: "/user",
      element: <General isLogin={isLogin} setIsLogin={setIsLogin} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <UserRegister />,
        },
      ],
    },
    {
      path: "/mypage",
      element: <ForMyPage isLogin={isLogin} setIsLogin={setIsLogin} />,
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
