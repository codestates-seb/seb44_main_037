import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: 4rem;
  gap: 2rem;
  background-color: var(--background);
`;

export const Title = styled.h2`
  padding: 0 2rem 1.5rem 2rem;
  color: #474747;
  font-size: 1.4rem;
  font-weight: bold;
  border-bottom: 0.1rem solid var(--line-gray);
`;

export const Box = styled.div`
  padding: 2rem 0;
  border: 0.1rem solid var(--line-gray);
  border-radius: 0.5rem;
  background-color: #fff;
`;

export const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 22rem;
  padding: 0 2rem;
`;

export const PointCard = styled(LineWrapper)`
  padding: 1.5rem 2rem;
  border-bottom: 0.1rem solid var(--line-gray);
  background-color: var(--light-green);
`;

export const Price = styled.div<{
  color?: string;
  isBold?: boolean;
}>`
  color: ${props => props.color || "var(--green)"};
  font-size: 1.2rem;
  font-weight: ${props => props.isBold && "bold"};
`;

export const SmallText = styled.div`
  font-size: 0.8rem;
  color: var(--gray);
`;

export const HistoryCard = styled.div`
  margin: 1.5rem 0;

  :nth-child(1) {
    margin-bottom: 0.2rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
