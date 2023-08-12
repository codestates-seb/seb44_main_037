import { Link } from "react-router-dom";
import * as S from "./Login.style";

import { GOOGLE_CLIENT_ID } from "../../config/envConfig";
import normalIcon from "../../assets/images/btn_google_signin_light_normal_web.png";

export default function Login() {
  const handleOnClick = async () => {
    const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

    return window.location.assign(oAuthURL);
  };

  return (
    <S.Container>
      <Link to="/">
        <S.BigTitle>로그인 / 회원가입</S.BigTitle>
      </Link>
      <S.Box>
        <S.Text>
          <div>클릭 한 번으로</div>
          <div>간편하게 굿즈헙 시작하기</div>
        </S.Text>
        <S.Icon onClick={handleOnClick} src={normalIcon} />
      </S.Box>
    </S.Container>
  );
}
