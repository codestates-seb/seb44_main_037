import * as S from "./ProductRegister.style";
import { categoryRegisterList } from "../../constants/products";
import DropDown from "../common/DropDown";

type CategorySectionProps = {
  selectedCategory: any;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default function CategorySection({
  selectedCategory,
  setSelectedCategory,
}: CategorySectionProps) {
  return (
    <S.StepBox>
      <h2>Step 1. 카테고리 선택하기</h2>
      <S.DropDownWrapper>
        <DropDown
          optionList={categoryRegisterList}
          state={selectedCategory}
          setState={setSelectedCategory}
        />
      </S.DropDownWrapper>
    </S.StepBox>
  );
}
