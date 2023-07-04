import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <General />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "products/new",
          element: <ProductRegister />,
        },
        {
          path: "products/:id",
          element: <ProductDetail />,
        },
        {
          path: "user/login",
          element: <Login />,
        },
        {
          path: "user/register",
          element: <UserRegister />,
        },
      ],
    },
    {
      path: "/mypage",
      element: <ForMyPage />,
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
