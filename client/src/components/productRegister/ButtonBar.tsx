import { useNavigate } from "react-router";
import {
  BodyOfRegisterProduct,
  PayloadOfRegisterProduct,
  ResponseState,
} from "productAPI";
import * as S from "./ProductRegister.style";
import {
  DEMAND_LOGIN,
  FAILED_POST_PRODUCT,
  INVALID_REQUEST,
  OK,
} from "../../constants/messages";
import { showToast } from "../common/Toast";
import { ERROR } from "../../constants/toast";
import HalfButton from "../common/HalfButton";
import ProductAPI from "../../api/product";
import { useGlobalContext } from "../routerTemplate/General";

const productAPI = new ProductAPI();

type ButtonBarProps = {
  validateForm: () => boolean;
  requestBody: BodyOfRegisterProduct;
};

export default function ButtonBar({
  validateForm,
  requestBody,
}: ButtonBarProps) {
  const { user, accessToken, setAccessToken } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmitClick = async () => {
    const isFormValid = validateForm();

    if (!isFormValid || requestBody.images.length === 0) {
      showToast({ type: ERROR, message: INVALID_REQUEST });
    }

    const response = await productAPI.registerProduct(
      requestBody,
      user._id,
      accessToken
    );

    if (response.result === OK) {
      handleSuccess(response);
      return;
    }

    handleFailure(response);
  };

  const handleSuccess = (response: ResponseState<PayloadOfRegisterProduct>) => {
    if (response.payload.accessToken) {
      setAccessToken(response.payload.accessToken);
    }

    navigate(`/products/${response.payload.productId}`);
  };

  const handleFailure = (response: ResponseState<PayloadOfRegisterProduct>) => {
    if (response.message === DEMAND_LOGIN) {
      showToast({ type: ERROR, message: DEMAND_LOGIN });
      return;
    }

    showToast({ type: ERROR, message: FAILED_POST_PRODUCT });
  };

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <S.ButtonBar>
      <HalfButton
        name="등록하기"
        onClick={handleSubmitClick}
        backgroundColor="var(--green)"
      />
      <HalfButton
        name="취소하기"
        onClick={handleCancelClick}
        backgroundColor="var(--red)"
      />
    </S.ButtonBar>
  );
}
