import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceName = styled.div`
  font-size: 0.9rem;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

type PriceDetail = {
  name: string;
  price: number;
};

export default function PriceDetail({ name, price }: PriceDetail) {
  if (!name || !price) return;

  return (
    <Wrapper>
      <PriceName>{name}</PriceName>
      <Price>{price.toLocaleString()}원</Price>
    </Wrapper>
  );
}
