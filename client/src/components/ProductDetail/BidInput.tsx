import * as S from "./BidInput.style";
import InfoText from "../common/InfoText";
import { BID_GUIDE } from "../../constants/info";

type BidInputProps = {
  form: any;
  name: string;
  onChange?: any;
  handleBidClick: any;
};

function BidInput({ form, name, onChange, handleBidClick }: BidInputProps) {
  return (
    <>
      <S.InputContainer>
        <S.InputOuter>
          <S.InputInner>
            <S.UnitInfo>원에</S.UnitInfo>
            <S.InputElement
              id={name}
              name={name}
              value={form[name]}
              onChange={onChange}
            />
          </S.InputInner>
        </S.InputOuter>
        <S.Button onClick={handleBidClick}>응찰하기</S.Button>
      </S.InputContainer>
      <InfoText text={BID_GUIDE} />
    </>
  );
}

export default BidInput;
