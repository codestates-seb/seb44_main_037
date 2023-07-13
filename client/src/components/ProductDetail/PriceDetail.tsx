import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 17rem;
  margin: 0.7rem 0;
`;

const PriceName = styled.div`
  font-size: 1.1rem;
`;

const Price = styled.div<{ color: string }>`
  color: ${props => props.color || "#000"};
  font-size: ${props => (props.color === "var(--gray)" ? "1.2rem" : "1.6rem")};
  font-weight: bold;
`;

type PriceDetailProps = {
  name?: string;
  price: number;
  color: string;
};

export default function PriceDetail({ name, price, color }: PriceDetailProps) {
  return (
    <>
      {name && (
        <Wrapper>
          <PriceName>{name}</PriceName>
          <Price color={color}>{price.toLocaleString()}원</Price>
        </Wrapper>
      )}
      {!name && <Price color={color}>{price.toLocaleString()}원</Price>}
    </>
  );
}
