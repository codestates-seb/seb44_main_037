import styled from "styled-components";
import InfoText from "../common/InfoText";
import { BID_GUIDE } from "../../constants/info";

const InputContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-top: 3rem;
`;

const InputOuter = styled.div`
  display: flex;
  width: 100%;
`;

const InputInner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const InputElement = styled.input`
  width: 100%;
  padding: 0.7rem 3.5rem 0.7rem 1rem;
  color: var(--gray);
  border: none;
  border-radius: 0.3rem;
  background: var(--input-gray);
  font-size: 1.6rem;
  font-weight: bold;
  text-align: right;
`;

const UnitInfo = styled.div`
  position: absolute;
  left: 88%;
  color: var(--dark-gray);
  font-size: 1rem;
`;

const Button = styled.button`
  width: 14rem;
  height: 3.3rem;
  margin: 0 0.2rem;
  padding: 10px;
  font-size: 1rem;
  color: var(--blue);
  border: 0.2rem solid var(--blue);
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: var(--blue);
    transition: background-color 0.2s ease-out;
  }
`;

type BidInputProps = {
  form: any;
  name: string;
  onChange?: any;
  handleBidClick: any;
};

function BidInput({ form, name, onChange, handleBidClick }: BidInputProps) {
  return (
    <>
      <InputContainer>
        <InputOuter>
          <InputInner>
            <UnitInfo>원에</UnitInfo>
            <InputElement
              id={name}
              name={name}
              value={form[name]}
              onChange={onChange}
            />
          </InputInner>
        </InputOuter>
        <Button onClick={handleBidClick}>응찰하기</Button>
      </InputContainer>
      <InfoText text={BID_GUIDE} />
    </>
  );
}

export default BidInput;
