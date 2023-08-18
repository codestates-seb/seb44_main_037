import { BID_FAILED, BID_SUCCESS, SOLD } from "../../constants/products";
import * as S from "./Image.style";

type ImageProps = {
  image: string;
  state?: State;
};

type State = typeof BID_FAILED | typeof BID_SUCCESS | typeof SOLD | "";

export default function Image({ image, state = "" }: ImageProps) {
  if (state === "") {
    return (
      <S.Wrapper>
        <S.Image src={image} isDark={false} />
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Image src={image} isDark={true} />
      <S.Text isDark={true}>{state}</S.Text>
    </S.Wrapper>
  );
}
