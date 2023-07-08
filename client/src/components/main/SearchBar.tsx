import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "../../assets/images/search-icon.svg";

import useInput from "../../hook/useInput";
import GrayInput from "../common/GrayInput";

const Wrapper = styled.form`
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

export default function SearchBar() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [form, onChange, reset] = useInput({
    searchValue: "",
  });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>
  ) => {
    e.preventDefault();
    navigate(`/videos/${form.searchValue}`);
  };

  useEffect(() => {
    const text = keyword || "";
    reset({ ...form, searchValue: text });
  }, [keyword]);

  return (
    <Wrapper onSubmit={handleSubmit}>
      <InputWrapper>
        <FormIcon onClick={handleSubmit} src={searchIcon} alt="검색" />
        <GrayInput
          form={form}
          onChange={onChange}
          name="search"
          placeholder="찾는 물건이 있으신가요?"
        />
      </InputWrapper>
    </Wrapper>
  );
}
