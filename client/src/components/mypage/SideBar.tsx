import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 18rem;
  height: 100%;
  padding: 2rem;
  border-top: 1px solid var(--line-gray);

  @media screen and (max-width: 1260px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 2rem;
  }
`;

const Image = styled.img`
  width: 12rem;
  height: 12rem;
  margin: 2rem 0 2rem 0;
  object-fit: contain;
  border-radius: 100%;
  background-color: var(--line-gray);

  @media screen and (max-width: 1260px) {
    display: none;
  }
`;

const MenuList = styled.div`
  @media screen and (max-width: 1260px) {
    display: flex;
    justify-content: center;
    gap: 2rem;
    width: 100%;
  }
`;

const MenuName = styled.div<{
  isSelected?: boolean;
}>`
  display: block;
  margin: 1.5rem 0;
  font-size: 1.1rem;
  font-weight: ${props => props.isSelected && "bold"};
  color: ${props => props.isSelected && "var(--green)"};
`;

const Nickname = styled.div`
  margin-bottom: 1rem;
  color: #474747;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;

  @media screen and (max-width: 1260px) {
    display: none;
  }
`;

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
    <Wrapper>
      <div>
        <Image src={image} />
        <Nickname>{nickname}</Nickname>
      </div>
      <MenuList>
        {menu.map(({ name, link }, index: number) => (
          <Link to={link} onClick={() => handleMenuClick(index)}>
            <MenuName isSelected={selectedMenu === index}>{name}</MenuName>
          </Link>
        ))}
      </MenuList>
    </Wrapper>
  );
};

export default SideBar;
