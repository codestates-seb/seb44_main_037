import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BoxWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

export const BlankBox = styled.div`
  width: 25%;
  height: 10rem;
  background-color: #d8d8d8;
`;

export const Image = styled.img`
  width: 25%;
  height: 10rem;
`;

export const Button = styled.div`
  width: 100%;
  height: 2.5rem;
  line-height: 2.2rem;
  margin: 1rem 0.2rem;
  color: var(--green);
  font-size: 1rem;
  text-align: center;
  border: 0.15rem solid var(--green);
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    transition: filter 0.2s ease-out;
    filter: brightness(120%);
  }
`;

export const ImageUploader = styled.div`
  width: 100%;

  & > label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

export const Uploader = styled.input`
  display: none;
`;
