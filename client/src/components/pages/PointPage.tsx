import * as S from "./PointPage.style";
import { useUser } from "../routerTemplate/ForMyPage";
import formatCreatedAt from "../../utils/formatCreatedAt";
import Payment from "../mypage/pointPage/Payment";

export default function PointPage() {
  const { user } = useUser();
  const pointHistoryList = [...user.pointHistory].reverse();

  return (
    <S.Background>
      <S.Box>
        <S.Title>포인트 내역</S.Title>
        <S.PointCard>
          <div>현재 보유한 포인트</div>
          <S.Price isBold={true}>{user.point.toLocaleString()}P</S.Price>
        </S.PointCard>
        {pointHistoryList.map(({ title, price, balance, createdAt }) => (
          <S.HistoryCard key={`${createdAt} + ${balance}`}>
            <S.LineWrapper>
              <div>{title}</div>
              <S.Price color={price > 0 ? "var(--blue)" : "var(--red)"}>{`${
                price > 0 ? "+" : "-"
              } ${price?.toLocaleString()}`}</S.Price>
            </S.LineWrapper>
            <S.LineWrapper>
              <S.SmallText>{formatCreatedAt(createdAt)}</S.SmallText>
              <S.SmallText>{balance.toLocaleString()}</S.SmallText>
            </S.LineWrapper>
          </S.HistoryCard>
        ))}
      </S.Box>
      <Payment />
    </S.Background>
  );
}
