import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "../../assets/images/search-icon.svg";

import useInput from "../../hook/useInput";
import GrayInput from "../common/GrayInput";
import ProductAPI from "../../api/product";
import { OK } from "../../constants/messages";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5px;
`;

const FormIcon = styled.img.attrs(props => ({
  src: `${props.src}`,
  alt: "",
}))`
  position: absolute;
  right: 1rem;
  width: 1.2rem;
  cursor: pointer;
`;

type SearchBarProps = {
  setProducts: any;
};

const productAPI = new ProductAPI();

export default function SearchBar({ setProducts }: SearchBarProps) {
  const [form, onChange, reset] = useInput({
    searchValue: "",
  });

  const handleClick = async () => {
    const response: any = await productAPI.getProductsByKeyword(
      form.searchValue
    );

    if (response.result === OK) {
      setProducts(response.payload.products);
      return;
    }

    alert("검색에 실패했습니다.");
  };

  return (
    <Wrapper>
      <InputWrapper>
        <FormIcon onClick={handleClick} src={searchIcon} alt="검색" />
        <GrayInput
          form={form}
          onChange={onChange}
          name="searchValue"
          placeholder="찾는 물건이 있으신가요?"
        />
      </InputWrapper>
    </Wrapper>
  );
}
