import styled from "styled-components";

export const Wrapper = styled.div`
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

export const Image = styled.img`
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

export const MenuList = styled.div`
  @media screen and (max-width: 1260px) {
    display: flex;
    justify-content: center;
    gap: 2rem;
    width: 100%;
  }
`;

export const MenuName = styled.div<{
  isSelected?: boolean;
}>`
  display: block;
  margin: 1.5rem 0;
  font-size: 1.1rem;
  font-weight: ${props => props.isSelected && "bold"};
  color: ${props => props.isSelected && "var(--green)"};
`;

export const Nickname = styled.div`
  margin-bottom: 1rem;
  color: #474747;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;

  @media screen and (max-width: 1260px) {
    display: none;
  }
`;
