import * as S from "./PriceDetail.style";

type PriceDetailProps = {
  name?: string;
  price: number;
  color: string;
};

export default function PriceDetail({ name, price, color }: PriceDetailProps) {
  return (
    <>
      {name && (
        <S.Wrapper>
          <S.PriceName>{name}</S.PriceName>
          <S.Price color={color}>{price.toLocaleString()}원</S.Price>
        </S.Wrapper>
      )}
      {!name && <S.Price color={color}>{price.toLocaleString()}원</S.Price>}
    </>
  );
}
