import { createGlobalStyle } from "styled-components";
import variables from "./GlobalVariables";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    font-family: 'Roboto', sans-serif;
  }

  :root {
    ${variables};
  }
`;

export default GlobalStyle;
