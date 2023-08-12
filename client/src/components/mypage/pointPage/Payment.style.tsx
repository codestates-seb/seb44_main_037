import styled from "styled-components";

export const Box = styled.div`
  padding: 2rem 0;
  border: 0.1rem solid var(--line-gray);
  border-radius: 0.5rem;
  background-color: #fff;

  & > * {
    padding: 0 2rem;
  }
`;

export const Title = styled.h2`
  padding-bottom: 1.5rem;
  color: #474747;
  font-size: 1.4rem;
  font-weight: bold;
  border-bottom: 0.1rem solid var(--line-gray);
`;

export const PriceList = styled.div`
  width: 35rem;
  padding: 0 2rem;
`;

export const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0;
  font-size: 1.1rem;
`;

export const SmallText = styled.div`
  font-size: 0.8rem;
  color: var(--gray);
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

export const Button = styled.button`
  height: 3rem;
  padding: 0 3rem;
  font-size: 1rem;
  color: var(--blue);
  border-radius: 0.5rem;
  box-shadow: var(--bs-sm);

  &:hover {
    transition: background-color 0.2s ease-out;
    color: var(--blue);
    background-color: var(--light-blue);
    box-shadow: var(--bs-sm);
  }
`;

export const PrevButton = styled.div`
  margin-bottom: 0.5rem;
  color: var(--gray);
  cursor: pointer;

  &:hover {
    color: var(--green);
  }

  div {
    display: inline;
    margin-top: 0.3rem;
    margin-left: 0.3rem;
    font-size: 0.8rem;
  }
`;

export const WidgetBox = styled.div`
  width: 35rem;
  padding: 2rem 2rem 1rem 2rem;
`;

export const InfoWrapper = styled.div`
  margin: 1.5rem auto 2rem auto;
`;
