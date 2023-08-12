import { BID_FAILED, BID_SUCCESS, SOLD } from "../../constants/products";
import * as S from "./ProductImage.style";

type ProductImageProps = {
  image: string;
  state?: State;
};

type State = typeof BID_FAILED | typeof BID_SUCCESS | typeof SOLD | "";

export default function ProductImage({ image, state = "" }: ProductImageProps) {
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
