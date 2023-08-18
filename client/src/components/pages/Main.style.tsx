import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1264px;
  padding: 1.5rem 1rem;
`;

export const MenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchBarWrapper = styled.div`
  flex-basis: 50%;
  display: flex;
  width: 100%;
`;

export const CategoryBar = styled.div`
  flex-basis: 50%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
`;

export const Wrapper = styled.ul`
  display: grid;
  gap: 2rem;

  @media screen and (min-width: 450px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media screen and (min-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media screen and (min-width: 1536px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;
