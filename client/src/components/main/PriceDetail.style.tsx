import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PriceName = styled.div`
  font-size: 0.9rem;
`;

export const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${props => props.color};
`;

export const Description = styled.div`
  color: var(--gray);
  font-size: 0.8rem;
`;
