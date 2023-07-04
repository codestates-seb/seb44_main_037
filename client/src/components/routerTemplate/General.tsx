import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const Body = styled.div`
  display: flex;
  width: 1264px;
  min-height: 100vh;
  padding-top: 60px;
`;

const PageContainer = styled.div`
  width: 100%;
`;

export default function General() {
  return (
    <>
      <Header />
      <Wrapper>
        <Body>
          <PageContainer>
            <Outlet />
          </PageContainer>
        </Body>
      </Wrapper>
    </>
  );
}
