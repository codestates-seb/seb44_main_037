import { useNavigate } from "react-router";
import * as S from "./UserRegister.style";
import UserAPI from "../../api/user";
import {
  FAILED_USER_REGISTER,
  INVALID_REQUEST,
  OK,
} from "../../constants/messages";
import { showToast } from "../common/Toast";
import { useAuthContext } from "../routerTemplate/ForAuth";
import { ERROR } from "../../constants/toast";
import HalfButton from "../common/HalfButton";
import { BodyOfRegisterUser } from "userAPI";

const userAPI = new UserAPI();

type ButtonBarProps = {
  validateForm: () => boolean;
  requestBody: BodyOfRegisterUser;
};

export default function ButtonBar({
  validateForm,
  requestBody,
}: ButtonBarProps) {
  const navigate = useNavigate();
  const { setIsLogin, setAccessToken, setUser } = useAuthContext();

  const handleSubmitClick = async () => {
    const isValidForm = validateForm();

    if (isValidForm && requestBody.image && requestBody.email) {
      const response = await userAPI.register(requestBody);

      if (response.result === OK) {
        setIsLogin(true);
        setAccessToken(response.payload.accessToken);
        setUser(response.payload.user);

        navigate("/");
        return;
      }

      showToast({ type: ERROR, message: FAILED_USER_REGISTER });
      return;
    }

    showToast({ type: ERROR, message: INVALID_REQUEST });
  };

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <>
      <S.ButtonBar>
        <HalfButton
          name="회원가입"
          onClick={handleSubmitClick}
          backgroundColor="var(--green)"
        />
        <HalfButton
          name="취소하기"
          onClick={handleCancelClick}
          backgroundColor="var(--red)"
        />
      </S.ButtonBar>
    </>
  );
}
