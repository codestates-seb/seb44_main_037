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
  color: ${props => props.color};
`;

const Description = styled.div`
  color: var(--gray);
  font-size: 0.8rem;
`;

type PriceDetail = {
  name: string;
  price: number;
  color?: string;
};

export default function PriceDetail({ name, price = 0, color }: PriceDetail) {
  if (!name) return;

  return (
    <Wrapper>
      <PriceName>{name}</PriceName>
      {price > 0 ? (
        <Price color={color}>{price.toLocaleString()}원</Price>
      ) : (
        <Description>응찰자를 기다리는 중</Description>
      )}
    </Wrapper>
  );
}
