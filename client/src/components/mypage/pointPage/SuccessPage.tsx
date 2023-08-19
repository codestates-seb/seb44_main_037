import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  DEMAND_LOGIN,
  FAILED,
  FAILED_CHARGE_POINT,
  INVALID_PAYMENT,
  OK,
} from "../../../constants/messages";
import UserAPI from "../../../api/user";
import * as S from "./SuccessPage.style";
import { useUser } from "../../routerTemplate/ForMyPage";
import { showToast } from "../../common/Toast";
import { ERROR } from "../../../constants/toast";
import successIcon from "../../../assets/images/success_icon.svg";

const userAPI = new UserAPI();

export default function SuccessPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();

  const { user, setUser, accessToken } = useUser();

  const navigate = useNavigate();

  const chargeId = searchParams.get("orderId");
  const price = Number(searchParams.get("amount"));

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const body = {
        chargeId,
        price,
        chargeSecret: process.env.REACT_APP_CHARGE_SECRET,
      };
      const response: any = await userAPI.charge(accessToken, body);

      if (response.result === OK) {
        setUser(response.payload.user);
        handleSuccess();
      }

      if (response.message === DEMAND_LOGIN) {
        showToast({ type: ERROR, message: DEMAND_LOGIN });
        return;
      }

      if (response.result === FAILED) {
        showToast({ type: ERROR, message: FAILED_CHARGE_POINT });
        navigate(`/mypage/point/fail?message=${INVALID_PAYMENT}`);
      }
    };

    fetchData();
  }, []);

  return (
    <S.Background>
      {isSuccess && (
        <S.Wrapper>
          <S.SuccessIcon src={successIcon} />
          <S.Title>결제 성공</S.Title>
          <S.Description>
            <div>결제 금액</div>
            <div>{`${price.toLocaleString()}원`}</div>
          </S.Description>
          <S.Description>
            <div>결제 후 나의 포인트</div>
            <div>{`${user.point.toLocaleString()}P`}</div>
          </S.Description>
        </S.Wrapper>
      )}
      {!isSuccess && <div>결제 진행중입니다...</div>}
    </S.Background>
  );
}
