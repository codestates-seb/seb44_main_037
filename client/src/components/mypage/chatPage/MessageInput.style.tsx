import styled from "styled-components";

export const InputBox = styled.div`
  margin: 1rem;
  border-radius: 0.3rem;
  background: var(--background);
`;

export const Textarea = styled.textarea`
  width: 100%;
  color: var(--dark-gray);
  border: none;
  border-radius: 0.3rem;
  background: var(--background);
  font-size: 1rem;
  resize: none;
`;

export const InputFloor = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;

  :nth-child(1) {
    color: var(--dark-gray);
    font-size: 0.8rem;
  }
`;

export const Button = styled.div`
  width: 3.5rem;
  height: 2rem;
  padding: 0.6rem 0.2rem;
  font-size: 0.8rem;
  color: #fff;
  background-color: var(--navy);
  border-radius: 0.5rem;
  text-align: center;
`;
