import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5px;
`;

export const FormIcon = styled.img.attrs(props => ({
  src: `${props.src}`,
  alt: "",
}))`
  position: absolute;
  right: 1rem;
  width: 1.2rem;
  cursor: pointer;
`;
