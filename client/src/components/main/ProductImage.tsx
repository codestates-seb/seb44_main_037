import { BID_FAILED, BID_SUCCESS, SOLD } from "../../constants/products";
import { styled } from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const Text = styled.div<{ isDark: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: ${props => props.isDark && "#ffffff"};
`;

export const Image = styled.img<{ isDark: boolean }>`
  width: 14rem;
  height: 12rem;
  padding: 0.2rem;
  object-fit: contain;
  border: 0.05rem solid var(--line-gray);
  filter: ${props => props.isDark && "brightness(50%)"};
`;

type ProductImageProps = {
  image: string;
  state?: string;
};

export default function ProductImage({ image, state = "" }: ProductImageProps) {
  switch (true) {
    case state === BID_SUCCESS:
      return (
        <Wrapper>
          <Image src={image} isDark={true} />
          <Text isDark={true}>{BID_SUCCESS}</Text>
        </Wrapper>
      );

    case state === BID_FAILED:
      return (
        <Wrapper>
          <Image src={image} isDark={true} />
          <Text isDark={true}>{BID_FAILED}</Text>
        </Wrapper>
      );

    case state === SOLD:
      return (
        <Wrapper>
          <Image src={image} isDark={true} />
          <Text isDark={true}>{SOLD}</Text>
        </Wrapper>
      );

    default:
      return (
        <Wrapper>
          <Image src={image} isDark={false} />
        </Wrapper>
      );
  }
}
