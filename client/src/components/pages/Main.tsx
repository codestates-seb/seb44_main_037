import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Product } from "product";
import * as S from "./Main.style";
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

const productAPI = new ProductAPI();

export default function Main() {
  const [selectedCategory, setSelectedCategory] = useState(ALL_KO);
  const [selectedType, setSelectedType] = useState(ALL_KO);
  const [selectedStatus, setSelectedStatus] = useState(ALL_KO);
  const [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const params = {
        category: selectedCategory,
        type: selectedType,
        status: selectedStatus,
      };

      const response = await productAPI.getAllProducts(params);

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
      <S.Guide>
        <div>굿즈헙이 처음이라면?</div>
        <div>가이드 보러 가기</div>
      </S.Guide>
      <S.Container>
        <S.MenuBar>
          <S.SearchBarWrapper>
            <SearchBar setProducts={setProducts} />
          </S.SearchBarWrapper>
          <S.CategoryBar>
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
          </S.CategoryBar>
        </S.MenuBar>
        <S.Wrapper>
          {products.map(product =>
            product.saleType === AUCTION ? (
              <AuctionProductCard data={product} />
            ) : (
              <GeneralProductCard data={product} />
            )
          )}
        </S.Wrapper>
      </S.Container>
    </>
  );
}
