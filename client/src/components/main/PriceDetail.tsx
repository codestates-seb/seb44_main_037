import * as S from "./PriceDetail.style";

type PriceDetail = {
  name: string;
  price: number;
  color?: string;
};

export default function PriceDetail({ name, price = 0, color }: PriceDetail) {
  if (!name) return;

  return (
    <S.Wrapper>
      <S.PriceName>{name}</S.PriceName>
      {price > 0 ? (
        <S.Price color={color}>{price.toLocaleString()}원</S.Price>
      ) : (
        <S.Description>응찰자를 기다리는 중</S.Description>
      )}
    </S.Wrapper>
  );
}
