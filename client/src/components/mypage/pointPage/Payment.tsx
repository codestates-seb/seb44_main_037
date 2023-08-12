import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { useUser } from "../../routerTemplate/ForMyPage";
import { chargePriceList, testMessage } from "../../../constants/payment";
import prevIcon from "../../../assets/images/prev_icon.svg";

import InfoText from "../../common/InfoText";
import * as S from "./Payment.style";

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
    <S.Box>
      <S.Title>충전하기</S.Title>
      {!isWidgetShow && (
        <>
          <S.InfoWrapper>
            <InfoText text={testMessage} />
          </S.InfoWrapper>
          <S.PriceList>
            {chargePriceList.map(str => (
              <S.LineWrapper key={str}>
                <label>
                  <input
                    type="radio"
                    value={str}
                    onChange={handleRadioButtonClick}
                    checked={str === price}
                  />
                  {`${Number(str).toLocaleString()}P`}
                </label>
                <S.SmallText>{Number(str).toLocaleString()}원</S.SmallText>
              </S.LineWrapper>
            ))}
          </S.PriceList>
          <S.ButtonWrapper>
            <S.Button onClick={handleNextButtonClick}>다음 단계</S.Button>
          </S.ButtonWrapper>
        </>
      )}
      {isWidgetShow && (
        <S.WidgetBox>
          <S.PrevButton onClick={handleShowWidget}>
            <img src={prevIcon} />
            <div>앞으로 가기</div>
          </S.PrevButton>
          <div id="payment-widget" />
          <S.ButtonWrapper>
            <S.Button onClick={handlePaymentButtonClick}>결제하기</S.Button>
          </S.ButtonWrapper>
        </S.WidgetBox>
      )}
    </S.Box>
  );
}
