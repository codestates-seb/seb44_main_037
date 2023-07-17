import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../routerTemplate/ForMyPage";
import formatCreatedAt from "../../utils/formatCreatedAt";

const Background = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: 4rem;
  gap: 2rem;
  background-color: var(--background);
`;

const Title = styled.h2`
  padding: 0 2rem;
  margin-bottom: 2rem;
  color: #474747;
  font-size: 1.4rem;
  font-weight: bold;
`;

const Box = styled.div`
  padding: 2rem 0;
  border: 0.1rem solid var(--line-gray);
  border-radius: 0.5rem;
  background-color: #fff;
`;

const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 22rem;
  padding: 0 2rem;
`;

const PointCard = styled(LineWrapper)`
  padding: 1.5rem 2rem;
  border-top: 0.1rem solid var(--line-gray);
  border-bottom: 0.1rem solid var(--line-gray);
`;

const Price = styled.div<{
  color?: string;
}>`
  color: ${props => props.color || "#000"};
  font-size: 1.2rem;
`;

const SmallText = styled.div`
  font-size: 0.8rem;
  color: var(--gray);
`;

const HistoryCard = styled.div`
  margin: 1.5rem 0;

  :nth-child(1) {
    margin-bottom: 0.2rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default function Point() {
  const { userInfo, setUserInfo, accessToken, setAccessToken } = useUser();
  return (
    <Background>
      <Box>
        <Title>포인트 내역</Title>
        <PointCard>
          <div>현재 보유한 포인트</div>
          <Price>{userInfo.point.toLocaleString()}</Price>
        </PointCard>
        {userInfo.pointHistory.map(
          ({ title, productId, price, balance, createdAt }) => (
            <HistoryCard>
              <LineWrapper>
                <div>{title}</div>
                <Price color={price > 0 ? "var(--blue)" : "var(--red)"}>{`${
                  price > 0 ? "+" : "-"
                } ${price.toLocaleString()}`}</Price>
              </LineWrapper>
              <LineWrapper>
                <SmallText>{formatCreatedAt(createdAt)}</SmallText>
                <SmallText>{balance.toLocaleString()}</SmallText>
              </LineWrapper>
            </HistoryCard>
          )
        )}
      </Box>
      <Box>
        <Title>충전하기</Title>
      </Box>
    </Background>
  );
}
