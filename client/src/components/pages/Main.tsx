import { useEffect } from "react";
import UserAPI from "../../api/user";
import { FAILED } from "../../constants/messages";
import { useNavigate } from "react-router";

const userAPI = new UserAPI();

type MainProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Main({ isLogin, setIsLogin }: MainProps) {
  const navigate = useNavigate();

  const requestUserData = async (code: string) => {
    const body = { authorizationCode: code };
    const response: any = await userAPI.login(body);

    if (response.result === FAILED) {
      navigate("/user/register", {
        state: {
          email: response.email,
        },
      });

      return;
    }

    setIsLogin(true);
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
      <div>Main</div>
    </>
  );
}
