import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1264px;
  padding: 1.5rem 1rem;
`;

export const UpperBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1.5rem;
  gap: 2.5rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftBox = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const RightBox = styled.div`
  flex-basis: 50%;

  :nth-child(3) {
    margin: 3rem 0;
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const ImageInfo = styled.div<{ isDark: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.isDark && "#ffffff"};
`;

export const MainImage = styled.img<{ isDark?: boolean }>`
  width: 50%;
  min-width: 100%;
  max-height: 25rem;
  margin-bottom: 1rem;
  object-fit: contain;
  background-color: var(--line-gray);
  filter: ${props => props.isDark && "brightness(50%)"};
`;

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export const Images = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

export const Image = styled.img<{ isSelected: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.isSelected && "0.5"};
  cursor: pointer;
`;

export const BlankBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--line-gray);
`;

export const BigTitle = styled.h1`
  margin-top: 1rem;
  font-size: 1.7rem;
  font-weight: bold;
`;

export const Description = styled.pre`
  margin: 2rem 0;
  font-size: 1rem;
  line-height: 1.4rem;
`;

export const Text = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  color: var(--dark-gray);
`;

export const ButtonBar = styled.div`
  display: flex;
  margin-top: 7rem;
`;

export const PriceInfo = styled.div`
  & > * {
    display: inline;
    margin-right: 0.5rem;
  }
`;

export const Price = styled.div`
  color: var(--red);
  font-size: 1.6rem;
  font-weight: bold;
`;
