import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 4.2rem);
  padding: 1.5rem 1rem;
  background-color: var(--background);
`;

export const AlignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;

  > * {
    &:nth-child(3) {
      margin-top: 3rem;
      margin-bottom: 1.5rem;
    }
  }
`;

export const Title = styled.h1`
  color: #474747;
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

export const ButtonBar = styled.div`
  margin-top: 7rem;
`;
