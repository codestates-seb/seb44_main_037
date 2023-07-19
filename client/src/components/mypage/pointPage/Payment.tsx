import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import styled from "styled-components";
import { useUser } from "../../routerTemplate/ForMyPage";
import { chargePriceList, testMessage } from "../../../constants/payment";
import prevIcon from "../../../assets/images/prev_icon.svg";

import InfoText from "../../common/InfoText";

const Box = styled.div`
  padding: 2rem 0;
  border: 0.1rem solid var(--line-gray);
  border-radius: 0.5rem;
  background-color: #fff;

  & > * {
    padding: 0 2rem;
  }
`;

const Title = styled.h2`
  padding-bottom: 1.5rem;
  color: #474747;
  font-size: 1.4rem;
  font-weight: bold;
  border-bottom: 0.1rem solid var(--line-gray);
`;

const PriceList = styled.div`
  width: 35rem;
  padding: 0 2rem;
`;

const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0;
  font-size: 1.1rem;
`;

const SmallText = styled.div`
  font-size: 0.8rem;
  color: var(--gray);
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  height: 3rem;
  padding: 0 3rem;
  font-size: 1rem;
  color: var(--blue);
  border-radius: 0.5rem;
  box-shadow: var(--bs-sm);

  &:hover {
    transition: background-color 0.2s ease-out;
    color: var(--blue);
    background-color: var(--light-blue);
    box-shadow: var(--bs-sm);
  }
`;

const PrevButton = styled.div`
  margin-bottom: 0.5rem;
  color: var(--gray);
  cursor: pointer;

  &:hover {
    color: var(--green);
  }

  div {
    display: inline;
    margin-top: 0.3rem;
    margin-left: 0.3rem;
    font-size: 0.8rem;
  }
`;

const WidgetBox = styled.div`
  width: 35rem;
  padding: 2rem 2rem 1rem 2rem;
`;

const InfoWrapper = styled.div`
  margin: 1.5rem auto 2rem auto;
`;

export default function Payment() {
  const [price, setPrice] = useState(chargePriceList[0]);
  const [isWidgetShow, setIsWidgetShow] = useState(false);

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const { userInfo } = useUser();

  const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY || "";
  const customerKey = userInfo._id;

  const handleRadioButtonClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleShowWidget = () => {
    setIsWidgetShow(!isWidgetShow);
  };

  const handleNextButtonClick = () => {
    handleShowWidget();

    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      paymentWidget.renderPaymentMethods("#payment-widget", Number(price));
      paymentWidgetRef.current = paymentWidget;
    })();
  };

  const handlePaymentButtonClick = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: "포인트 충전 결제",
        customerName: userInfo.nickname,
        customerEmail: userInfo.email,
        successUrl: `${window.location.origin}/mypage/point/success`,
        failUrl: `${window.location.origin}/mypage/point/fail`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Title>충전하기</Title>
      {!isWidgetShow && (
        <>
          <InfoWrapper>
            <InfoText text={testMessage} />
          </InfoWrapper>
          <PriceList>
            {chargePriceList.map(str => (
              <LineWrapper key={str}>
                <label>
                  <input
                    type="radio"
                    value={str}
                    onChange={handleRadioButtonClick}
                    checked={str === price}
                  />
                  {`${Number(str).toLocaleString()}P`}
                </label>
                <SmallText>{Number(str).toLocaleString()}원</SmallText>
              </LineWrapper>
            ))}
          </PriceList>
          <ButtonWrapper>
            <Button onClick={handleNextButtonClick}>다음 단계</Button>
          </ButtonWrapper>
        </>
      )}
      {isWidgetShow && (
        <WidgetBox>
          <PrevButton onClick={handleShowWidget}>
            <img src={prevIcon} />
            <div>앞으로 가기</div>
          </PrevButton>
          <div id="payment-widget" />
          <ButtonWrapper>
            <Button onClick={handlePaymentButtonClick}>결제하기</Button>
          </ButtonWrapper>
        </WidgetBox>
      )}
    </Box>
  );
}
