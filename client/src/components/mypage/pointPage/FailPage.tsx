import { useSearchParams } from "react-router-dom";
import * as S from "./FailPage.style";
import warningIcon from "../../../assets/images/warning.svg";

export default function FailPage() {
  const [searchParams] = useSearchParams();

  return (
    <S.Background>
      <div>
        <S.WarningIcon src={warningIcon} />
        <S.Title>결제 실패</S.Title>
        <div>{searchParams.get("message")}</div>
      </div>
    </S.Background>
  );
}
