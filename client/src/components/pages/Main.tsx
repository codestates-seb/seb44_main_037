import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { FAILED, OK } from "../../constants/messages";
import UserAPI from "../../api/user";
import FakeProductAPI from "../../api/fake/fakeProduct";
import AuctionProductCard from "../main/AuctionProductCard";
import GeneralProductCard from "../main/GeneralProductCard";
import SearchBar from "../main/SearchBar";

const userAPI = new UserAPI();
const productAPI = new FakeProductAPI();

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1264px;
  padding: 1.5rem 1rem;
`;

const Guide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20rem;
  padding: 1.5rem 1rem;
  background-color: var(--beige);

  :nth-child(1) {
    margin-bottom: 1rem;
    font-size: 1.7rem;
    font-weight: bold;
  }

  :nth-child(2) {
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--pink);
  }
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const SearchBarWrapper = styled.div`
  flex-basis: 50%;
  display: flex;
  width: 100%;
`;

const CategoryBar = styled.div`
  flex-basis: 50%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

type MainProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Main({ isLogin, setIsLogin }: MainProps) {
  const navigate = useNavigate();

  const [auction, setAuction] = useState<any>({});
  const [general, setGeneral] = useState<any>({});

  const requestUserData = async (code: string) => {
    const body = { authorizationCode: code };
    const response: any = await userAPI.login(body);

    if (response.result === FAILED) {
      navigate("/user/register", {
        state: {
          email: response.email,
        },
      });

      return;
    }

    if (response.result === OK) {
      setIsLogin(true);
      sessionStorage.setItem("user", JSON.stringify(response.body.user));
      return;
    }

    navigate("/error");
  };

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    if (authorizationCode) {
      requestUserData(authorizationCode);
    }
  }, []);

  useEffect(() => {
    const getSingleProduct = async () => {
      const response1 = await productAPI.getSingleAuctionProduct();
      const response2 = await productAPI.getSingleGeneralProduct();
      setAuction(response1.data);
      setGeneral(response2.data);
    };

    getSingleProduct();
  }, []);

  return (
    <>
      <Guide>
        <div>굿즈헙이 처음이라면?</div>
        <div>가이드 보러 가기</div>
      </Guide>
      <Container>
        <MenuBar>
          <SearchBarWrapper>
            <SearchBar />
          </SearchBarWrapper>
          <CategoryBar>카테고리</CategoryBar>
        </MenuBar>
        <div>
          <AuctionProductCard data={auction} />
          <GeneralProductCard data={general} />
        </div>
      </Container>
    </>
  );
}
