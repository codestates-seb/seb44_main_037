import styled from "styled-components";
import { useUser } from "../routerTemplate/ForMyPage";
import formatCreatedAt from "../../utils/formatCreatedAt";
import Payment from "../mypage/pointPage/Payment";

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
  padding: 0 2rem 1.5rem 2rem;
  color: #474747;
  font-size: 1.4rem;
  font-weight: bold;
  border-bottom: 0.1rem solid var(--line-gray);
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
  border-bottom: 0.1rem solid var(--line-gray);
  background-color: var(--light-green);
`;

const Price = styled.div<{
  color?: string;
  isBold?: boolean;
}>`
  color: ${props => props.color || "var(--green)"};
  font-size: 1.2rem;
  font-weight: ${props => props.isBold && "bold"};
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

export default function PointPage() {
  const { userInfo } = useUser();
  const pointHistoryList = [...userInfo.pointHistory].reverse();

  return (
    <Background>
      <Box>
        <Title>포인트 내역</Title>
        <PointCard>
          <div>현재 보유한 포인트</div>
          <Price isBold={true}>{userInfo.point.toLocaleString()}P</Price>
        </PointCard>
        {pointHistoryList.map(
          ({ title, productId, price, balance, createdAt }) => (
            <HistoryCard key={`${createdAt} + ${balance}`}>
              <LineWrapper>
                <div>{title}</div>
                <Price color={price > 0 ? "var(--blue)" : "var(--red)"}>{`${
                  price > 0 ? "+" : "-"
                } ${price?.toLocaleString()}`}</Price>
              </LineWrapper>
              <LineWrapper>
                <SmallText>{formatCreatedAt(createdAt)}</SmallText>
                <SmallText>{balance.toLocaleString()}</SmallText>
              </LineWrapper>
            </HistoryCard>
          )
        )}
      </Box>
      <Payment />
    </Background>
  );
}
