import styled from "styled-components";

export const Guide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20rem;
  padding: 1.5rem 1rem;
  background-color: var(--beige);

  :nth-child(1) {
    margin-bottom: 1rem;
    font-size: 1.7rem;
    font-weight: bold;
  }

  :nth-child(2) {
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--pink);
  }
`;
