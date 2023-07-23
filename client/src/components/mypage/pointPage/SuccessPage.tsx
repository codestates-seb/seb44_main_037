import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  DEMAND_LOGIN,
  FAILED,
  FAILED_CHARGE_POINT,
  INVALID_PAYMENT,
  OK,
} from "../../../constants/messages";
import styled from "styled-components";
import UserAPI from "../../../api/user";
import { useUser } from "../../routerTemplate/ForMyPage";
import { showToast } from "../../common/Toast";
import { ERROR } from "../../../constants/toast";
import successIcon from "../../../assets/images/success_icon.svg";

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 8rem;
  gap: 2rem;
  color: #474747;
  background-color: var(--background);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SuccessIcon = styled.img`
  width: 12rem;
  opacity: 0.5;
`;

const Title = styled.h1`
  padding: 0 2rem 1.5rem 2rem;
  margin: 2rem 0;
  color: var(--green);
  font-size: 2rem;
  font-weight: bold;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
  width: 20rem;
  margin: 0.5rem 0;

  :nth-child(1) {
    margin-right: 1rem;
  }

  :nth-child(2) {
    color: var(--blue);
  }
`;

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
    <Background>
      {isSuccess && (
        <Wrapper>
          <SuccessIcon src={successIcon} />
          <Title>결제 성공</Title>
          <Description>
            <div>결제 금액</div>
            <div>{`${price.toLocaleString()}원`}</div>
          </Description>
          <Description>
            <div>결제 후 나의 포인트</div>
            <div>{`${userInfo.point.toLocaleString()}P`}</div>
          </Description>
        </Wrapper>
      )}
      {!isSuccess && <div>결제 진행중입니다...</div>}
    </Background>
  );
}
