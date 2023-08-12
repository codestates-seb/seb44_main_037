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
  margin: 1.5rem 0;
  gap: 2.5rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LowerBox = styled.div`
  display: flex;
  width: 100%;
  margin: 1.5rem 0;
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
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
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

export const SmallTitle = styled.h2`
  margin: 1rem 0;
  font-size: 1.5rem;
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
  margin-top: 4rem;
`;

export const AuctionPriceWrapper = styled.div`
  margin-top: 2rem;

  :nth-child(3) {
    margin-top: 2rem;
  }
`;

export const BeigeBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.7rem 1.5rem;
  margin: 1rem 0;
  background-color: var(--beige);
  border-radius: 0.5rem;
`;

export const Left = styled.div`
  :nth-child(1) {
    font-size: 1.1rem;
  }

  :nth-child(2) {
    margin-top: 0.4rem;
    font-size: 0.8rem;
    color: var(--drak-gray);
  }
`;

export const Right = styled.div`
  margin-top: 0.4rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--gray);
`;

export const SmallText = styled.div`
  margin: 0.5rem 0;
  color: var(--pink);
  font-size: 0.8rem;
`;

export const HistoryBox = styled(BeigeBox)`
  flex-direction: column;
`;

export const History = styled.div`
  display: flex;
  width: 100%;
  color: var(--gray);
  font-size: 1rem;

  & > * {
    flex-basis: calc(100% / 3);
    margin: 0.3rem 0;
    text-align: center;
  }
`;

export const HistoryTitle = styled(History)`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: var(--drak-gray);
`;
