import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 17rem;
  margin: 0.7rem 0;
`;

export const PriceName = styled.div`
  font-size: 1.1rem;
`;

export const Price = styled.div<{ color: string }>`
  color: ${props => props.color || "#000"};
  font-size: ${props => (props.color === "var(--gray)" ? "1.2rem" : "1.6rem")};
  font-weight: bold;
`;
