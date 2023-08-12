import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 8rem;
  gap: 2rem;
  color: #474747;
  background-color: var(--background);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SuccessIcon = styled.img`
  width: 12rem;
  opacity: 0.5;
`;

export const Title = styled.h1`
  padding: 0 2rem 1.5rem 2rem;
  margin: 2rem 0;
  color: var(--green);
  font-size: 2rem;
  font-weight: bold;
`;

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
  width: 20rem;
  margin: 0.5rem 0;

  :nth-child(1) {
    margin-right: 1rem;
  }

  :nth-child(2) {
    color: var(--blue);
  }
`;
