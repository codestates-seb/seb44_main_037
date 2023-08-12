import { styled } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Text = styled.div<{ isDark: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: ${props => props.isDark && "#ffffff"};
`;

export const Image = styled.img<{ isDark: boolean }>`
  width: 100%;
  height: 12rem;
  object-fit: cover;
  filter: ${props => props.isDark && "brightness(50%)"};
`;
