import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UpperInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SmallText = styled.div`
  margin: 0.5rem 0;
  color: ${props => props.color || "var(--dark-gray)"};
  font-size: 0.7rem;
`;

export const PriceBox = styled.div`
  margin-top: 0.7rem;

  div {
    margin: 0.1rem 0;
  }
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: bold;
`;
