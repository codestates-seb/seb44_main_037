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

export const Icon = styled.img`
  width: 12rem;
  cursor: pointer;
`;

export const BigTitle = styled.h1`
  color: #474747;
  font-size: 1.7rem;
  font-weight: bold;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 20rem;
  height: 24rem;
  margin-top: 1.5rem;
  background-color: white;
  border-radius: 0.4rem;
  box-shadow: var(--bs-sm);
`;

export const Text = styled.div`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3;
  color: #474747;
  text-align: center;
`;
