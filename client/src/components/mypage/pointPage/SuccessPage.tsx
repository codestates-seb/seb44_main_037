import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  DEMAND_LOGIN,
  FAILED,
  INVALID_PAYMENT,
  OK,
} from "../../../constants/messages";
import UserAPI from "../../../api/user";
import { useUser } from "../../routerTemplate/ForMyPage";

const userAPI = new UserAPI();

export default function SuccessPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();

  const { userInfo, setUserInfo, accessToken, setAccessToken } = useUser();

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
        setUserInfo(response.payload.user);
        handleSuccess();
      }

      if (response.message === DEMAND_LOGIN) {
        alert("로그인이 필요합니다.");
        return;
      }

      if (response.result === FAILED) {
        alert("충전 실패.");

        navigate(`/mypage/point/fail?message=${INVALID_PAYMENT}`);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isSuccess && (
        <>
          <h1>결제 성공</h1>
          <div>{`주문 아이디: ${chargeId}`}</div>
          <div>{`결제 금액: ${price}원`}</div>
          <div>{`결제 후 나의 포인트: ${userInfo.point}원`}</div>
        </>
      )}
      {!isSuccess && <div>결제 진행중입니다...</div>}
    </>
  );
}
