import searchIcon from "../../assets/images/search-icon.svg";
import * as S from "./SearchBar.style";

import useInput from "../../hook/useInput";
import GrayInput from "../common/GrayInput";
import ProductAPI from "../../api/product";
import { FAILED_SEARCH, OK } from "../../constants/messages";
import { showToast } from "../common/Toast";
import { ERROR } from "../../constants/toast";

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

    showToast({ type: ERROR, message: FAILED_SEARCH });
  };

  return (
    <S.Wrapper>
      <S.InputWrapper>
        <S.FormIcon onClick={handleClick} src={searchIcon} alt="검색" />
        <GrayInput
          form={form}
          onChange={onChange}
          name="searchValue"
          placeholder="찾는 물건이 있으신가요?"
        />
      </S.InputWrapper>
    </S.Wrapper>
  );
}
