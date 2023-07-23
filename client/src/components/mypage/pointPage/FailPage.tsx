import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import warningIcon from "../../../assets/images/warning.svg";

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 4rem;
  gap: 2rem;
  color: #474747;
  background-color: var(--background);
`;

const WarningIcon = styled.img`
  width: 10rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  padding: 0 2rem 1.5rem 2rem;
  color: var(--pink);
  font-size: 2rem;
  font-weight: bold;
`;

export default function FailPage() {
  const [searchParams] = useSearchParams();

  return (
    <Background>
      <div>
        <WarningIcon src={warningIcon} />
        <Title>결제 실패</Title>
        <div>{searchParams.get("message")}</div>
      </div>
    </Background>
  );
}
