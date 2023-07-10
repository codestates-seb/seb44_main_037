import { useRef } from "react";
import * as S from "./DropDown.style";
import useDetectOutsideClick from "../../hook/useDetectOutsideClick";
import DropDownList from "./DropDownList";
import downIcon from "../../assets/images/dropdown.svg";
import upIcon from "../../assets/images/dropdown_up.svg";

type DropDownProps = {
  optionList: Array<string>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export default function DropDown({
  optionList,
  state,
  setState,
}: DropDownProps) {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useDetectOutsideClick(dropDownRef, false);

  const handleCategoryClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <S.MenuContainer ref={dropDownRef}>
      <S.MenuTrigger onClick={handleCategoryClick}>
        {state}
        {isOpen && <S.Icon src={upIcon} alt="" />}
        {!isOpen && <S.Icon src={downIcon} alt="" />}
      </S.MenuTrigger>
      {isOpen && (
        <S.Menu>
          <ul>
            {optionList.map((value, index) => (
              <DropDownList
                key={index}
                value={value}
                setIsOpen={setIsOpen}
                setTab={setState}
                isOpen={isOpen}
              />
            ))}
          </ul>
        </S.Menu>
      )}
    </S.MenuContainer>
  );
}
