import { useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./SideBar.style";

type SideBarProps = {
  image: string;
  nickname: string;
};

const SideBar = ({ image, nickname }: SideBarProps) => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const menu = [
    { name: "포인트", link: "/mypage/point" },
    { name: "메시지", link: "/mypage/chat" },
    { name: "구매내역", link: "/mypage" },
    { name: "판매내역", link: "/mypage" },
  ];

  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
  };

  return (
    <S.Wrapper>
      <div>
        <S.Image src={image} />
        <S.Nickname>{nickname}</S.Nickname>
      </div>
      <S.MenuList>
        {menu.map(({ name, link }, index: number) => (
          <Link to={link} onClick={() => handleMenuClick(index)}>
            <S.MenuName isSelected={selectedMenu === index}>{name}</S.MenuName>
          </Link>
        ))}
      </S.MenuList>
    </S.Wrapper>
  );
};

export default SideBar;
