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
} from "../../constants/products";
import SearchBar from "../main/SearchBar";
import DropDown from "../common/DropDown";
import ProductCardList from "../main/ProductCardList";
import Banner from "../main/Banner";

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
      <Banner />
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
          <ProductCardList products={products} />
        </S.Wrapper>
      </S.Container>
    </>
  );
}
