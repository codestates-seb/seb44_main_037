import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
  background-color: var(--background);
`;

export const BigTitle = styled.h1`
  margin-top: 5rem;
  color: var(--dark-gray);
  font-size: 1.7rem;
  font-weight: bold;
`;

export const StepBox = styled.div`
  margin: 3rem 0;

  h2 {
    margin-bottom: 1rem;
    color: var(--dark-gray);
    font-size: 1.1rem;
    font-weight: bold;
  }

  & > div {
    width: 60rem;
    padding-left: 2rem;
  }
`;

export const DropDownWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const ButtonBar = styled.div`
  margin-top: 7rem;
`;
