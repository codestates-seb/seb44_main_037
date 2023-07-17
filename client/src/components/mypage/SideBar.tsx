import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 18rem;
  height: 100%;
  padding: 2rem 2rem;
  border-top: 1px solid var(--line-gray);
`;

const Image = styled.img`
  width: 12rem;
  height: 12rem;
  margin: 2rem 0 2rem 0;
  object-fit: contain;
  border-radius: 100%;
  background-color: var(--line-gray);
`;

const CategoryBox = styled.div`
  & > * {
    display: block;
    margin: 1.5rem 0;
    font-size: 1.1rem;
  }
`;

const Nickname = styled.div`
  margin-bottom: 1rem;
  color: #474747;
  font-size: 1.7rem;
  font-weight: bold;
`;

type SideBarProps = {
  image: string;
  nickname: string;
};

const SideBar = ({ image, nickname }: SideBarProps) => {
  return (
    <Wrapper>
      <Image src={image} />
      <Nickname>{nickname}</Nickname>
      <CategoryBox>
        <Link to="/">포인트</Link>
        <Link to="/">메시지</Link>
        <Link to="/">구매내역</Link>
        <Link to="/">판매내역</Link>
      </CategoryBox>
    </Wrapper>
  );
};

export default SideBar;
