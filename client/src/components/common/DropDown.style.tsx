import styled from "styled-components";

export const MenuContainer = styled.div`
  position: relative;
`;

export const Menu = styled.div`
  border-radius: 0.3rem;
  position: absolute;
  top: 2.5rem;
  right: 0;
  width: 7.5rem;
  padding: 0.5rem auto;
  box-shadow: var(--bs-sm);

  li {
    padding: 0.6rem 0.5rem;
    color: var(--dark-gray);
    font-size: 0.8rem;
    border-bottom: 1px solid var(--dropdown-gray);

    &:hover {
      color: var(--green);
      cursor: pointer;
    }
  }
`;

export const MenuTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 7.5rem;
  padding: 0.3rem 0 0.3rem 0.5rem;
  border-radius: 0.5rem;
  color: var(--dark-gray);
  font-size: 0.9rem;
  transition: box-shadow 0.4s ease;
  cursor: pointer;

  &:hover {
    color: var(--green);
  }
`;

export const Icon = styled.img`
  width: 1.2rem;
`;
