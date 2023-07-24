import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import ProductAPI from "../../api/product";
import { OK } from "../../constants/messages";
import {
  ALL_KO,
  categoryList,
  typeList,
  statusList,
  AUCTION,
} from "../../constants/products";
import SearchBar from "../main/SearchBar";
import DropDown from "../common/DropDown";
import AuctionProductCard from "../main/AuctionProductCard";
import GeneralProductCard from "../main/GeneralProductCard";

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
  gap: 1rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
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
  gap: 1rem;
`;

const Wrapper = styled.ul`
  display: grid;
  gap: 2rem;

  @media screen and (min-width: 450px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media screen and (min-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media screen and (min-width: 1536px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

const productAPI = new ProductAPI();

export default function Main() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(ALL_KO);
  const [selectedType, setSelectedType] = useState(ALL_KO);
  const [selectedStatus, setSelectedStatus] = useState(ALL_KO);

  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const params = {
        category: selectedCategory,
        type: selectedType,
        status: selectedStatus,
      };

      const response: any = await productAPI.getAllProducts(params);

      if (response.result !== OK) {
        navigate("/error");
        return;
      }

      setProducts([...response.payload.products].reverse());
    }

    fetchData();
  }, [selectedCategory, selectedType, selectedStatus]);

  return (
    <>
      <Guide>
        <div>굿즈헙이 처음이라면?</div>
        <div>가이드 보러 가기</div>
      </Guide>
      <Container>
        <MenuBar>
          <SearchBarWrapper>
            <SearchBar setProducts={setProducts} />
          </SearchBarWrapper>
          <CategoryBar>
            <DropDown
              optionList={categoryList}
              state={selectedCategory}
              setState={setSelectedCategory}
            />
            <DropDown
              optionList={typeList}
              state={selectedType}
              setState={setSelectedType}
            />
            <DropDown
              optionList={statusList}
              state={selectedStatus}
              setState={setSelectedStatus}
            />
          </CategoryBar>
        </MenuBar>
        <Wrapper>
          {products.map((product: any) =>
            product.saleType === AUCTION ? (
              <AuctionProductCard data={product} />
            ) : (
              <GeneralProductCard data={product} />
            )
          )}
        </Wrapper>
      </Container>
    </>
  );
}
