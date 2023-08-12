import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Label = styled.label`
  line-height: 2.5rem;
  flex-basis: 15%;
  margin: 2px auto;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  flex-basis: 85%;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 14px 15px;
  margin: 2px auto;
  border: 1px solid #dadada;
  border-radius: 6px;
  font-size: 0.9rem;
  resize: none;
`;

export const Message = styled.p`
  margin: 2px auto;
  font-size: 0.7rem;
  color: var(--pink);
`;

export const Description = styled.p`
  margin: 5px auto;
  font-size: 0.7rem;
  color: var(--dark-gray);
`;
